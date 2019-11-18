FROM ubuntu:18.04 as splat

# Update repos and install dependencies
RUN apt-get update \
    && apt-get -y upgrade \
    && apt-get -y install build-essential libbz2-dev zlib1g-dev \
    imagemagick

# bzip & zlib
#zlib1g-dev libncurses5-dev
#libbz2-1.0 libbz2-dev libbz2-ocaml libbz2-ocaml-dev


#Working directory
WORKDIR /app/Signal-Server

# Copy slpat
COPY ./Signal-Server ./

RUN make
RUN mkdir /app/Signal-Server/bin
RUN mv signalserver signalserverHD signalserverLIDAR ./bin

FROM python:3.7.3-slim-stretch

# Update repos and install dependencies
RUN apt-get update \
    && apt-get -y install imagemagick

#Copy splat/signal-server
COPY --from=splat /app/Signal-Server/bin/ /usr/local/bin/

# Working directory
WORKDIR /app

# Packages that we need 
COPY requirement.txt ./

# instruction to be run during image build
RUN pip install --no-cache-dir -r requirement.txt

# ENTRYPOINT ["/bin/sh", "-c", "cd /app/src; python /app/src/server.py"]