const express = require('express');

const { validateUserId, validatePost, validateUser } = require('../middleware');
const Users = require('../../users/userDb');
const Posts = require('../../posts/postDb');

const router = express.Router();

router.use('/:id', validateUserId);

router.post('/', validateUser, (req, res) => {
    let { user } = req;
    Users.insert(user)
        .then(user => {
            res.status(201).json(user);
        })
        .catch(() => {
            res.status(500).json({ message: 'Internal server error.' });
        });
});



router.post('/:id/posts', (req, res, next) => validatePost(req, res, next, 'test'), (req, res) => {
    let { newPost } = req;
    let { id } = req.params;
    newPost.user_id = id;
    Posts.insert(newPost)
        .then(post => {
            res.status(201).json(post)
        })
        .catch(() => {
            res.status(500).json({ message: 'Internal server error.' });
        });
});

/**
 * @api {get} users Request all users
 * @apiName GetUsers
 * @apiGroup Users
 * 
 * @apiParam None
 * @apiSuccess {Array} users Array of users
 * 
 * @apiSuccessExample Success-Response:
 *      HTTP 200 Ok
 *      [{
 *          "id": 1,
 *          "name": "Frodo Baggins"
 *      }]
 * 
 * @apiError Internal Server Error
 */
router.get('/', (req, res) => {
    Users.get()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(() => {
            res.status(500).json({ message: 'Internal server error.' });
        });
});

router.get('/:id', (req, res) => {
    let { user } = req;
    res.status(200).json(user);
});

router.get('/:id/posts', (req, res) => {
    let { user } = req;
    Users.getUserPosts(user.id)
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(() => {
            res.status(500).json({ message: 'Internal server error.' });
        });
});

router.delete('/:id', (req, res) => {
    let { user } = req;
    Users.remove(user.id)
        .then(() => {
            res.status(200).json(user);
        })
        .catch(() => {
            res.status(500).json({ message: 'Internal server error.' });
        });
});

router.put('/:id', validateUser, (req, res) => {
    let newUser = req.user;
    let { id } = req.params;
    Users.update(id, newUser)
        .then(() => {
            res.status(200).json(newUser)
        })
        .catch(() => {
            res.status(500).json({ message: 'Internal server error.' });
        });
});

module.exports = router;
