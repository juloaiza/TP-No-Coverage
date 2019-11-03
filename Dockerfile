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
WORKDIR /splat-work

# Copy slpat
COPY ./splat-1.4.2 ./

RUN ./configure

FROM splat

# Working directory
WORKDIR /app

