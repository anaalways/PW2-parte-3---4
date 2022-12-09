//IMPORTAÇÃO DO PACOTE SEQUELIZE
const Sequelize = require('sequelize');

//IMPORTAÇÃO DO ARQUIVO DE CONEXÃO COM O BANCO DE DADOS
const connection = require('../database/database');

/*
PARAMETROS DO MÉTODO DEFINE
1 - NOME DA TABELA - STRING
2 - OBJETO JSON: 
                NOME DO CAMPO DA TABELA
                TIPO DE DADO DO CAMPO DA TABELA
                REGRAS DO CAMPO DA TABELA (NULL, NOT NULL, DEFAULT...ETC)
*/
const modelproduto = connection.define(
    'tbl_produto',
    {
        cod_produto:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement:true
        },
        nm_produto:{
            type: Sequelize.STRING(200),
            allowNull: false
        },
        nm_cliente:{
            type: Sequelize.STRING(200),
            allowNull: false
        }


    }
);

//modelproduto.sync({force:true});

module.exports = modelproduto;