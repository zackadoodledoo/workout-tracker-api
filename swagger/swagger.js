import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'Workout Tracker API',
    description: 'API Documentation for my workout tracker endpoints'
  },
  host: 'localhost:3000',
  schemes: ['http']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/workouts.js'];

swaggerAutogen()(outputFile, endpointsFiles, doc);