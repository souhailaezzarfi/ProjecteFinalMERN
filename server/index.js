require("dotenv").config();
require("./mongo");

const express = require("express");
const app = express();
const cors = require("cors");

const Recepta = require("./models/Recepta");
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
    const receptes = await Recepta.find({});
    response.json(receptes);
  } catch (error) {
    next(error);
  }
});

app.get("/api/receptes/:id", async (request, response, next) => {
  const { id } = request.params;
  try {
    const recepta = await Recepta.findById(id);
    recepta ? response.json(recepta) : next();
    //El next fa al middleware notFound, si no ho hauriem de possar explicitament
  } catch (error) {
    next(error);
  }
});

//POST
app.post("/api/receptes", (request, response, next) => {
  const recepta = request.body;
  const newRecepta = new Recepta({
    titol: recepta.titol,
    racions: recepta.racions,
    dataPublicacio: new Date(),
    esVegetaria: recepta.esVegetaria ?? false,
    ingredients: recepta.ingredients,
    passos: recepta.passos,
    tempsCoccioMinuts: recepta.tempsCoccioMinuts,
  });
  newRecepta
    .save()
    .then((savedRecepta) => {
      response.status(201).json(savedRecepta);
    })
    .catch((err) => next(err));
});

//PUT

app.put("/api/receptes/:id", (request, response, next) => {
  const { id } = request.params;
  const recepta = request.body;
  const newReceptaInfo = {
    titol: recepta.titol,
    racions: recepta.racions,
    esVegetaria: recepta.esVegetaria,
    ingredients: recepta.ingredients,
    passos: recepta.passos,
    tempsCoccioMinuts: recepta.tempsCoccioMinuts,
  };
  Recepta.findByIdAndUpdate(id, newReceptaInfo, { returnDocument: "after" })
    .then((result) => {
      result ? response.json(result) : next();
    })
    .catch((error) => next(error));
});
// DELETE
app.delete("/api/receptes/:id", (request, response, next) => {
  const { id } = request.params;
  Recepta.findByIdAndDelete(id)
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
