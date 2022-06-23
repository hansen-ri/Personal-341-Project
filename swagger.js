const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Riley Hansen Personal Armory API',
    description: 'Armory API'
  },
  host: 'localhost:8080',
  schemes: ['http']
};
// change host to "cse341-personal04.herokuapp.com"

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);

// Run server after it gets generated
// swaggerAutogen(outputFile, endpointsFiles, doc).then(async () => {
//   await import('./index.js');
// });