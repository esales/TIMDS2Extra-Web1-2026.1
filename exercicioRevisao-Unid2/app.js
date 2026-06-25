const express = require('express');
const exphbs = require('express-handlebars');
const sequelize = require('./config/bd');
const Estudante = require('./models/estudante.model');
const methodOverride = require('method-override')

const app = express();

app.engine('handlebars', exphbs.engine({defaultLayout:false}));
app.set('view engine', 'handlebars');

app.use(express.urlencoded({extended:true}));

app.use(methodOverride('_method'));

//rota para listar todos os estudantes
app.get(
    '/',
    async (req, res) => {
        const estudantes = await Estudante.findAll({raw:true});
        res.render('listarEstudantes', { estudantes });
    }
)

//rota para abrir tela de cadastro de estudante
app.get(
    '/estudantes/create',
    (req, res) => {
        res.render('cadastrarEstudante');
    }
)

//rota para cadastrar estudante no banco de dados
app.post(
    '/estudantes',
    async (req, res) => {
        const nome = req.body.nome;
        const idade = req.body.idade;

        await Estudante.create({
            nome: nome,
            idade: idade
        });

        res.redirect('/')
    }
)

//rota para abrir a tela de editar
app.get(
    '/estudantes/:id/edit',
    async (req, res) =>{
        const id = req.params.id;
        const estudante = await Estudante.findByPk(id, {raw:true});

        res.render('editarEstudante', { estudante });
    }
)

//rota para salvar alterações
app.put(
    '/estudantes/:id',
    async(req, res) => {
        const id = req.params.id;
        const nome = req.body.nome;
        const idade = req.body.idade;

        const estudante = await Estudante.findByPk(id);

        estudante.nome = nome;
        estudante.idade = idade;
        estudante.save();

        res.redirect('/');
    }
)

//rota para deletar estudante
app.delete(
    '/estudantes/:id',
    async (req, res) => {
        const id = req.params.id;
        const estudante = await Estudante.findByPk(id);
        estudante.destroy();
        res.redirect('/');
    }
)




//

async function conectarBD(){
    try{
        await sequelize.sync();
        console.log('Conexão com banco de dados: ok!')
    }catch(e){
        console.log('Erro: ', e.message);
    }
}

conectarBD();

app.listen(3000, ()=>console.log('Servidor em execução.'));