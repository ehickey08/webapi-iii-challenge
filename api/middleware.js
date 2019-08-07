//custom middleware
const Users = require('../users/userDb');

function logger(req, res, next) {
    let { method, url } = req;
    let timestamp = new Date();
    console.log(
        `User made a ${method} request to ${url} on ${timestamp.getMonth() +
            1}-${timestamp.getDate()}-${timestamp.getFullYear()} at ${timestamp.getHours()}:${timestamp.getMinutes()}`
    );
    next();
}

function validateUserId(req, res, next) {
    let { id } = req.params;
    if (id) {
        Users
            .getById(id)
            .then(user => {
                //console.log('test1')
                if(user.id){
                    req.user = user
                    next();
                }
                //console.log('test2')
            })
            .catch(err => {
                res.status(404).json({
                    message: 'The user with the specified ID does not exist.',
                });
            });
    }
}

function validateUser(req, res, next) {
    let newUser = req.body
    if(!newUser)
        return res.status(400).json({message: "Missing user data."})
    if(!newUser.name)
        return res.status(400).json({message: "Missing required name field"})
    req.user = newUser
    next()
}

function validatePost(req, res, next) {
    let newPost = req.body
    if(!newPost)
        return res.status(400).json({message: "Missing user data."})
    if(!newPost.text)
        return res.status(400).json({message: "Missing required text field"})
    req.newPost = newPost
    next()
}

module.exports = { logger, validateUserId, validateUser, validatePost };
