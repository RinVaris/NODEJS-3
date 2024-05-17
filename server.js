const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

const filePath = './views.json';


const loadViews = () => {
    if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath);
        return JSON.parse(data);
    }
    return { '/': 0, '/about': 0 };
};


const saveViews = (views) => {
    fs.writeFileSync(filePath, JSON.stringify(views));
};

let views = loadViews();

app.get('/', (req, res) => {
    views['/'] += 1;
    saveViews(views);
    res.send(`<h1>Корневая страница</h1><p>Просмотров: ${views['/']}</p><a href="/about">Ссылка на страницу /about</a>`);
});

app.get('/about', (req, res) => {
    views['/about'] += 1;
    saveViews(views);
    res.send(`<h1>Страница about</h1><p>Просмотров: ${views['/about']}</p><a href="/">Ссылка на страницу /</a>`);
});

app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});
