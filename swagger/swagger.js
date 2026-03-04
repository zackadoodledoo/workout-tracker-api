import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'Workout Tracker API',
    description: 'API Documentation for my workout tracker endpoints'
  },
  host: 'localhost:3000',
  schemes: ['http'],
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Local development server'
    },
    {
      url: 'https://workout-tracker-api-ns8z.onrender.com',
      description: 'Production server (Render)'
    }
  ]
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/workouts.js'];

swaggerAutogen()(outputFile, endpointsFiles, doc);