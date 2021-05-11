# mars_vs_wild_back

## Install dependancies
```npm install```

## How to install mars_vs_wild DB ?
use this command in mysql : 
```mysql > source Databases.sql;```

## How to parameter connection to DB ?
create a ```.env```file

into the file, copy and complete :

```DB_HOST=localhost
DB_PORT=3306
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=mars_vs_wild
```
## Launch app

```npm start```

## API documentation

- Route pour GET/POST/DELETE un game ```/api/games```
- Route pour GET les détails d'un game ```/api/games/:id```
- Route pour GET/POST/DELETE un player ```/api/players```
- Route pour GET tous les players d'un game ```/api/players/:id```




