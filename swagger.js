
 const swaggerAutogen = require('swagger-autogen')();

 const doc = {
   info: {
     title: 'Internshp API',
     description: 'This API is to help students to track their internshop applications',
   },
   host: 'localhost:3030',
   schemes: ['http'],
 };
 
 const outputFile = 'swagger-output.json';
 const endpointsFiles = ['app.js'];
 
 /* NOTE: if you use the express Router, you must pass in the 
    'endpointsFiles' only the root file where the route starts,
    such as index.js, app.js, routes.js, ... */
 
 swaggerAutogen(outputFile, endpointsFiles, doc);
 