const Http = require("http");
const Fs = require("fs");
const qs = require("querystring");
const less = Http.createServer(function (req, res) {
  //   var data = "Hello World!";
  switch (req.url) {
    case "/index.html":
      config("index");
      break;
    case "/header.html":
      config("header");
      break;
    case "/about.html":
      config("about");

      break;
    case "/contactus.html":
      config("contactus");

      break;
    case "/footer.html":
      config("footer");

      break;
    case "/registration.html":
      {
        //   config("registration");
        Fs.readFile(`registration.html`, function (err, data) {
          res.write(data);
          res.end("");
        });
        if (req.method == "POST") {
          res.writeHead(200, { etag: "aaaa" });

          let body = ``;
          req.on("data", function (data) {
            body += data;
          });
          req.on("end", function () {
            //   console.log(body);
            let parse = qs.parse(body);

            if (
              parse.name.length != "" &&
              parse.email.length != "" &&
              parse.password.length != ""
            ) {
              console.log(parse);
              if (parse.password.length >= 8) {
                res.write("Registration success");
                res.end("");
              } else {
                res.write("Error password is less than 8 characters");
                res.end("");
              }
            } else {
              res.write("input is required");
              res.end("");
            }
          });
        }
      }
      break;
    default:
      // res.writeHead(404, { etag: "aaaa" });
      res.write("error 404");
      res.end("");
      break;
  }
  function config(path) {
    res.writeHead(200, { etag: "aaaa" });
    Fs.readFile(`${path}.html`, function (err, data) {
      res.write(data);
      res.end("");
    });
  }
});
less.listen(8080);
