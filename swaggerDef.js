const swaggerDef = {
  openapi: '3.1.0',
  info: {
    title: 'Si and Container Application',
    description: `This is an Application to make Shipping Instruction(Si), then inside Si you could maintain Container data for your shipment. You can attempt to try this App by following this link [User Guide](http://localhost:8081/user). This App would be very No#01 of our web-based applications!

    You can now help us improve the App, whether it's by making changes to the definition itself or to the code.

    That way, with time, we can improve the API in general and expose some of the new features.`,
    version: '1.0.0',
  },
  servers: [
    {
      url: 'http://localhost:8080',
    },
  ],
  paths: {
    '/api/test/all': {
      get: {
        summary: 'Public API for testing',
        description: 'Public API for testing',
      },
    },
    '/api/auth/signup': {
      post: {
        summary: 'User Sign Up',
        description: 'Create a new user account.',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/UserSignUpRequest',
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'User was registered successfully!',
          },
          '500': {
            description: 'err.message',
          },
        },
      },
    },
    '/api/auth/signin': {
      post: {
        summary: 'User Sign In',
        description: 'Sign in to an existing user account.',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/UserSignInRequest',
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'loged in',
          },
          '401': {
            description: 'Invalid Password!',
          },
          '404': {
            description: 'User not found.',
          },
          '500': {
            description: 'err.message',
          },
        },
      },
    },
    '/api/si/create': {
      post: {
        summary: 'Create Si',
        description: 'Create a new Shipping Instruction.',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/SiCreateRequest',
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'newSi',
          },
          '500': {
            description: 'error',
          },
        },
      },
    },
    '/api/si/si/all': {
      get: {
        summary: 'Get all Si list',
        description: 'Get all Si List',
        headers: 'auth',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/SiListRequest',
              },
            },
          },
        },
      },
    },
    '/api/si/update': {
      put: {
        summary: 'Edit Si',
        description: 'Edit an existing Shipping Instruction.',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/SiEditRequest',
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Si edited successfully.',
          },
          '400': {
            description: 'Bad request.',
          },
        },
      },
    },
    '/api/si/delete': {
      delete: {
        summary: 'Delete Si',
        description: 'Delete an existing Shipping Instruction.',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/SiDeleteRequest',
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Si deleted successfully.',
          },
          '400': {
            description: 'Bad request.',
          },
        },
      },
    },
    '/api/container/create': {
      post: {
        summary: 'Create Container',
        description: 'Create a new Container.',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ContainerCreateRequest',
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Container created successfully.',
          },
          '400': {
            description: 'Bad request.',
          },
        },
      },
    },
    '/api/container/update': {
      put: {
        summary: 'Edit Container',
        description: 'Edit an existing Container.',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ContainerEditRequest',
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Container edited successfully.',
          },
          '500': {
            description: 'error.',
          },
        },
      },
    },
    '/api/container/delete': {
      delete: {
        summary: 'Delete Container',
        description: 'Delete an existing Container.',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ContainerDeleteRequest',
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Container deleted successfully.',
          },
          '400': {
            description: 'Bad request.',
          },
        },
      },
    },
  },
  components: {
    schemas: {
      UserSignUpRequest: {
        type: 'object',
        properties: {
          username: {
            type: 'string',
          },
          password: {
            type: 'string',
          },
          roles: {
            type: 'string',
          },
        },
      },
      UserSignInRequest: {
        type: 'object',
        properties: {
          username: {
            type: 'string',
          },
          password: {
            type: 'string',
          },
        },
      },
      SiCreateRequest: {
        type: 'object',
        properties: {
          siNo: {
            type: 'string',
          },
          siDate: {
            type: 'string',
            validation: { 'yyyy-mm-dd': {} },
          },
          siBatch: {
            type: 'string',
            validation: { '1': {}, '2': {} },
          },
          numContainer: {
            type: 'integer',
          },
          siDestination: {
            type: 'string',
            validation: { 'Nagoya': {}, 'Hakata': {}, 'Sendai': {} },
          },
        },
      },
      SiListRequest: {
        type: 'object',
        properties: {
          type: {
            type: 'string',
          },
        },
      },
      SiEditRequest: {
        type: 'object',
        properties: {
          // Define properties for SiEditRequest
        },
      },
      SiDeleteRequest: {
        type: 'object',
        properties: {
          // Define properties for SiDeleteRequest
        },
      },
      ContainerCreateRequest: {
        type: 'object',
        properties: {
          // Define properties for ContainerCreateRequest
        },
      },
      ContainerEditRequest: {
        type: 'object',
        properties: {
          // Define properties for ContainerEditRequest
        },
      },
      ContainerDeleteRequest: {
        type: 'object',
        properties: {
          // Define properties for ContainerDeleteRequest
        },
      },
    },
  },
};

module.exports = swaggerDef;
