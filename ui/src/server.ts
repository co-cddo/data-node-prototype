import app from "./app";
import fs from "fs";
import https from "https";
import path from "path";

console.log('url',__dirname,__filename)
const options = {
  key: fs.readFileSync(
    path.join(__dirname, "../../fast.dm.cddo.cabinetoffice.gov.uk-key.pem")
  ),
  cert: fs.readFileSync(
    path.join(__dirname, "../../fast.dm.cddo.cabinetoffice.gov.uk.pem")
  ),
};

const port = process.env.PORT || 3000;
https.createServer(options, app).listen(port, () => {
  console.log(
    `HTTPS Server running at https://fast.dm.cddo.cabinetoffice.gov.uk:${port}/`
  );
});
