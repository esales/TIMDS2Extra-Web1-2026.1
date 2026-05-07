const express = require('express');
const app = express();

let cursos = ['IPI', 'ADS', 'Qualidade', 'Comércio', 'Administração'];

app.use(express.json());


app.get(
    '/',
    (req, res) => res.send('Testando Express JS.')
)

app.get(
    '/estudante/:id',
    (req, res) => {
        const id  = req.params.id;
        res.send(`id do estudante: ${id}`);
    }
)

app.get(
    '/curso/:id',
    (req, res) => {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).send('ID inválido.');
        }

        if (id < 0 || id >= cursos.length) {
            return res.status(404).send('Id não encontrado.');
        }

        let curso = cursos[id];

        if (curso) {
            res.send(`Curso: ${curso}`);
        } 
    }
);

app.post(
    '/curso',
    (req, res) => {
        let curso = req.body.curso;

        if (!curso) {
            return res.status(400).send('Curso é obrigatório.');
        }

        cursos.push(curso);
        res.send(`Adicionado o curso ${curso}`);

    }
)

//Criar uma aplicação com Express que tenha um array com uma lista de elementos.
//Essa aplicação deve ter uma rota que recebe um id por parâmetro e retorna o elemento correspondente a esse id.
//Inclua tratamento de erros para o caso de um id inválido ou inexistente.


app.listen(
    3000,
    () => console.log('Servidor em execução')
);