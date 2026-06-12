import http from 'http';
import url from 'url';

function gcd(a, b) {
    while (b !== 0) {
        const temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

function lcm(a, b) {
    const g = gcd(a, b);
    return (a * b) / g;
}

const server = http.createServer((req, res) => {
    if (req.method !== 'GET') {
        res.writeHead(405);
        res.end('Method Not Allowed');
        return;
    }

    const parsedUrl = url.parse(req.url, true);

    const expectedPath = '/romanskirman_gmail_com';
    if (!parsedUrl.pathname.endsWith(expectedPath)) {
        res.writeHead(404);
        res.end('Not Found');
        return;
    }

    const { x: xStr, y: yStr } = parsedUrl.query;

    if (!xStr || !yStr) {
        res.writeHead(400);
        res.end('NaN');
        return;
    }

    const x = Number(xStr);
    const y = Number(yStr);

    if (
        !Number.isInteger(x) ||
        !Number.isInteger(y) ||
        x <= 0 ||
        y <= 0
    ) {
        res.writeHead(200);
        res.end('NaN');
        return;
    }

    const result = lcm(x, y);

    res.writeHead(200);
    res.end(String(result));
});

const PORT = 3000;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`URL: http://localhost:${PORT}/romanskirman_gmail_com`);
});