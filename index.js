const express = require("express");
const app = express(); // donne accès à la librairie express
const connection = require("./db-config");

const port = process.env.PORT || 8001;

app.use(express.json());

connection.connect((err) => {
  if (err) {
    console.error("error connecting: " + err.stack);
  } else {
    console.log(
      "connected to database with threadId :  " + connection.threadId
    );
  }
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`); // écoute les connexions entrantes
});

//Route GET pour afficher tous les games

app.get("/api/games", (req, res) => {
  connection.query("SELECT * FROM games", (err, results) => {
    if (err) {
      res.status(500).send("Error retrieving games data");
    } else {
      res.status(200).json(results);
    }
  });
});

//Route GET pour afficher le détail d'un game

app.get("/api/games/:id", (req, res) => {
  connection.query(
    "SELECT * FROM games WHERE idgames = ?",
    [req.params.id],
    (err, results) => {
      if (err) {
        res.status(500).send("Error retrieving game data");
      } else {
        res.status(200).json(results);
      }
    }
  );
});

//Route POST pour ajouter un nouveau game

app.post("/api/games", (req, res) => {
  const { title, place, image, description } = req.body;
  connection.query(
    "INSERT INTO games (title, place, image, description) VALUES (?, ?, ?, ?)",
    [title, place, image, description],
    (err, result) => {
      if (err) {
        res.status(500).send("Error adding new game");
      } else {
        res.status(201).send("Game correctly added");
      }
    }
  );
});

//Route DELETE pour supprimer un game

app.delete("/api/games/:id", (req, res) => {
  const gamesId = req.params.id;
  connection.query(
    "DELETE FROM games WHERE idgames = ?",
    [gamesId],
    (err, result) => {
      err
        ? res.status(500).send("Error deleting a game")
        : res.status(200).send("Game successfully deleted ! ");
    }
  );
});

//Route POST pour ajouter un nouveau player

app.post("/api/players", (req, res) => {
  const {
    name,
    species,
    planet,
    photo,
    player_description,
    team,
    games_idgames,
  } = req.body;
  connection.query(
    "INSERT INTO players (name, species, planet, photo, player_description, team, games_idgames) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [name, species, planet, photo, player_description, team, games_idgames],
    (err, result) => {
      if (err) {
        res.status(500).send("Error registering player");
      } else {
        res.status(201).send("Player correctly registered");
      }
    }
  );
});

//Route GET pour afficher tous les players

app.get("/api/players", (req, res) => {
  connection.query("SELECT * FROM players", (err, results) => {
    if (err) {
      res.status(500).send("Error retrieving player data");
    } else {
      res.status(200).json(results);
    }
  });
});

//Route GET pour afficher tous les players d'un game

app.get("/api/players/:id", (req, res) => {
  connection.query(
    "SELECT * FROM players WHERE players.games_idgames = ?",
    [req.params.id],
    (err, results) => {
      if (err) {
        res.status(500).send("Error retrieving player data");
      } else {
        res.status(200).json(results);
      }
    }
  );
});
