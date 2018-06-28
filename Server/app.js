// Initialize the express framework
var express 	 	= require('express'),
	path 			= require('path'),
	mongoose		= require('mongoose'),
	bodyParser		= require('body-parser')
	//databaseName = 'angular_mongodb';

// Express setup 
var app = express();
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, '../client')));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
// Routes set up
var router 	= express.Router();
var product = require('./controllers/api/product');

// Get all listings available to buy.
router.get('/api/buy', product.getAll);
router.get('/api/rent', product.getAll);

router.get('/api/product/:email/:password', product.read);
router.get('/api/product/:email', product.getPassword);
router.delete('/api/product', product.delete);
//router.get('/api/product', product.read);
// Create a product
router.post('/api/product', product.create);
router.put('/api/product/:fname', product.update);
// Get one product, update one product, delete one product
router.route('/api/product/:fname')
	.get(product.read)
	.put(product.update)
	.delete(product.delete);
router.get('/api/getLocations/:location', product.getLocations);
// end point to retrieve the properties based on location.
router.get('/api/getPropertiesByLocation/:location/:type', product.getPropertiesByLocation);
//get details by Id
router.get('/api/getPropertyById/:id', product.getPropertyById);

// send email
router.post('/api/sendEmail', product.sendEmail);

// get property by location and type and rent.

router.get('/api/getPropertiesByLocation/:location/:type/:status', product.getPropertiesByTypeLocationStaus);

// post user details to the login table

router.post('/api/registerUser', product.registerUser);

// get the log in details

router.get('/api/logIn/:mail/:pwd', product.logIn);
// Register the routing
app.use('/', router);

mongoose.connect('mongodb://localhost:27017/RealEstate');

var db = mongoose.connection;
db.on('error', console.error);
db.once('open', startServer);


// Start up the server
function startServer(){
	var server = app.listen(3000, function(){
		var port = server.address().port;
		console.log('Listening on port ' + port);
		console.log('Connection succeded');
		console.log(db.collection("login").findAll);
		//collection.find({}).project({ a: 1 })
	})
}

