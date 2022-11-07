const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Interny API',
    description: 'A APi THAT HELP YOU TRACK YOUR INTERNSHIP APPLICATIONS'
  },
  host: '',
  schemes: ['http', 'https']
};

const outputFile = 'swagger-output.json';
const endpointsFiles = ['./index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);