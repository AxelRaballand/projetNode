const express = require("express");
const router = express.Router();

const BeerController = require("../../controller/beerController");
const beerController = new BeerController();
//ici on cherche les vières

/**
 * on affiche toutes les bières
 */
router.get("/", function(req, res) {
  beerController.findAll(res);
});

/**
 * bière par id
 */
router.get("/:id", function(req, res) {
  beerController.findById(req, res);
});

/**
 * les bières qui ont un degré supérieures à :deg
 */
router.get("/deg/:deg", function(req, res) {
  beerController.findByAlcoholOverDeg(req, res);
});

/**
 * une bière par son nom
 */
router.get("/name/:name", function(req, res) {
  beerController.findByName(req, res);
});

module.exports = router;
