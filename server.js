/*
 *  server.js
 *
 *   This just provides a simple static server for the project.
 *
 */

let http = require('http'),
fs = require('fs'),
path = require('path'),

// set root with first argument, or current working dir
root = process.argv[2]|| './public', //process.cwd(),

// set port with second argument, or 8888
port = process.argv[3] || 8888; // port 8888 for now

// create and start the server
http.createServer(function (req, res) {

    // get the path
    let p = path.join(root, req.url);

    // get stats of that path
    fs.lstat(p, function (e, stat) {

        // if error end
        if (e) {

            res.end();

        }

        // if stats check it out
        if (stat) {

            // if it is not a file append index.html to path, and try that
            if (!stat.isFile()) {
                p = path.join(p, 'index.html');
            }

            // try to read the path
            fs.readFile(p, 'binary', function (e, file) {

                // if error end
                if (e) {

                    res.writeHead(500);
                    res.write(e);
                    res.end();

                }

                // if file, send it out
                if (file) {

                    res.writeHead(200);
                    res.write(file, 'binary');
                    res.end();
                }

            });

        } else {

            res.end();

        }

    });

}).listen(port, function () {

    console.log('server up on port: ' + port);

});
