const swaggerDefinition = {
    openapi: '3.0.0', // Swagger specification version.
    info: {
      title: 'Transfer Request Management API',
      version: '1.0.0',
      description: 'API to manage transfer requests with role-based access.',
      contact: {
        name: 'Your Name or Company Name',
        url: 'https://yourwebsite.com',
        email: 'contact@yourwebsite.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000/api/v1',
        description: 'Local server'
      },
      // When deploying your application, you can add more server configurations here.
      // {
      //   url: 'https://api.yourwebsite.com/v1',
      //   description: 'Production server'
      // }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  };
  
  module.exports = swaggerDefinition;
  