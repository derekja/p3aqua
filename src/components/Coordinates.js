import NetCDFReader from "netcdfjs";
const fs = require("fs");

export function getPixelData() {
  const data = fs.readFileSync("/OLCI/2019/05/25/polymer/mosaic_output.nc");

  //   var reader = new NetCDFReader(data); // read the header
  //   reader.getDataVariable("wmoId"); //

  console.log(fs);
}
