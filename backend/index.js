const express = require('express');

const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb+srv://omnistack:40718665@cluster0-hiwos.mongodb.net/week10?retryWrites=true&w=majority', {
   useNewUrlParser: true,
   useUnifiedTopology: true
});

app.use(express.json());
//Query params: request.query (filtros, paginação, ordenação, etc...)
//Rout params: request.params (identificar um recurso na alteração ou remoção)
//Body: request.body (dados para alteração ou criação de um registro)

app.post('/users/', (request, response) => {
   console.log(request.body);
   return response.json({message: 'Hello Adaão'});
});

app.listen(3333);
