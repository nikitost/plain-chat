import { App } from 'uWebSockets.js'
import { readFileSync, existsSync } from 'fs';

const port = 3000
const server = App()
const encoder = new TextEncoder();
const decoder = new TextDecoder();

server.ws('/*', {
    message: (ws, message, isBinary) => {
        const view = new Uint8Array(message);
        const buffer = encoder.encode(`Echo: ${decoder.decode(view)}`);
        const ok = ws.send(buffer, isBinary, true);
    }
}).get('/*', (res, req) => {
    const filePath = `.${req.getUrl()}`
    if (existsSync(filePath)) {
        let responseFile = readFileSync(filePath === './' ? './index.html' : filePath);
        res.writeStatus('200 OK').end(responseFile);
    }
    else {
        res.writeStatus('404 ERROR').end();
    }
}).listen(port, (listenSocket) => {
    if (listenSocket) {
        console.log(`Listening to port ${port}`);
    }
})
