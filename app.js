const http = require('http');
const fs = require('fs');
const {jsPDF} = require('jspdf');


const server = http.createServer((req, res) => {
    if (req.url === '/') {
        fs.readFile('index.html', function (err, data) {
            if (err) {
                res.statusCode = 500;
                res.end(`Error getting the file: ${err}.`);
            } else {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/html');
                res.end(data);
            }
        });
    } else {
        if (req.url === '/certificate') {
            // Default export is a4 paper, portrait, using millimeters for units
            const doc = new jsPDF('landscape');
            doc.text("Hello world!", 10, 10);
            doc.save("a4.pdf"); // will save the file in the current working directory
            doc.output('dataurlnewwindow',"certificate.pdf")
            res.statusCode = 200;
            res.end("ok");
        } else {
            res.statusCode = 404;
            res.end('Not Found\n');
        }
    }
    });

server.listen(3000, '127.0.0.1', () => {
    console.log('Server running at http://127.0.0.1:3000/');
});
