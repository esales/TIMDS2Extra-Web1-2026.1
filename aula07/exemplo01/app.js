//Carregando a biblioteca do Express
const express = require('express');

//Carregando a biblioteca do Handlebars
const exphbs = require('express-handlebars'); 

//Carregando a configuração do banco de dados
const db = require('./config/database');

//Carregando o model de Livro
const Livro = require('./models/Livro.model');

//Instanciando o objeto do Express
const app = express();

let livros = [
    {
        id: 1,
        titulo: 'O senhor dos anéis',
        autor: 'J.R.R. Tolkien',
        ano: 1954
    },
    {
        id: 2,
        titulo: 'As dores do mundo',
        autor: 'Arthur Schopenhauer',
        ano: 1819
    },
    {
        id: 3,
        titulo: 'Metamorfose',
        autor: 'Franz Kafka',
        ano: 1915
    },
    {
        id: 4,
        titulo: 'Metafísica do belo',
        autor: 'Arthur Schopenhauer',
        ano: 1820
    },
    {
        id: 5,
        titulo: 'Carta ao pai',
        autor: 'Franz Kafka',
        ano: 1922
    },
    {
        id: 6,
        titulo: 'Sobre a psicologia',
        autor: 'Carl Jung',
        ano: 1928
    }
];

//Configuração do Handlebars
//defaultLayout: false -> para não usar o layout padrão do Handlebars
app.engine(
    'handlebars',
    exphbs.engine( {defaultLayout: false} )
);
app.set(
    'view engine',
    'handlebars'
)

// app.get(
//     '/livros',
//     (req, res) => res.render('listarLivros', { livros } )
// )

app.get(
    '/livros',
    async (req, res) => {
        let livros = await Livro.findAll();
        livros = livros.map( l => l.dataValues );

        console.log(livros);

        res.render('listarLivros', { livros } )
    }
)

// app.get(
//     '/livros/:id',
//     (req, res) => {
//         const id = parseInt(req.params.id);

//         const livro = livros.find( l => l.id === id );

//         if (livro) {
//             res.render('detalhesLivro', { livro } );
//         } else {
//             res.status(404).send('Livro não encontrado');
//         }
        
//     }

// )

app.get(
    '/livros/:id',
    async (req, res) => {
        const id = parseInt(req.params.id);

        let livro = await Livro.findByPk(id);

        if (livro) {
            livro = livro.dataValues;
            res.render('detalhesLivro', { livro } );
        } else {
            res.status(404).send('Livro não encontrado');
        }
        
    }

)

async function conectarBD(){
    try {
        await db.sync({force: false});
        console.log('Banco de dados conectado!');
    } catch (e) {
        console.error('Erro ao conectar ao banco de dados:', e);
    }
}

conectarBD();

app.listen(
    3000,
    () => console.log('Servidor em execução!')
)