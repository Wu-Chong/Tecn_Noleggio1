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


router.get('/search/:name', function (req, res, next) {
  let sqlQuery = `select TU.IdUtente, TU.nome, TU.cognome, TU.email, TU.citta, TN.IdUtente as idUtente, TN.IdBici, TN.Datarilascio from T_Utente TU left join  T_Noleggio TN on TN.IdUtente = TU.IdUtente where TU.IdUtente = '${req.params.name}'`;
  executeQuery(res, sqlQuery, next);
});
 
router.post('/', function (req, res, next) {
  let prenotazione = req.body;
  if (!prenotazione) {  //Qui dovremmo testare tutti i campi della richiesta
    res.status(500).json({success: false, message:'Error while connecting database', error:err});
    return;
  }
  let sqlInsert = `INSERT INTO T_Noleggio (IdUtente, IdBici, Dataprelievo, Oraprelievo, latitudineprelievo, longitudineprelievo) 
                     VALUES (${prenotazione.id},${prenotazione.idBici},'${prenotazione.dataInizio}', '${prenotazione.oraInizio}', '${prenotazione.lat}', '${prenotazione.lng}')`;
  executeQuery(res, sqlInsert, next);
  res.send({success:true, message: "Prenotazione con successo", prenotazione: prenotazione})
});


router.post('/:id', function (req, res, next) { 
  let rilascio = req.body;
  if (!rilascio) {  //Qui dovremmo testare tutti i campi della richiesta
    res.status(500).json({success: false, message:'Error while connecting database', error:err});
    return; 
  }
  let sqlUpdate = `Update T_Noleggio set Datarilascio = '${rilascio.dataFine}', Orarilascio = '${rilascio.oraFine}', longitudinerilascio = '${rilascio.lng}', latitudinerilascio = '${rilascio.lat}' where IdUtente = ${rilascio.id} and IdBici = ${rilascio.idBici} and Dataprelievo ='${rilascio.dataInizio}' and Oraprelievo = '${rilascio.oraInizio}'`;
  executeQuery(res, sqlUpdate, next);
  res.send({success:true, message: "Rilascio con successo", rilascio: rilascio}) 
});
//
module.exports = router;