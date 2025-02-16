import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from 'swagger-ui-express'
import { Express } from "express";

const options:swaggerJSDoc.Options={
    definition:{
        openapi: '3.0.0',
        info: {
            title: 'E-commerce Product Lsiting',
            version: '1.0.0',
            description: 'API documenation for E-commerce Product Listing'
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Local development server'
            },
        ],
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                },
            },
        },
    },
    apis:['./dist/routes/*.js'],
}

const swaggerSpec=swaggerJSDoc(options);

const swaggerDocs = (app:Express) =>{
    app.use('/api-docs', swaggerUi.serve ,swaggerUi.setup(swaggerSpec));
    console.log('Swagger Docs available at http://localhost:3000/api-docs');
}

export default swaggerDocs;