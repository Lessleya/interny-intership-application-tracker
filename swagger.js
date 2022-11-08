const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Internship API',
    description: 'A  cool app to track your internship applications'
  },
  host: '',
  schemes: ['http', 'https']
};

const outputFile = 'swagger-output.json';
const endpointsFiles = ['./app.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);