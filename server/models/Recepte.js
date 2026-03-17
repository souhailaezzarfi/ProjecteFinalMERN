const { Schema, model } = require("mongoose");

const recepteSchema = new Schema({
  titol: {
    type: String,
    required: true,
    minlength: 3,
    //(String) — nom de la recepta, amb minlength: 3 per evitar entrades buides o massa curtes
  },
  racions: {
    type: Number,
    required: true,
    min: 1,
    //(Number) — nombre de persones, amb min: 1 perquè no té sentit una recepta per a 0 persones
  },
  dataPublicacio: {
    type: Date,
    default: Date.now,
    required: true,
    //(Date) — data generada automàticament en crear la recepta, no la introdueix l'usuari
  },
  esVegetaria: {
    type: Boolean,
    default: false,
    //(Boolean) — permet identificar i filtrar receptes vegetarianes, per defecte false
  },
  ingredients: {
    type: [String],
    required: true,
    //(Array de Strings) — és un array perquè una recepta té múltiples ingredients
  },
  passos: {
    type: [String],
    required: true,
    //(Array de Strings) — és un array perquè una recepta té múltiples passos de preparació ordenats
  },
  tempsCoccioMinuts: {
    type: Number,
    required: true,
    min: 0,
    //(Number) — temps en minuts, amb min: 0 perquè no pot ser negatiu
  },
});

const Recepte = model("Recepte", recepteSchema);
module.exports = Recepte;
