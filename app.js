var express = require('express');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('coindata.db');
cors = require('cors')



var restapi = express()

;
var originsWhitelist = [
  'http://localhost:4200',      //this is my front-end url for development
   'http://www.myproductionurl.com'
];
var corsOptions = {
  origin: function(origin, callback){
          var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
          callback(null, isWhitelisted);
    },
  credentials:true
}
//here is the magic
restapi.use(cors(corsOptions));
//
///////////////////////

restapi.get('/coins', function(req, res) {
	console.log("Running /coins");
	db.get("select max(when_at) wt from coins", function(err,row) {
		console.log(row['wt']);
    	db.all("Select * from coins where when_at=?", [row['wt']], (err,rows) => {
	    	if (err) {
		    	throw err;
	    	}
			res.json(rows);
    	});

	}); // Get Most recent time
})

restapi.get('/data', function(req, res){
    db.get("SELECT value FROM counts", function(err, row){
            res.json({ "count" : row.value });
        });
});

restapi.post('/data', function(req, res){
    db.run("UPDATE counts SET value = value + 1 WHERE key = ?", "counter", function(err, row){
            if (err){
	                console.err(err);
	                res.status(500);
	            }
            else {
	                res.status(202);
	            }
            res.end();
        });
});


restapi.listen(3000);

console.log("Submit GET or POST to http://localhost:3000/data");


