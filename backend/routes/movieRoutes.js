const express = require("express");
const router = express.Router();
const { getAllMovies, playMovie } = require("../controllers/movieControllers");

router.get("/", async (req, res, next) => {
  try {
    await getAllMovies(req, res);
  } catch (err) {
    console.error("Unexpected error in GET /movies:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.post("/play/:movieId", async (req, res, next) => {
  try {
    await playMovie(req, res);
  } catch (err) {
    console.error(
      `Unexpected error in POST /play/${req.params.movieId}:`,
      err.message
    );
    res.status(500).json({ message: "Server error", error: err.message });
  }
});
module.exports = router;
