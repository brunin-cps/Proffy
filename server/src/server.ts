import express from 'express';
import routes from './routes';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333);



//Observaçoes--------------------
//get
//post
//put
//delete

//Request body: Dados para criação ou atualizacao de um registro
//Route Parans: Identifica qual recurso atualizar ou deletar
//Query Parans: Paginação, filtros,ordenação
