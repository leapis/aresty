var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
const {exec}   = require('child_process');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('linked');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'true' });
});


//api for viewing
router.route('/view')

    // create a bear (accessed at POST http://localhost:8080/api/bears)
   .post(function(req, res) {
       console.log("general viewing information");
       res.json({ message: 'No info yet!'  });
    });


router.route('/view/:passenger_id')

    // get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
    .get(getView)
    .post(getView);

function getView(req, res){
    if(req.params.passenger_id){
        console.log("id given");
        //res.json({message:"we can search at "+req.params.passenger_id});
        exec('./algo/test '+req.params.passenger_id, (err,stdout,stderr) => {
            console.log(stdout + " : " + req.params.passenger_id);
            res.json({message:'we can search at '+stdout});
        });
    }
    else{
        console.log(req.params.passenger_id)
        res.json({message:"no dice"});
    }
}


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Server started on port ' + port);
