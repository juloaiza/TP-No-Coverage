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

splat -t ./sites/siteB -metric -L 3.0 -d ./elevation -erp 1.3 -dbm -R 50 -kml -o path_loss_map

splat -t ./sites/siteA -metric -L 2.0 -d ./elevation -erp 0.5 -dbm -R 2 -kml -o path_loss_map

splat -t ./sites/siteA -metric -L 2.0 -d ./elevation -erp 0.2 -dbm -R 2 -kml -o path_loss_map -ano pathloss.dat

splat -t ./sites/siteB -metric -L 3.0 -d ./elevation -erp 1.2 -dbm -R 2 -kml -o path_loss_map -ano pathloss.dat -ngs

convert path_loss_map.ppm -transparent white pl.png
