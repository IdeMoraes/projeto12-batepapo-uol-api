import express, { json } from "express";
import dotenv from 'dotenv';
import {MongoClient} from 'mongodb';
import joi from 'joi';

const app = express();
app.use(json());
dotenv.config();

let db=null;
const clienteMongo = new MongoClient(process.env.MONGO_URL);
const promessa = clienteMongo.connect();
promessa.then(()=>{
    db=clienteMongo.db(process.env.BANCO);
    console.log('Conectado ao banco de dados Mongo');
});
promessa.catch((e)=>{
    console.log('Erro ao se conectar ao banco de dados Mongo',e);
})

app.post('/participants',(req,res)=>{
    const participante = req.body;
    const participanteSchema = joi.object({name: joi.string().required()});
    const validacao = participanteSchema.validate(participante);
    if (validacao.error){
        res.sendStatus(422);
        return;
    }
})

const porta = process.env.PORT || 5000;
app.listen(porta,()=>{
    console.log(`Servidor ok! Porta ${porta}`)
})