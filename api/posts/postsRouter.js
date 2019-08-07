const express = require('express');

const { validatePostId, validatePost } = require('../middleware');
const Posts = require('../../posts/postDb');

const router = express.Router();
router.use('/:id', validatePostId);

router.get('/', (req, res) => {
    Posts.get()
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(() => {
            res.status(500).json({ message: 'Internal server error.' });
        });
});

router.get('/:id', (req, res) => {
    let { post } = req;
    res.status(200).json(post);
});

router.delete('/:id', (req, res) => {
    let { post } = req;
    Posts.remove(post.id)
        .then(() => {
            res.status(200).json(post);
        })
        .catch(() => {
            res.status(500).json({ message: 'Internal server error.' });
        });
});

router.put('/:id', validatePost, (req, res) => {
    let { newPost } = req;
    let { id } = req.params;
    Posts.update(id, newPost)
        .then(() => {
            res.status(200).json(newPost);
        })
        .catch(() => {
            res.status(500).json({ message: 'Internal server error.' });
        });
});

module.exports = router;
