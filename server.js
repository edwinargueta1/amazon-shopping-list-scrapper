import http from "http";
import fs from "fs";
import path from "path";
import axios from 'axios';
import { Cheerio } from "cheerio";
import * as list from "./src/list.json"

const hostname = '0.0.0.0';
const port = 3005;

const server = http.createServer(async(req, res) => {
    console.log(req.url, req.method);

    // Set the default file path to index.html if the root is requested
    let filePath = req.url === '/' ? './index.html' : `.${req.url}`;
    console.log(filePath);

    // Determine the content type based on the file extension
    const ext = path.extname(filePath);
    let contentType = 'text/html'; // Default to HTML

    switch (ext) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.html':
            contentType = 'text/html';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
        case '.jpeg':
            contentType = 'image/jpeg';
            break;
        default:
            contentType = 'text/plain';
    }

    // Read and serve the requested file
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/plain');
            res.end('404 Not Found');
            return;
        }
        
        res.statusCode = 200;
        res.setHeader('Content-Type', contentType);
        res.end(data);
    });
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

function scrapeAmazonProduct(){
    
}
async function getListData(){
    const data = [];
}