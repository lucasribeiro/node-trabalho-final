import { Router } from 'express';
import { compare, compareSync, hash } from 'bcryptjs';
import AppError from '../errors/AppError';

const knex = require('knex')(require('../../knexfile.js').development);

const segurancaRouter = Router();


segurancaRouter.post('/register', async (request, response) => {

    const { nome, email, senha } = request.body;

    const hashPassword = await hash(senha, 8);

    await knex('usuarios').insert({nome: nome, email: email, senha: hashPassword}, ['id'])
    .then((seguranca: any) => {
       if (seguranca)
       {

          let id = seguranca[0].id;
          response.status(201).json({
             message: "Usuário criado com sucesso",
             data: {
                'id': id
             }
          });
       }
       else
       {
          response.status(400).json(`{messagem: "Erro ao criar o usuário"}`);
       }               
    }).catch((err: any) => {
       response.status(500).json(`{messagem: "Erro ao criar o usuário: " ${err.message}}`);
    });    
});   

segurancaRouter.post('/login', async (request, response) => {

    const { email, senha } = request.body;

    await knex('usuarios').where('email', email)
    .first()
     .then((usuario: any) => {
       if (usuario)
       {
          const checkPassword = compareSync(senha, usuario.senha);

          if (!checkPassword) {
            throw new AppError('Email/Senha inválidos.', 401);
          }
          else {
            response.status(200).json(usuario);
          }         
       }
       else
       {
          //response.status(400).json(`{messagem: "Usuário não encontrado"}`);
          throw new AppError('Usuário não encontrado', 400);
       }   
    });  
}); 

export default segurancaRouter;


