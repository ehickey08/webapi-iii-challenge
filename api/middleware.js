//custom middleware
const Users = require('../users/userDb');
const Posts = require('../posts/postDb');

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
    if (Number.isInteger(+id)) {
        Users.getById(id)
            .then(user => {
                if (user && user.id) {
                    req.user = user;
                    next();
                } else {
                    res.status(404).json({
                        message:
                            'The user with the specified ID does not exist.',
                    });
                }
            })
            .catch(err => {
                res.status(500).json({
                    message: 'Internal server error. ',
                });
            });
    } else {
        res.status(404).json({
            message: 'The user_id param should be an integer.',
        });
    }
}

function validatePostId(req, res, next) {
    let { id } = req.params;
    if (Number.isInteger(+id)) {
        Posts.getById(id)
            .then(post => {
                if (post && post.id) {
                    req.post = post;
                    next();
                } else {
                    res.status(404).json({
                        message:
                            'The post with the specified ID does not exist.',
                    });
                }
            })
            .catch(err => {
                res.status(500).json({
                    message: 'Internal server error. ',
                });
            });
    } else {
        res.status(404).json({
            message: 'The post_id param should be an integer.',
        });
    }
}
function validateUser(req, res, next) {
    let newUser = req.body;
    if (!newUser)
        return res.status(400).json({ message: 'Missing user data.' });
    if (!newUser.name)
        return res.status(400).json({ message: 'Missing required name field' });
    req.user = newUser;
    next();
}

function validatePost(req, res, next) {
    let newPost = req.body;
    if (!newPost)
        return res.status(400).json({ message: 'Missing post data.' });
    if (!newPost.text)
        return res.status(400).json({ message: 'Missing required text field' });
    req.newPost = newPost;
    next();
}

module.exports = { logger, validateUserId, validatePostId, validateUser, validatePost };
