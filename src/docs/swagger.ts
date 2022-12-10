import swaggerJSDoc, {OAS3Options} from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import {APP, PORT} from '../shared/types';

// Metadata info about our API
const swaggerOptions: OAS3Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Express API',
      version: '1.0.0',
      description:
        "This is a sample Pet Store Server based on the OpenAPI 3.0 specification.  You can find out more about Swagger at [https://swagger.io](https://swagger.io). In the third iteration of the pet store, we've switched to the design first approach! You can now help us improve the API whether it's by making changes to the definition itself or to the code. That way, with time, we can improve the API in general, and expose some of the new features in OAS3.",
    },
    components: {
      securitySchemes: {
        authToken: {
          type: 'http',
          scheme: 'bearer',
        },
      },
      schemas: {
        user: {
          type: 'object',
          properties: {
            id: {type: 'integer'},
            name: {type: 'string'},
            username: {type: 'string'},
            email: {type: 'string'},
            company: {
              $ref: '#/components/schemas/company',
            },
          },
        },
        company: {
          type: 'object',
          properties: {
            name: {type: 'string'},
            catchPrase: {type: 'string'},
            bs: {type: 'string'},
          },
        },
      },
    },
  },
  apis: ['./src/docs/*.yaml'],
};

// Docs in JSON format
const swaggerSpec = swaggerJSDoc(swaggerOptions);

// Function to setup our docs
export const swaggerDocs = (app: APP, port: PORT) => {
  app.use('/api/v1/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
  app.get('/api/v1/docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  console.log(
    `Version 1 Docs are available at http://localhost:${port}/api/v1/docs`,
  );
};
