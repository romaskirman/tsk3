import http from 'http';
import url from 'url';

// Функция для вычисления НОД (наибольший общий делитель) через алгоритм Евклида
function gcd(a, b) {
    while (b !== 0) {
        const temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

// Функция для вычисления НОК (наименьшее общее кратное)
function lcm(a, b) {
    return (a / gcd(a, b)) * b;
}

// Обработчик HTTP запросов
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

    const queryParams = parsedUrl.query;
    const xStr = queryParams.x;
    const yStr = queryParams.y;

    if (!xStr || !yStr) {
        res.writeHead(400);
        res.end('NaN');
        return;
    }

    const x = Number(xStr);
    const y = Number(yStr);

    if (!Number.isInteger(x) || !Number.isInteger(y) || x <= 0 || y <= 0) {
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
    console.log(`Сервер запущен на порту ${PORT}`);
    console.log(`URL: http://localhost:${PORT}/romanskirman_gmail_com`);
});