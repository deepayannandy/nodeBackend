import swaggerAutogen from "swagger-autogen";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 5000;

const doc = {
  info: {
    title: "NodeJs Backend",
    version: "1.0",
    description: "This is the documentation for the NodeJs Backend project",
  },
  servers: [
    { url: `http://localhost:${port}`, description: "Local Test endpoint" },
  ],
  tags: [
    { name: "Auth", description: "Authentication APIs" },
    { name: "User", description: "Users APIs" },
  ],
  securityDefinitions: {
    bearerAuth: {
      type: "http",
      scheme: "bearer",
      bearerFormat: "JWT",
      description: "Enter JWT token as: Bearer <token>",
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
  components: {
    parameters: {
      deviceTypeHeader: {
        name: "x-device-type",
        in: "header",
        required: true,
        schema: {
          type: "string",
          enum: ["web", "mobile"],
          example: "web",
        },
        description: "Type of device making the request",
      },
    },
  },
};

const outputFile = "./swagger-output.json";
const routes = ["./src/index.ts"];

swaggerAutogen({ openapi: "3.0.0" })(outputFile, routes, doc);
