//Importações
const express = require('express');
const db = require('./conexao');

//Criar o app NodeJS
const app = express();
app.use(express.json());

const cors = require('cors');
app.use(cors());

//Rodar o Servidor
const porta = 3000;
app.listen(porta, () => {
    console.log("Servidor executando na porta de nº"+porta);
});

//Criar uma rota para consultar vw_tudo
app.get('/pessoas', (req, res)=>{
    const sql = "SELECT * FROM vw_tudo";
    db.query(sql, (erro, resultados) => {
        if(erro){
            return res.json({mensagem:"Falha ao consultar: "+erro.message});
        }
        return res.json(resultados);
    });
    
});// Fim da rota para consultar vw_tudo


//Criar uma rota para consultar situação ativo vw_tudo
app.get('/pessoas/ativo', (req, res)=>{
    const sql = "SELECT * FROM vw_tudo WHERE situacao = 'ativo'";
    db.query(sql, (erro, resultados) => {
        if(erro){
            return res.json({mensagem:"Falha ao consultar: "+erro.message});
        }
        return res.json(resultados);
    });
    
});// Fim da rota para consultar situação ativo vw_tudo


//Criar uma rota para consultar situação inativo vw_tudo
app.get('/pessoas/inativo', (req, res)=>{
    const sql = "SELECT * FROM vw_tudo WHERE situacao = 'inativo'";
    db.query(sql, (erro, resultados) => {
        if(erro){
            return res.json({mensagem:"Falha ao consultar: "+erro.message});
        }
        return res.json(resultados);
    });
    
});// Fim da rota para consultar situação inativo vw_tudo

//Criar uma rota cadastrar pessoas
app.post('/pessoas', (req, res)=>{
    const {nome, fk_funcao, situacao} = req.body;
    const sql = `INSERT INTO tb_colaboradores
                 (nome, fk_funcao, situacao) VALUES (?, ?, ?)`;
    
    db.query(sql, [nome, fk_funcao, situacao], (erro, resultados)=>{
        if(erro){
            return res.json({mensagem: "Falha ao cadastrar: "+erro.message});
        }
        return res.json({mensagem: "Cadastrado com sucesso!"});
    });
});//Fim da rota cadastrar pessoas

//Criar uma rota para consultar funções vw_tudo
app.get('/funcoes', (req, res)=>{
    const sql = "SELECT * FROM tb_funcoes";
    db.query(sql, (erro, resultados) => {
        if(erro){
            return res.json({mensagem:"Falha ao consultar: "+erro.message});
        }
        return res.json(resultados);
    });
    
});// Fim da rota para consultar funcoes

//Criar uma rota cadastrar funcoes
app.post('/funcoes', (req, res)=>{
    const {cod_funcao, cargo} = req.body;
    const sql = `INSERT INTO tb_funcoes
                 (cod_funcao, cargo) VALUES (?, ?)`;
    
    db.query(sql, [cod_funcao, cargo], (erro, resultados)=>{
        if(erro){
            return res.json({mensagem: "Falha ao cadastrar: "+erro.message});
        }
        return res.json({mensagem: "Cadastrado com sucesso!"});
    });
});//Fim da rota cadastrar funcoes



