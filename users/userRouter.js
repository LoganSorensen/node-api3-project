const express = require("express");

const Users = require("./userDb.js");
const Posts = require("../posts/postDb.js");

const router = express.Router();

router.post("/", (req, res) => {
  Users.insert(req.body)
    .then(user => {
      if (!req.body.name) {
        res
          .status(400)
          .json({ errorMessage: "Please provide a name for the user." });
      } else {
        res.status(201).json(user);
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        errorMessage:
          "There was an error while saving the user to the database."
      });
    });
});

router.post("/:id/posts", (req, res) => {
  const { id } = req.params;
  const post = { ...req.body, postedBy: id };
  if (!req.body.text) {
    res.status(400).json({ errorMessage: "Please provide text for the post." });
  } else {
    Posts.insert(post)
      .then(inserted => {
        if (inserted) {
          res.status(201).json(inserted);
        } else {
          res.status(404).json({
            errorMessage: "The user with the specified ID does not exist."
          });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          errorMessage:
            "There was an error while saving this post to the database."
        });
      });
  }
}); //only returns 500

router.get("/", (req, res) => {
  Users.get(req.query)
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: "Error retrieving the users." });
    });
});

router.get("/:id", (req, res) => {
  Users.getById(req.params.id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res
          .status(404)
          .json({ errorMessage: "The user with that ID does not exist." });
      }
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ errorMessage: "The user information could not be retrieved." });
    });
});

router.get("/:id/posts", (req, res) => {
  Users.getUserPosts(req.params.id)
    .then(posts => {
      if (posts.length > 0) {
        res.status(200).json(posts);
      } else {
        res.status(404).json({
          errorMessage: "The post with that specified ID does not exist."
        });
      }
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ errorMessage: "The posts information could no be retrieved." });
    });
});

router.delete("/:id", (req, res) => {
  Users.remove(req.params.id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({
          errorMessage: "The user with the specified ID does not exist."
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        errorMessage: "The user could not be removed."
      });
    });
});

router.put("/:id", (req, res) => {
  if (!req.body.name) {
    res
      .status(400)
      .json({ errorMessage: "Please provide a name for the user." });
  } else {
    Users.update(req.params.id, req.body)
      .then(user => {
        if (user) {
          res.status(200).json(user);
        } else {
          res.status(404).json({
            errorMessage: "The user with the specified ID does not exist."
          });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          errorMessage: "The user information could not be modified."
        });
      });
  }
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
