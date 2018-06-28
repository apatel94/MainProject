//Step 1:

//go here https://myaccount.google.com/lesssecureapps and enable for less secure apps. If this does not work then

//Step 2

//go here https://accounts.google.com/DisplayUnlockCaptcha and enable/continue and then try.

var Products = require('../../models/products');
var logins = require('../../models/loginModel');
// injecting node mailer and mailer smtp transport.
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

// Wrap all the methods in an object

var transporter = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
        user: 'montrealcollege18@gmail.com',
        pass: 'montreal123'
    }
}));

var product = {

    read: function (req, res, next) {
        //console.log('Read'+req.params.fname);
        //var obj = res.json({ type: "Read", fname: req.params.fname });
        //console.log(obj.data);
        console.log(req.params.email + ' ' + req.params.password);
        Products.find({ email: req.params.email, password: req.params.password }, function (err, data) {
            if (err) {
                res.status(500).send({ message: "Could not retrieve note with id " + req.params.fname });
            } else {
                console.log(data)
                res.send(data);
            }
        });
        console.log("read hit");
        //Products.find({ email: "beelasuresh8@gmail.com", password : "temppp" }, function (err, data) {
        //    if (err) {
        //        res.status(500).send({ message: "Could not retrieve note with id " + req.params.fname });
        //    } else {
        //        console.log(data);
        //        res.send(data);
        //    }
        //});
    },
    getPassword: function (req, res, next) {
        //console.log('Read'+req.params.fname);
        //var obj = res.json({ type: "Read", fname: req.params.fname });
        //console.log(obj.data);
        console.log(req.params.password);
        Products.find({ email: req.params.email }, function (err, data) {
            if (err) {
                res.status(500).send({ message: "Could not retrieve note with id " + req.params.fname });
            } else {
                console.log(data)
                res.send(data);
            }
        });
        console.log("getPassword hit");
        //Products.find({ email: "beelasuresh8@gmail.com", password : "temppp" }, function (err, data) {
        //    if (err) {
        //        res.status(500).send({ message: "Could not retrieve note with id " + req.params.fname });
        //    } else {
        //        console.log(data);
        //        res.send(data);
        //    }
        //});
    },
    //create: function (req, res, next) {
    //    console.log('Create');
    //res.send(req.body);
    //},
    create: function (req, res, next) {

        console.log("Create hit");
        var product = new Products({
            Address: req.body.Address,
            AgentAddress: req.body.AgentAddress,
            AgentContact: req.body.AgentContact,
            AgentDetails: req.body.AgentDetails,
            AgentMail: req.body.AgentMail,
            AgentName: req.body.AgentName,
            Amenities: req.body.Amenities,
            AdditionalDetails: req.body.AdditionalDetails,
            Area: req.body.Area,
            Availability: req.body.Availability,
            Balcony: req.body.Balcony,
            Bath: req.body.Bath,
            Bed: req.body.Bed,
            Builtin: req.body.Builtin,
            CarGarages: req.body.CarGarages,
            City: req.body.City,
            Description: req.body.Description,
            Facing: req.body.Facing,
            Gated: req.body.Gated,
            Id: req.body.Id,
            Kitchen: req.body.Kitchen,
            Parking: req.body.Parking,
            posted: req.body.posted,
            Price: req.body.Price,
            Propimages: req.body.Propimages,
            State: req.body.State,
            Summary: req.body.Summary,
            Status: req.body.Status,
            Type: req.body.Type,
            Password: req.body.Password

        });

        product.save(function (err, data) {
            console.log(data);
            if (err) {
                console.log(err);
                res.status(500).send({ message: "Some error ocuured while creating the Note." });
            } else {
                res.send(data);
                console.log(data);
            }
        });
    },
    update: function (req, res) {
        // Update a note identified by the noteId in the request
        Products.findOne({ fname: "Beela" }, function (err, note) {
            if (err) {
                res.status(500).send({ message: "Could not find a note with id " + req.params.fname });
            }

            /* note.title = req.body.title;
             note.content = req.body.content;*/
            note.password = "temppp";
            //console.log(note[0]);
            //Object.assign(note[0].password, "temppp");
            note.save(function (err, data) {
                if (err) {
                    res.status(500).send({ message: "Could not update note with id " + req.params.fname });
                } else {
                    res.send(data);
                }
            });
        });
    },

    delete: function (req, res) {
        // Delete a note with the specified noteId in the request
        Products.remove({ lname: req.params.fname }, function (err, data) {
            if (err) {
                res.status(500).send({ message: "Could not delete note with id " + req.params.id });
            } else {
                res.send({ message: "Note deleted successfully!" })
            }
        });
        //Products.save();
    },
    getAll: function (req, res) {
       // console.log("get ALL initited");
        Products.find(function (err, data) {
            if (err) {
                res.status(500).send({ message: "Some error ocuured while retrieving notes." });
            } else {
               // console.log(data);
                res.json(data);
            }
            //console.log("getAll" + res.json(data));
            //if(err) console.error;
            //res.json(data);
        })
    },
    getLocations: function (req, res) {
        console.log("get Location initited" + req.params.location);
        // query to get the locations based on start with letter.
        var query = { City: { $regex: '^' + req.params.location, $options: "i" } };
        Products.find(query, function (err, data) {
            if (err) {
                res.status(500).send({ message: "Some error ocuured while retrieving notes." });
            } else {
                console.log(data);
                res.json(data);
            }

        })
    },
    // get property by location.
    getPropertiesByLocation: function (req, res) {
        console.log("get Property by location initited" + req.params.location);

        var query = { City: req.params.location, Type: req.params.type };
        Products.find(query, function (err, data) {
            if (err) {
                res.status(500).send({ message: "Some error ocuured while retrieving notes." });
            } else {
                console.log(data);
                res.json(data);
            }

        })
    },
    getPropertyById: function (req, res) {
        console.log("get Property by Id initited" + req.params.id);

        var query = { _id: req.params.id };
        Products.find(query, function (err, data) {
            if (err) {
                res.status(500).send({ message: "Some error ocuured while retrieving notes." });
            } else {
                console.log(data);
                res.json(data);
            }

        })
    },

    sendEmail: function (req, res) {
        var query = { _id: req.body.id };
        var to = req.body.mail;
        var propDesc = {};
        console.log("To mail : " + to);
        Products.find(query, function (err, data) {
            if (err) {
                res.status(500).send({ message: "Some error ocuured while retrieving notes." });
            } else {
                //console.log(data);
                propDesc.des = data[0].Description;
                console.log(data[0].Description);

                var mailOptions = {
                    from: 'beelasuresh8@gmail.com',
                    to: to,
                    subject: propDesc.des,
                    text: propDesc.des,
                    html: '<b>Hello, <strong>' + to + '</strong>,<br/>' + propDesc.des + '</b></p>'
                };

                transporter.sendMail(mailOptions, function (error, info) {
                    console.log("Subject-" + mailOptions.subject);
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });

                res.json(data);
            }

        })

    },

    getPropertiesByTypeLocationStaus: function (req, res) {
        console.log("get PropertiesByTypeLocationStaus initited");
        // query to get the locations based on start with letter.
        if (req.params.status == 'All') {
            var query = { City: req.params.location, Type: req.params.type };
        } else {
            var query = { City: req.params.location, Type: req.params.type, Status: req.params.status };
        }
        Products.find(query, function (err, data) {
            if (err) {
                res.status(500).send({ message: "Some error ocuured while retrieving notes." });
            } else {
                console.log(data);
                res.json(data);
            }

        })
    },
    registerUser: function (req, res) {
        //console.log("Register User hit");
        var login = new logins({
            Name: req.body.Name,
            Mail: req.body.Mail,
            Password: req.body.Password,
            Properties: req.body.Properties,
            Favourites: req.body.Favourites,
            Contact: req.body.Contact
        })
        login.save(function (err, data) {
            //console.log(data);
            if (err) {
                console.log(err);
                res.status(500).send({ message: "Some error ocuured while creating the user." });
            } else {
                res.send(data);
                console.log(data);
            }
        });
    },
    logIn: function (req, res) {
        console.log("Log in User hit");
       
          var query = { Mail: req.params.mail, Password: req.params.pwd};
          console.log(query);
        logins.find(query, function (err, data) {
            if (err) {
                res.status(500).send({ message: "Some error ocuured while retrieving notes." });
            } else {
                console.log(data);
                res.json(data);
            }
        })
    }

}
module.exports = product;


