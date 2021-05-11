const express = require("express");
const app = express(); // donne accès à la librairie express
const connection = require("./db-config");

const port = process.env.PORT || 8000;

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
