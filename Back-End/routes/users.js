var express = require('express');
var router = express.Router();
const sql = require('mssql');
const config = {
  user: 'labarbera.luca',  //Vostro user name
  password: 'xxx123#', //Vostra password
  server: "213.140.22.237",  //Stringa di connessione
  database: 'labarbera.luca', //(Nome del DB)
}

/* GET users listing. */
let executeQuery = function (res, query, next) {
  sql.connect(config, function (err) {
    if (err) { //Display error page
      console.log("Error while connecting database :- " + err);
      res.status(500).json({success: false, message:'Error while connecting database', error:err});
      return;
    }
    var request = new sql.Request(); // create Request object
    request.query(query, function (err, result) { //Display error page
      if (err) {
        console.log("Error while querying database :- " + err);
        res.status(500).json({success: false, message:'Error while querying database', error:err});
        sql.close();
        return;
      }
      res.send(result.recordset); //Il vettore con i dati è nel campo recordset (puoi loggare result per verificare)
      sql.close();
    });

  });
}

/* GET users listing. */
router.get('/', function (req, res, next) {
  let sqlQuery = "select * from dbo.T_Utente";
  executeQuery(res, sqlQuery, next);
});

/*router.get('/search/:name', function (req, res, next) {
  let sqlQuery = `select * from dbo.T_Utente TU inner join T_Noleggio TN on TU.IdUtente = TN.IdUtente  where TU.IdUtente = '${req.params.name}'`;
  executeQuery(res, sqlQuery, next);
});*/

router.get('/search/:name', function (req, res, next) {
  let sqlQuery = `select * from dbo.T_Utente TU  where TU.IdUtente = '${req.params.name}'`;
  executeQuery(res, sqlQuery, next);
});


module.exports = router;