const express = require('express');
const app = express();

app.get(
    '/',
    (req, res) => { res.send('Página principal') }
);

app.get(
    '/jaboatao',
    (req, res) => { res.send('Lista de cursos de jaboatão') }
);

app.get(
    '/recife',
    (req, res) => { res.send('Lista de cursos de recife') }
);

app.get(
    '/igarassu',
    (req, res) => { res.send('Lista de cursos de igarassu') }
);



app.listen(
    3000, 
    () => { console.log('Servidor rodando na porta 3000') }
);