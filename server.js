import http from 'http';
import url from 'url';

// Функция для вычисления НОД (наибольший общий делитель) через алгоритм Евклида с BigInt
function gcd(a, b) {
    a = BigInt(a);
    b = BigInt(b);
    while (b !== 0) {
        const temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

// Функция для вычисления НОК (наименьшее общее кратное) с BigInt
function lcm(a, b) {
    a = BigInt(a);
    b = BigInt(b);
    return (a / gcd(a, b)) * b;
}

// Обработчик HTTP запросов
const server = http.createServer((req, res) => {
    // Проверяем, что запрос GET
    if (req.method !== 'GET') {
        res.writeHead(405);
        res.end('Method Not Allowed');
        return;
    }

    // Парсим URL
    const parsedUrl = url.parse(req.url, true);
    
    // Проверяем, что путь заканчивается на romanskirman_gmail_com
    const expectedPath = '/romanskirman_gmail_com';
    if (!parsedUrl.pathname.endsWith(expectedPath)) {
        res.writeHead(404);
        res.end('Not Found');
        return;
    }

    // Получаем параметры запроса
    const queryParams = parsedUrl.query;
    const xStr = queryParams.x;
    const yStr = queryParams.y;

    // Проверка, что параметры предоставлены
    if (!xStr || !yStr) {
        res.writeHead(400);
        res.end('NaN');
        return;
    }

    // Проверка, что строки содержат только числа (целые)
    if (!/^\d+$/.test(xStr) || !/^\d+$/.test(yStr)) {
        res.writeHead(200);
        res.end('NaN');
        return;
    }

    // Преобразуем к BigInt
    const x = BigInt(xStr);
    const y = BigInt(yStr);

    // Проверка, что числа являются натуральными (положительные)
    if (x <= 0 || y <= 0) {
        res.writeHead(200);
        res.end('NaN');
        return;
    }

    // Вычисляем НОК
    const result = lcm(x, y);

    // Возвращаем результат как строку с цифрами
    res.writeHead(200);
    res.end(result.toString());
});

// Порт для запуска сервера
const PORT = 3000;

server.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
    console.log(`URL: http://localhost:${PORT}/romanskirman_gmail_com`);
});
