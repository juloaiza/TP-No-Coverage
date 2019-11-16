docker build -t splat .

docker run -it -v `pwd`:/app splat bash

SPLAT! is a command-line driven application and reads input data through a number of data files. Some
files are mandatory for successful execution of the program, while others are optional. Mandatory files
include digital elevation topography models in the form of SPLAT Data Files (SDF files), site location files
(QTH files), and Irregular Terrain Model parameter files (LRP files). Optional files include city location
files, cartographic boundary files, user-defined terrain files, path loss input files, antenna radiation pattern
files, and color definition files.

Mandatory files

.- Digital elevation topography models in the form of SPLAT Data Files (SDF files),
.- Site location files (QTH files)
.- Irregular Terrain Model parameter files (LRP files).

https://www.onetransistor.eu/2016/07/radio-link-analysis-splat-point-to-pont.html

splat -t ./sites/siteB -metric -L 3.0 -d ./elevation -erp 1.3 -dbm -R 50 -kml -o path_loss_map

splat -t ./sites/siteA -metric -L 2.0 -d ./elevation -erp 0.5 -dbm -R 2 -kml -o path_loss_map

splat -t ./sites/siteA -metric -L 3.0 -d ./elevation -erp 1.1 -dbm -R 2 -kml -o path_loss_map -ano pathloss.dat

splat -t ./sites/siteB -metric -L 3.0 -d ./elevation -erp 1.2 -dbm -R 2 -kml -o path_loss_map -ano pathloss.dat -ngs

splat-hd -t ./sites/siteA -metric -L 3.0 -d ./elevation-hd -erp 1.1 -dbm -R 2 -kml -o path_loss_map -ano pathloss.dat -ngs

convert path_loss_map.ppm -transparent white pl.png
convert path_loss_map.ppm -transparent white ../html/images/pl.png

splat -t ./sites/siteC.qth -metric -L 1.5 -d ./elevation -erp 5 -dbm -R 2 -kml -o path_loss_map -ano pathloss.dat -ngs

splat-hd -t ./sites/siteC.qth -metric -L 1.5 -d ./elevation-hd -erp 5 -dbm -R 2 -kml -o path_loss_map -ano pathloss.dat -ngs

export PATH=\$PATH:/app2/Signal-Server

INPUTS: 750MHz tower at 25f AGL with 5W ERP, 2km radius
OUTPUTS: 3600 resolution, 30km radius, 10dBuV receiver threshold, Hata model

signalserverHD -sdf ./elevation-hd -lat 39.618783 -lon -107.012868 -txh 4.37 -f 750 -erp 5 -rxh 1.5 -o test2 -R 2 -res 3600 -pm 3
