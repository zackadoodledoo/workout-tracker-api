import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'Workout Tracker API',
    description: 'Documentation for my workout tracker endpoints'
  },
  host: 'localhost:3000',
  schemes: ['http']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./server.js']; // Point to your main server file

// Generate the JSON file
swaggerAutogen()(outputFile, endpointsFiles, doc);