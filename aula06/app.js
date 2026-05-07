//carregando dependências
const express = require('express');
const exphbs = require('express-handlebars');
const db = require('./config/database');
const Filme = require('./models/Filme.model');

//criando objeto do Express
const app = express();

//configurando o Express para utilizar o Handlebars
app.engine(
    'handlebars', 
    exphbs.engine( {defaultLayout: false} )
);
app.set(
    'view engine', 
    'handlebars'
);

//rota de exemplo
app.get(
    '/',
    async (req, res) => {
        let dados = await retornarFilmes();
        res.render('principal', dados);
    }
)

async function testarConexao() {
    try{
        await db.authenticate();
        console.log('Conexão com BD estabelecida com sucesso!');

    } catch(erro){
        console.error('Erro ao conectar:', erro);
    }
}

async function sincronizarBD(){
    try{
        await db.sync({ force: false });
        console.log('Tabelas sincronizadas com sucesso!');
    } catch(erro){
        console.error('Erro ao sincronizar:', erro);
    }
}

async function operacoesCRUD(){
    try{
        let filme = await Filme.create(
            {
                titulo: 'O maskara',
                sinopse: 'Stanley Ipkiss é um tímido funcionário de banco que tem sua vida transformada quando encontra uma máscara mágica que lhe concede poderes extraordinários. Com a máscara, ele se torna um herói brincalhão e carismático, enfrentando vilões e conquistando o coração de uma bela repórter. No entanto, ele também precisa lidar com as consequências de suas ações e aprender a controlar seus novos poderes para proteger aqueles que ama.',
            }
        );

        imprimirFilme(filme);

        // filme = await Filme.findByPk(2);
        // filme.destroy();
        // console.log('Filme deletado: ', filme.id, '-', filme.titulo);

    } catch(erro){
        console.error('Erro nas operações CRUD:', erro);
    }
}

async function criarFilme(titulo, sinopse){
    try{
        const filme = await Filme.create({ titulo, sinopse });
        console.log('Filme criado com sucesso!');
        imprimirFilme(filme);

    } catch(erro){
        console.error('Erro ao criar filme:', erro);
    }
}

function imprimirFilme(filme){
    console.log('id: ', filme.id);
    console.log('titulo: ', filme.titulo);
    console.log('sinopse: ', filme.sinopse);
    console.log('-----------------------------');
}

async function retornarFilmes(){
    try{
        let filmes = await Filme.findAll();
        // filmes.forEach( filme => imprimirFilme(filme) );

        filmes = filmes.map( filme => filme.dataValues );
        
        return { filmes };

    } catch(erro){
        console.error('Erro ao retornar filmes:', erro);
    }
}

async function retornarFilmePorId(id){
    try{
        const filme = await Filme.findByPk(id);

        if (filme){
            imprimirFilme(filme);
        } else {
            console.log('Filme não encontrado com id: ', id);
        }
    } catch(erro){
        console.error('Erro ao retornar filme por id:', erro);
    }
}

async function retornarFilmePorTitulo(titulo){
    try {
        const filme = await Filme.findOne( { where: { titulo: titulo } });

        if (filme){
            imprimirFilme(filme);
        } else {
            console.log('Filme não encontrado com título: ', titulo);
        }

    }catch(erro){
        console.error('Erro ao retornar filme por título:', erro);
    }
}

async function atualizarFilme(id, novoTitulo, novaSinopse){
    try{
        const filme = await Filme.findByPk(id);

        if (filme){

            if (novoTitulo)
                filme.titulo = novoTitulo;

            if(novaSinopse)
                filme.sinopse = novaSinopse;

            await filme.save();

            console.log('Filme atualizado com sucesso!');
        } else {
            console.log('Filme não encontrado com id: ', id);
        }
    } catch(erro){
        console.error('Erro ao atualizar filme:', erro);
    }
}

async function excluirFilme(id){
    try{
        const filme = await Filme.findByPk(id);

        if (filme){
            await filme.destroy();
            console.log('Filme excluído com sucesso!');
        } else {
            console.log('Filme não encontrado com id: ', id);
        }

    }catch (erro){
        console.error('Erro ao excluir filme:', erro);
    }
}

sincronizarBD();

// operacoesCRUD();

// retornarFilmes();

// retornarFilmePorId(3);

// retornarFilmePorTitulo('O maskara');

// retornarFilmePorId(2);

// atualizarFilme(2, null, 'Sinopse atualizada do filme O maskara.');

// retornarFilmePorId(2);

// criarFilme('Novo filme', 'Sinopse do novo filme criado.');

// excluirFilme(5);

app.listen(
    3000,
    () => console.log('Servidor em execução...')    
)