import chalk from "chalk";
import express, {json} from "express";
import cors from "cors";

const app = express();
app.use(json());
app.use(cors());

const tweets = [];
const usuarios = [];

app.post("/sign-up", (req, res)=>{
    const body = req.body;
    usuarios.push(body);
    res.send("Ok");
});

app.post("/tweets", (req, res)=>{
    const body = req.body;
    const {username, tweet} = body;
    const {avatar} = usuarios.find(usuario=>usuario.username===username);
    tweets.push({
        username: username,
        avatar: avatar,
        tweet: tweet
    });
    res.send("Ok");
})

app.get("/tweets", (req,res)=>{
    if (tweets.length<=10) res.send([...tweets].reverse());
    else {
        res.send([...tweets].reverse().splice(0,10));
    }
})

app.listen(5000,()=>{
    console.log(chalk.bold.green('Servidor em pé na porta 5000'));
});