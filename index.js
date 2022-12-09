const express = require('express');

const routeproduto = require('./route/routeproduto');

const app = express();

app.use(express.json());

console.log('teste de github')

app.use('/', routeproduto);

app.listen(3000, ()=>{
    console.log('SERVIDOR RODANDO EM - http://localhost:3000');
});