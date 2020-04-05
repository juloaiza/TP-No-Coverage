#!/usr/bin python
#title           :server.py
# description     :API server for coverage prediction.
# author          :Julian Loaiza
#email           :julian.loaiza@gmail.com
#date            :20191115
# version         :0.1.0
# usage           :python server.py
# notes           :
#python_version  :3.7
# ==============================================================================


import time
import glob
import os
from flask import Flask, redirect, url_for, request, Response, jsonify
from flask_cors import CORS

import json


import base64
import uuid
import hashlib

import subprocess

import csv
import json


def dbm_to_w(dBm):
    """This function converts a power given in dBm to a power given in W."""
    return round(10**((dBm-30)/10.), 1)


def dat_to_json(path):
    '''This function parse csv to geojson'''

    csvFile = open(path, "r")
    csvFile.readline()  # skip header
    table = csv.reader(csvFile)
    data = []

    for row in table:
        rowLine = {}
        rowLine['Latitude'] = float(row[0])
        rowLine['Longitude'] = float(row[1])
        rowLine['RSRP'] = int(row[2])
        data.append(rowLine)

    csvFile.close()

    with open('../server/project/prediction.json', 'w') as outfile:
        json.dump(data, outfile)

    return data


def create_prediction(cow_parameters):
    start = time.time()
    done = time.time()

    lat = cow_parameters['lat']
    lng = cow_parameters['lng']
    txh = cow_parameters['txh']
    erp = dbm_to_w(cow_parameters['erp'])

    print(erp)

    # bbox = os.popen('signalserverHD -sdf ./elevation-hd -lat ' + str(lat) + ' -lon ' + str(lng) + ' -txh ' +
    #                 str(txh) + ' -f 750 -erp ' + str(erp) + ' -rxh 1.5 -rel 98 -o coverage -R 2 -res 3600 -pm 8 -dbm').read()

    proc = subprocess.Popen(['signalserverHD', '-sdf', './elevation-hd', '-lat', str(lat), '-lon',
                             str(lng), '-txh', str(txh), '-f', '750', '-erp', str(
                                 erp), '-rxh', '1.5', '-rel', '98',
                             '-o', 'coverage', '-R', '2', '-res', '3600', '-pm', '8', '-dbm'],
                            stdout=subprocess.PIPE,
                            stderr=subprocess.STDOUT)

    stdout, stderr = proc.communicate()

    #os.system('convert coverage.ppm -transparent white ../html/images/pl.png')

    prediction = dat_to_json('coverage.dat')

    bbox = stdout.decode().split('|')

    # new L.LatLng(39.64795, -106.97509), //NE
    # new L.LatLng(39.589616, -107.050646) //SW
    elapsed = done - start
    print("final")
    print(elapsed)
    print()

    # {'NE': {'lat': float(bbox[1]), 'lng': float(bbox[2])}, 'SW': {'lat': float(bbox[3]), 'lng': float(bbox[4])}}
    return prediction


app = Flask(__name__)
# CORS(app)
cors = CORS(app, resources={r"/*": {"origins": "*"}})


@app.route("/api/create-prediction", methods=['POST'])
def create_map():
    print('POST request')
    req_data = request.get_json()
    print(req_data)
    prediction = create_prediction(req_data)
    response = jsonify(prediction)
    return response


@app.route("/api/test", methods=['GET'])
def test():
    response = "Flask server is working"
    return response


if __name__ == "__main__":
    # app.run()
    # makes the server externally visible
    # app.run(host='0.0.0.0', ssl_context='adhoc')
    app.run(host='0.0.0.0', port=5000)
