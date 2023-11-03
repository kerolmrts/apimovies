const filesystem = require("fs").promises;
const path = require("path");

const movieFilePath = path.join(__dirname, "../data/movies.json");

const getMovies = () => {
  return filesystem
    .readFile(movieFilePath, "utf-8")
    .then((movieData) => JSON.parse(movieData))
    .catch((error) => {
      throw new Error("Impossível ler o arquivo de filmes");
    });
};

const getMovieById = (movieId) => {
  return getMovies()
    .then((allMovies) =>
      allMovies.find((movie) => movie.id === parseInt(movieId))
    )
    .catch((error) => {
      throw new Error("Impossível encontrar o filme pelo ID");
    });
};

const searchMovieByName = (movieName) => {
  return getMovies()
    .then((moviesData) => {
      const filteredMovies = moviesData.filter(
        (movie) =>
          movie.title.toLowerCase().includes(movieName.toLowerCase())
      );
      return filteredMovies;
    })
    .catch((error) => {
      throw new Error("Unable to find movies by name");
    });
};

const updateMovie = (movieId, updatedData) => {
  return getMovies()
    .then((moviesData) => {
      const movieIndex = moviesData.findIndex(
        (movie) => movie.id === parseInt(movieId)
      );
      if (movieIndex !== -1) {
        const existingMovie = moviesData[movieIndex];
        if (updatedData.title !== undefined) {
          existingMovie.title = updatedData.title;
        }
        if (updatedData.description !== undefined) {
          existingMovie.description = updatedData.description;
        }
        if (updatedData.category !== undefined) {
          existingMovie.category = updatedData.category;
        }
        if (updatedData.rating && updatedData.rating.rate !== undefined) {
          existingMovie.rating.rate = updatedData.rating.rate;
        }
        if (updatedData.rating && updatedData.rating.count !== undefined) {
          if (existingMovie.rating) {
            existingMovie.rating.count++;
          } else {
            existingMovie.rating = { count: updatedData.rating.count };
          }
        }

        moviesData[movieIndex] = existingMovie;

        return filesystem
          .writeFile(movieFilePath, JSON.stringify(moviesData, null, 2), "utf-8")
          .then(() => {
            return existingMovie;
          })
          .catch((error) => {
            throw new Error("Impossível atualizar o filme");
          });
      } else {
        throw new Error("Impossível encontrar o filme");
      }
    })
    .catch((error) => {
      throw new Error("Impossível obter filme");
    });
};

const addMovies = (newMovieData) => {
  return getMovies()
    .then((moviesData) => {
      let maxMovieId = -1;
      moviesData.forEach((movie) => {
        if (movie.id > maxMovieId) {
          maxMovieId = movie.id;
        }
      });
      const newMovieId = ++maxMovieId;
      const newMovieWithId = Object.assign(
        { id: newMovieId },
        newMovieData
      );

      moviesData.push(newMovieWithId);

      return filesystem
        .writeFile(
          movieFilePath,
          JSON.stringify(moviesData, null, 2),
          "utf-8"
        )
        .then(() => {
          return newMovieWithId;
        })
        .catch((error) => {
          throw new Error("Erro ao criar o produto: " + error.message);
        });
    })
    .catch((error) => {
      throw new Error("Erro ao buscar produtos: " + error.message);
    });
};

const deleteMovies = (movieId) => {
  return getMovies()
    .then((moviesData) => {
      const movieIndex = moviesData.findIndex(
        (movie) => movie.id === parseInt(movieId)
      );

      if (movieIndex != -1) {
        const updatedMoviesData = moviesData.filter(
          (movie) => movie.id != parseInt(movieId)
        );
        const deletedMovie = moviesData[movieIndex];

        return filesystem
          .writeFile(
            movieFilePath,
            JSON.stringify(updatedMoviesData, null, 2),
            "utf-8"
          )
          .then(() => {
            return deletedMovie;
          })
          .catch((error) => {
            throw new Error("Erro ao deletar o filme: " + error.message);
          });
      } else {
        throw new Error("Produto não encontrado");
      }
    })
    .catch((error) => {
      throw new Error("Erro ao buscar filmes: " + error.message);
    });
};



module.exports={
    getMovies,
    getMovieById,
    searchMovieByName,
    updateMovie,
    addMovies,
    deleteMovies

}