<<<<<<< HEAD
# p3aqua
=======
## Table of Contents

- [Overview](#overview)
- [Build Notes](#build-notes)
- [Updating With New Map Data](#updating-with-new-map-data)
- [To Do](#to-do)

## Overview

This project was initially developed Merrick Paquin-Mannington. This current version was built and is maintained by [Andy Wynden](https://www.andywynden.com). The heavy data lifter is Derek Jacoby, who takes the Sentinel-3 data and munches it through a pipeline to produce the imagery rendered in this application.

We used [React-Leaflet](https://react-leaflet.js.org/) as the backbone of this project. Many thanks to the lovely folks at [OSM](https://www.openstreetmap.org) without which our project and Leaflet would not be possible. [ReactStrap](https://reactstrap.github.io/) made it pretty.

## Build Notes

Because the data we get from the nightly processing of images from Compute Canada is in a seperate folder, I've created a script which re-creates the symlink to this folder inside the build folder. This means that **during deployment on the server, use npm run server-build**. On your local machine, running npm run build is just fine as you'll need to import a handful of overlays so that map data shows up properly

Place those overlays in an OLCI folder in the public directory before doing an npm run local-build and they will be copied properly. They are not checked in because then they would overwrite the symlink in the server version.

## deployment

server deployment consists of sync'ing the project on the server, then running server-build as above. The next step is to add a proxy-pass statement to your nginx server block for each route in the API on the server side. http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_pass

The nginx server block can simply point to the build folder for the client side, but the server side will have to be explicitly started. Just with the command "node server.js" for testing purposes, but for long-term deployment the use of pm2 or some other task runner is advised. This will allow the server to survive reboots.

make sure libnetcdf-dev is on the server per instructions here: https://www.npmjs.com/package/netcdf4

## Updating With New Map Data

There is a file - curDates.txt, of which an old version exists in the public/OLCI folder for development purposes. The one that gets updated regularly is the OLCI folder which is in the mnt folder on the server. curDates.txt contains a newline separated list of all the dates for which we have imagery, and which is fetched and parsed on component load so that the available dates will be selectable in the date dropdown.

## To Do

-Pinging the server to check if the image exists so we don't have a big fat nothing to display (with no error) if for some reason the imagery isn't found.

-Make ModSquad png smaller. Jeez.

## notes

on windows concurrently does not always work from a git shell. You may need to remove the $ in node_modules/spawn-default-shell/src/get-shell.js per this issue: https://github.com/angular/quickstart/issues/359

to run navigate to the server directory and execute "npm start" from there so that both server and client are started.

-

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). Please go see their documentation if you have any questions regarding this.
>>>>>>> 140f1bcbf4c414a65e12fa9360d95b303759eaf9
