
    //This file is for the API documentation using swagger
//import swagger-jsdoc
constswaggerAutogen = require('swagger-autogen')();
//varaible called doc for swagger
constdoc = {​​
info: {​​
title:'Internshp API',
description:'This API is to help students to track their internshop applications',
    }​​,
host:'localhost:3000',
schemas: ['http'],
}​​;
//outpur file for swagger
constoutputFile = 'swagger-output.json';
//input file for swagger
constendpointsFiles = ['./app.js'];
swaggerAutogen(outputFile, endpointsFiles, doc);
