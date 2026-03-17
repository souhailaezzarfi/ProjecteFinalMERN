require("dotenv").config();
require("./mongo");

const express = require("express");
const app = express();
const cors = require("cors");

const Recepte = require("./models/Recepte");
const notFound = require("./middlewares/notFound");
const handleErrors = require("./middlewares/handleErrors");
app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = [process.env.CORS_ORIGIN, "http://localhost:5174"];
      // Permet peticions sense origin (Postman, REST Client, curl)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  }),
);
app.use(express.json());

// GET
app.get("/", (request, response) => {
  response.send(
    `<h1>Receptes API go to <a href='/api/receptes'> /api/receptes</a>  to get all Receptes</h1>`,
  );
});
app.get("/api/receptes", async (request, response, next) => {
  try {
    const receptes = await Recepte.find({});
    response.json(receptes);
  } catch (error) {
    next(error);
  }
});

app.get("/api/receptes/:id", async (request, response, next) => {
  const { id } = request.params;
  try {
    const recepte = await Recepte.findById(id);
    recepte ? response.json(recepte) : next();
    //El next fa al middleware notFound, si no ho hauriem de possar explicitament
  } catch (error) {
    next(error);
  }
});

//POST
app.post("/api/receptes", (request, response, next) => {
  const recepte = request.body;
  const newRecepte = new Recepte({
    titol: recepte.titol,
    racions: recepte.racions,
    dataPublicacio: new Date(),
    esVegetaria: recepte.esVegetaria ?? false,
    ingredients: recepte.ingredients,
    passos: recepte.passos,
    tempsCoccioMinuts: recepte.tempsCoccioMinuts,
  });
  newRecepte
    .save()
    .then((savedRecepte) => {
      response.status(201).json(savedRecepte);
    })
    .catch((err) => next(err));
});


//PUT

app.put("/api/receptes/:id", (request, response, next) => {
  const { id } = request.params;
  const recepte = request.body;
  const newRecepteInfo = {
    titol: recepte.titol,
    racions: recepte.racions,
    esVegetaria: recepte.esVegetaria,
    ingredients: recepte.ingredients,
    passos: recepte.passos,
    tempsCoccioMinuts: recepte.tempsCoccioMinuts,
  };
  Recepte.findByIdAndUpdate(id, newRecepteInfo, { returnDocument: "after" })
    .then((result) => {
      result ? response.json(result) : next();
    })
    .catch((error) => next(error));
});
// DELETE
app.delete("/api/receptes/:id", (request, response, next) => {
  const { id } = request.params;
  Recepte.findByIdAndDelete(id)
    .then((result) => {
      result ? response.status(204).end() : next();
    })
    .catch((error) => next(error));
});
// Middleware: not found
app.use(notFound);

//Middleware: Gestió d'errors id amb format incorrecte o error de servidor
app.use(handleErrors);
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
