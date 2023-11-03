const express = require("express");
const router = express.Router();
const moviesController = require("../controllers/moviesController");

router.get("/", (req, res) => {
    moviesController
    .getMovies()
    .then((moviesData) => res.json(moviesData))
    .catch((error) => res.status(500).send("Error obtaining movies"));
});

router.get("/:id", (req, res) => {
    const IdRecebido = req.params.id;
    
    moviesController
      .getMovieById(IdRecebido)  
      .then((moviesRecebido) => {
        if (moviesRecebido) {
          res.status(200).json(moviesRecebido);
        } else {
          res.status(404).send("Movie not found");
        }
      })
      .catch((error) => res.status(500).send());
  });
  
  router.get("/search/:name", (req, res) => {
    const moviesName = req.params.name;
    moviesController
      .searchMovieByName(moviesName) 
      .then((movies) => {
        if (movies) {
          res.status(200).send(movies);
        } else {
          res.status(404).send("Movies Name not found");
        }
      })
      .catch((error) => res.status(500).send());
  });
router.put("/:id", (req, res) => {
  const IdRecebido = req.params.id;
  const updatedData = req.body; 
  moviesController
    .updateMovies(IdRecebido, updatedData) 
    .then(() => {
      res.status(200).res.send("filme alterado");
    })
    .catch((error) => {
      res.send(error);
    });

  });

router.delete("/:id", (req, res) => {
  const IdRecebido = req.params.id;
  moviesController
    .deleteMovies(IdRecebido)
    .then((deletedMovies) => {
      res.status(200).json(deletedMovies);
    })

    .catch((error) => {
      res.status(404).send("filme não encontrado");
    });
});

router.post("/", (req, res) => {
  const newMoviesData = req.body; 
  moviesController
    .addMovies(newMoviesData)
    .then((movies) => {
      res.status(201).json(movies);
    })
    .catch((error) => {
      res.status(500).send("Erro ao adicionar o filme" + error.message);
    });
});

router.patch("/:id/rating", (req, res) => {
  const moviesId = req.params.id;
  const rating = req.body.rating;
  moviesController
    .updateMoviesRating(moviesId, rating)
    .then((movies) => {
      res.status(200).json(movies);
    })
    .catch((error) => {
      res.status(500).send("Error updating movies rating");
    });
});

module.exports = router;


