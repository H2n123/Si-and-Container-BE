// server.js
// Import dependencies
const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./app/models');
// Set up Express app
const app = express();

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerDef = require('./swaggerDef.js');

// Definisi Swagger
const options = {
  definition: swaggerDef,
  apis: ['./swaggerDef.js'], // Sesuaikan dengan path file rute Anda
};
const specs = swaggerJsdoc(options);

// Middleware untuk mengekspose Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

var corsOptions = {
  origin: 'http://localhost:8081' // Front End Port
};

// Use CORS middleware
app.use(cors(corsOptions));

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Parse requests of content-type - application/json
app.use(bodyParser.json());

// Simple route
app.get('/', (req, res) => {
  res.json({ message: 'My 1st Project: Welcome to the Express JWT Authentication application.' });
});

// Sync database: force : true drop the data with new:false remaining existing datas
db.sequelize.sync({ force: false }).then(() => {
    console.log("Drop and re-sync db.");
    // initializeRoles();
  });
  
  // Fungsi untuk inisialisasi roles
  // const initializeRoles = () => {
  //   const Role = db.role;
  
  //   // Inisialisasi roles
  //   Role.create({
  //     id : 1,
  //     name: "user",
  //   });
  
  //   Role.create({
  //     id : 2,
  //     name: "admin",
  //   });
  
  //   Role.create({
  //     id : 3,
  //     name: "moderator",
  //   });
  
  //   console.log("Roles initialized successfully.");
  // };
  
// Set up routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require("./app/routes/si.routes")(app);
require("./app/routes/container.routes")(app);
// require("./app/routes/logbook.routes")(app);

// Set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


