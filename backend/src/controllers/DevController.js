const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');
const { findConnections, sendMessage } = require('../websocket');

module.exports = {
   async index(request, response){
      const devs = await Dev.find();

      return response.json(devs);
   },
   
   async store(request, response) {
      const { github_username, techs, latitude, longitude} = request.body;
      
      let dev = await Dev.findOne({ github_username });
      
      if (!dev){
         const apiResponse = await axios.get(`http://api.github.com/users/${github_username}`);
      
         const {name = login, avatar_url, bio} = apiResponse.data;
         
         const techsArray = parseStringAsArray(techs);
         
         const location = {
            type: 'Point',
            coordinates: [longitude, latitude],
         };
      
         dev = await Dev.create({
            github_username,
            name,
            avatar_url,
            bio,
            techs: techsArray,
            location, 
         });

         // Filtrar os Devs que estão a menos de 10 km
         // e que o novo Dev tenha ao menos uma das techs filtradas
         const sendSocketMessageTo = findConnections(
            { latitude, longitude },
            techsArray,
         );

         sendMessage(sendSocketMessageTo, 'new-dev', dev);

      }else{
         console.log('O usuário já foi cadastrado anteriormente');
      }
      
      
      return response.json(dev);
   },
};

