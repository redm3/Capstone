const axios = require('axios');
let Models = require("../models"); //matches index.js
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

/* const getUsers = (res) => {
        axios.get('https://fakestoreapi.com/users')
            .then(response => {
                // save the retrieved user data to your database
                Models.User.insertMany(response.data)
                    .then(() => {
                        // retrieve the saved user data from your database
                        Models.User.find({})
                            .then(data => res.send({ result: 200, data: data }))
                            .catch(err => {
                                console.log(err);
                                res.send({ result: 500, error: err.message })
                            });
                    })
                    .catch(err => {
                        console.log(err);
                        res.send({ result: 500, error: err.message })
                    });
            })
            .catch(err => {
                console.log(err);
                res.send({ result: 500, error: err.message })
            });
    }; */

    const loginUser = async (req, res) => {
        try {
            // Get user input from request body
            const { email, password } = req.body;
    
            // Validate user input
            if (!(email && password)) {
                res.status(400).json({ result: "All input is required" });
            }
            // Validate if user exists in our database
            const user = await Models.User.findOne({ where: { emailId: email }});
    
            if (user && (await bcrypt.compare(password, user.password))) {
                // Create token
                const token = jwt.sign(
                    { user_id: user.id, email },
                    process.env.JWT_KEY,
                    {
                        expiresIn: "2h",
                    }
                );
    
                // send back logged in user details
                res.status(200).json({ result: 'User successfully logged in', data: user, token: token });
            }
            else res.status(400).json({ result: "Invalid user credentials" });
        } catch (err) {
            console.log(err);
            res.status(500).json({ result: err.message })
        }
    }

    const registerUser = async (req, res) => {

        try {
            // Get user input by destructuring request body
            const { firstName, lastName, emailId, password } = req.body;
    
            // Validate user input
            if (!(emailId && password && firstName && lastName)) {
                res.status(400).json("All input is required");
            }
    
            // Validate if user exists in our database
            const oldUser = await Models.User.findOne({ where: { emailId }});
    
            if (oldUser) {
                res.status(409).json({ result: "User already exists. Please login" });
            }
    
            //Encrypt user password
            let encryptedPassword = await bcrypt.hash(password, 10);
    
            // Create user in our database
            const user = await Models.User.create({
                firstName,
                lastName,
                emailId: emailId.toLowerCase(), // sanitize: convert email to lowercase
                password: encryptedPassword,
            });
    
            // Create token
            const token = jwt.sign(
                { user_id: user.id, emailId },
                process.env.JWT_KEY,
                {
                    expiresIn: "2h",
                }
            );
            // save user token
            user.token = token;
    
            // return new user
            res.status(201).json({ result: "User successfully registered", data: user });
        } catch (err) {
            console.log(err);
            res.status(500).json({ result: err.message })
        }
    }

    const getUsers = () => {
        Models.User.deleteMany({})
          .then(() => {
            axios.get('https://fakestoreapi.com/users')
              .then(response => {
                // Save the retrieved user data to your database
                Models.User.insertMany(response.data)
                  .then(() => {
                    // Retrieve the saved user data from your database
                    Models.User.find({})
                      .then(data => console.log({ result: 200, data: data }))
                      .catch(err => {
                        console.log(err);
                      });
                  })
                  .catch(err => {
                    console.log(err);
                  });
              })
              .catch(err => {
                console.log(err);
              })
          })
      };

const getUserById = (req, res) => {
    /* axios.get('https://fakestoreapi.com/users/'+req.params.id) */
    Models.User.findOne({ id: req.params.id })
        .then(data => {
            if (!data) {
                res.send({ result: 404, error: "User not found" })
            } else {
                res.send({ result: 200, data: data })
            }
        })
        .catch(err => {
            console.log(err);
            res.send({ result: 500, error: err.message })
        });
};

const createUser = (data, res) => {
    //creates a new user using JSON data POSTed in request body
    console.log(data)
    new Models.User(data).save()
        .then(data => res.send({ result: 200, data: data }))
        .catch(err => {
            console.log(err);
            res.send({ result: 500, error: err.message })
        })
}

const updateUser = (req, res) => {
    //updates the user matching the ID from the param using JSON data POSTed in request body
    console.log(req.body)
    /* Models.User.findOne({ id: req.params.id }) */
    Models.User.findOneAndUpdate({ id: req.params.id }, req.body )
        .then(data => res.send({ result: 200, data: data }))
        .catch(err => {
            console.log(err);
            res.send({ result: 500, error: err.message })
        })
}

const deleteUser = (req, res) => {
    //deletes the user matching the ID from the param
    console.log()
    Models.User.findOneAndDelete({ id: req.params.id }, req.body )
        .then(data => res.send({ result: 200, data: data }))
        .catch(err => {
            console.log(err);
            res.send({ result: 500, error: err.message })
        })
}

module.exports = {
    loginUser,registerUser, getUsers, getUserById, createUser, updateUser, deleteUser
}