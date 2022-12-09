/*IMPORTA O PACOTE DO EXPRESS PARA O SCRIPT index.js*/
const express = require('express');
const modelproduto = require('../model/modelproduto');

/*GERENCIADOR DE ROTAS DO EXPRESS*/
const router = express.Router();

/** ROTAS DE CRUD DE CATEGORIA **/
//ROTA DE CADASTRO DE CATEGORIA
//NOME(P1, P2, P3, P4){}
router.post('/cadastrarProduto', (req, res)=>{
    console.log(req.body);
    // let nome_categoria = req.body.nome_categoria;
    let {nm_produto, nm_cliente} = req.body;
    modelproduto.create(
        //DADOS DA INSERÇÂO
        {nm_produto, nm_cliente}
    ).then(
        ()=>{
            return res.status(201).json({
                erroStatus:false,
                mensagemStatus:"PRODUTO INTERCALADO COM SUCESSO."
            })
        }
    ).catch(
        (error)=>{
            return res.status(400).json({
                erroStatus:true,
                mensagemStatus:"ERRO AO CADASTRAR O PRODUTO.",
                errorObject:error
            });
        }
    );

    // res.send('ROTA DE CADASTRO DE CATEGORIA!');
    // console.log('TESTE DE NODEMON');

});

//ROTA DE LISTAGEM DE CATEGORIA SEM CRITÉRIO
router.get('/listarProduto', (req, res)=>{

    modelproduto.findAll()
        .then(
            (response)=>{
                //console.log(response);
                return res.status(200).json({
                    erroStatus:false,
                    mensagemStatus:"PRODUTOS LISTADOS COM SUCESSO.",
                    data:response
                })
            }
        ).catch(
            (error)=>{
                return res.status(400).json({
                    erroStatus:true,
                    mensagemStatus:"ERRO AO LISTA OS PRODUTOS.",
                    errorObject:error
                });
            }
        );

});

//ROTA DE LISTAGEM DE CATEGORIA POR COD_CATEGORIA
router.get('/listarProduto', (req, res)=>{

    //DECLARAR E RECEBER O DADO DE CODIGO DE CATEGORIA
    let {nm_produto, nm_cliente} = req.params;

    //AÇÃO DE SELEÇÃO DE DADOS DO SEQUELIZE
    modelproduto.findByPk(nm_produto, nm_cliente)
    .then(
        (response)=>{
            return res.status(200).json({
                erroStatus:false,
                mensagemStatus:"PRODUTO RECUPERADO COM SUCESSO.",
                data:response
            })
        }
    )
    .catch(
        (error)=>{
            return res.status(400).json({
                erroStatus:true,
                mensagemStatus:"ERRO AO RECUPERAR O PRODUTO.",
                errorObject:error
            });
        }
    )

});

//ROTA DE LISTAGEM DE CATEGORIA POR NOME_CATEGORIA
router.get('/listarProduto', (req, res)=>{

    let {nm_produto, nm_cliente} = req.params;

    modelproduto.findOne({attributes:['cod_produto', 'nome_produto'],where:{nm_produto,cod_produto, nm_cliente}})
    .then(
        (response)=>{
            return res.status(200).json({
                erroStatus:false,
                mensagemStatus:"PRODUTO RECUPERADO COM SUCESSO.",
                data:response
            })
        }
    )
    .catch(
        (error)=>{
            return res.status(400).json({
                erroStatus:true,
                mensagemStatus:"ERRO AO RECUPERAR O PRODUTO.",
                errorObject:error
            });
        }
    )

});

//ROTA DE ALTERAÇÃO DE CATEGORIA
router.put('/alterarProduto', (req, res)=>{

    // const cod_categoria = req.body.cod_categoria;
    // const nome_categoria = req.body.nome_categoria;
    const {cod_produto, nm_produto, nm_cliente} = req.body;

    modelproduto.update(
        { nm_produto, nm_cliente},
        {where:{cod_produto}}
    ).then(
        ()=>{
            return res.status(200).json({
                erroStatus:false,
                mensagemStatus:"PRODUTO ALTERADO COM SUCESSO."
            })
        }
    ).catch(
        (error)=>{
            return res.status(400).json({
                erroStatus:true,
                mensagemStatus:"ERRO AO ALTERAR O PRODUTO.",
                errorObject:error
            });
        }
    );
    
});

//ROTA DE EXCLUSÃO DE CATEGORIA
router.delete('/excluirProduto/:cod_produto', (req, res)=>{
    console.log(req.params);
    let {cod_produto} = req.params

    modelproduto.destroy(
        {where:{cod_produto}}
    ).then(
        ()=>{
            return res.status(200).json({
                erroStatus:false,
                mensagemStatus:"Produto excluído!"
            })
        }
    ).catch(
        (error)=>{
            return res.status(400).json({
                erroStatus:true,
                mensagemStatus:"ERRO AO EXCLUIR O PRODUTO.",
                errorObject:error
            });
        }
    );
});

module.exports = router;


