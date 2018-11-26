import "@babel/polyfill";
import express from "express";
import bodyParser from "body-parser";
import { spawn } from "child_process";
import path from "path";

const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.post("/check", async (request, response) => {
  const domain = request.body.domain;
  try {
    const r = await runProcess("aws", [
      "--region",
      "us-east-1",
      "route53domains",
      "check-domain-availability",
      "--domain-name",
      domain
    ]);
    response.setHeader("content-type", "application/json");
    response.status(200).send(r);
  } catch (e) {
    response.status(500);
  }
});

app.post("/suggest", async (request, response) => {
  const domain = request.body.domain;
  try {
    const r = await runProcess("aws", [
      "--region",
      "us-east-1",
      "route53domains",
      "get-domain-suggestions",
      "--domain-name",
      domain,
      "--suggestion-count",
      "10",
      "--only-available"
    ]);
    response.setHeader("content-type", "application/json");
    response.status(200).send(r);
  } catch (e) {
    response.status(500);
  }
});

const port = 3000;
app.listen(port, () => console.log(`listening on port ${port}`));

async function runProcess(command, args) {
  return new Promise((resolve, reject) => {
    const p = spawn(command, args, {});
    const buffer = [];
    p.stdout.on("data", data => {
      buffer.push(data);
    });
    p.stderr.on("data", data => {
      console.error(`${data}`);
    });
    p.on("close", code => {
      if (code === 0) {
        resolve(Buffer.concat(buffer).toString());
      } else {
        reject({ command, args, code });
      }
    });
  });
}
