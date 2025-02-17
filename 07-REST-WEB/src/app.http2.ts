import http2 from 'http2';
import fs from 'fs';

const server = http2.createSecureServer( {
    key: fs.readFileSync('./keys/server.key'),
    cert: fs.readFileSync('./keys/server.crt')
} ,(req, res) => {
    console.log(req.url);
    switch(true) {
        case (req.url === '/'):
            const htmlFile = fs.readFileSync('./public/index.html', 'utf-8');
            res.writeHead(200, { "Content-Type": 'text/html' });
            res.end(htmlFile);
            break;
        case ((/^.+\.css$/).test(req.url ?? '')):
            const cssFile = fs.readFileSync('./public/css/style.css', 'utf-8');
            res.writeHead(200, { "Content-Type": 'text/css' });
            res.end(cssFile);
            break;
        case ((/^.+\.js$/).test(req.url ?? '')):
            const jsFile = fs.readFileSync('./public/js/app.js', 'utf-8');
            res.writeHead(200, { "Content-Type": 'application/javascript' });
            res.end(jsFile);
            break;
        default:
            res.writeHead(404, { "Content-Type": 'text/html' });
            res.end();
            break;
    }
    // res.writeHead(200, {
    //     'Content-Type': 'text/html'
    // });
    // res.write(`<h1> Hola Mundo </h1>`);
    // res.end();

    // const data = {
    //     name: 'John Doe',
    //      age: 30,
    //      city: 'New York'
    // };
    // res.writeHead(200, {
    //     'Content-Type': 'application/json'
    // });
    // res.end(JSON.stringify(data));

    
});

server.listen(8080, () => {
    console.log('Server running in 8080');
});