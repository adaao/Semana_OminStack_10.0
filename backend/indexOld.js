const express = require('express');

const app = express();

app.use(express.json());
//Query params: request.query (filtros, paginação, ordenação, etc...)
//Rout params: request.params (identificar um recurso na alteração ou remoção)
//Body: request.body (dados para alteração ou criação de um registro)

app.post('/users/', (request, response) => {
   console.log(request.body);
   return response.json({message: 'Hello Adaão'});
});

app.listen(3333);
