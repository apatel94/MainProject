var mongoose = require('mongoose'),
	dbname = "RealEstate";

var Product = mongoose.model("Property", {
		
    Address: String,
    AgentAddress: String,
    AgentContact: String,
    AgentDetails: String,
    AgentMail: String,
    AgentName: String,
    Amenities: String,
    AdditionalDetails: Object,
    Area: String,
    Availability: String,
    Balcony: String,
    Bath: String,
    Bed: String,
    Builtin: String,
    CarGarages: String,
    City: String,
    Description: String,
    Facing: String,
    Gated: String,
    Id: String,
    Kitchen: String,
    Parking: String,
    posted: String,
    Price: String,
    Propimages: String,
    State: String,
    Summary: String,
    Status: String,
    Type: String,
    Password : String

});

mongoose.connect("mongodb://localhost/" + dbname);


var db = mongoose.connection;
db.on("error", console.error);
db.once("open", deleteProducts);

function deleteProducts(){
	/*Product.remove({}, function(err){
		if(err) console.log(err);
		insertProducts();
	});*/
	insertProducts();
}
function insertProducts(){

	/*Product.create(
		{
			name: "Old Rasputin1",
			price: 40,
			category: "Russian Imperial Stout",
			image: "old_rasputin.jpg",
			brewery: "North Coast Brewing",
			alcohol: 9
		},
		{
			name: "Old Rasputin2",
			price: 40,
			category: "Russian Imperial Stout",
			image: "old_rasputin.jpg",
			brewery: "North Coast Brewing",
			alcohol: 9
		},
		{
			name: "Old Rasputin3",
			price: 40,
			category: "Russian Imperial Stout",
			image: "old_rasputin.jpg",
			brewery: "North Coast Brewing",
			alcohol: 9
		}

	);*/

	var products = new Product({
	    Address	:	 "1235 Robert Boursa",
	    AgentAddress	:	 "9089 your adress her",
	    AgentContact	:	 "+1 (514) 123 5678",
	    AgentDetails	:	 "About Suresh Constructions Pvt. Ltd.Suresh constructions pvt. Ltd. Offer residential apartment(S) on sale in and around Canada.",
	    AgentMail	:	 "Beela@sureshRealtors.com",
	    AgentName	:	 "Beela",
	    Amenities	:	 [ "WaterFrontView", "Fire Place", "Jog Path", "Swimming pool", "BikePath", "childrenpark" ],
	    AdditionalDetails: {"waterfront": "yes",
      "view": "Intracoastal View,Direct ew",
    "Parking": "2 Or More Spaces,Covered Parking,Valet Parking",
    "BuiltIn": "2017",
    "Location": "Montreal-North"
},
	        Area	:	 "288sqft",
	    Availability	:	 "Ready to Move",
	    Balcony	:	 "2",
    Bath	:	 "2",
    Bed	:	 "2",
    Builtin	:	 "2017",
    CarGarages 	:	  "2",
    City	:	 "Montreal",
    Description	:	 "This is a premium joint venture development of Beela's construction, a luxurious and prestigious project",
    Facing	:	 "North-East",
    Gated	:	 "yes",
    Id	:	 "1",
    Kitchen	:	 "1",
    Parking	:	 "yes",
    posted	:	 "1/21/2018",
    Price	:	 "600000$",
    Propimages	:	 "prop1.jpg",
    State	:	 "QC",
    Summary	:	 "Independent House sale in Montreal",
    Status	:	"Sale",
    Type: "Apartment",
    Password :"Suresh"


	});	

	products.save(function(err){
		if(err) console.log(err);
	});

}