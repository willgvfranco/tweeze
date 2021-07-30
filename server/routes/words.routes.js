import Words from "../models/words.model.js";
import User from "../models/user.model.js";

const addWords = (req, res) => {
  const pos = req.body.pos || "";
  const neg = req.body.neg || "";
  const name = req.body.name || "";
  const userId = req.body.userId;

  new Words({
    name: name,
    pos: pos,
    neg: neg,
  }).save((err, newWords) => {
    if (err) {
      console.log("error", err);
    }
    if (userId) {
      const newWordsid = newWords._id;
      console.log(newWordsid);
      const filter = { _id: userId };
      const update = { $push: { words: newWordsid } };
      User.findOneAndUpdate(filter, update, {
        new: true,
      }).then((user) => {
        console.log("added 'grupo' to Words collection");
        res.sendStatus(201);
        return;
      });
    } else {
      console.log("added 'grupo' to Words collection");
      res.sendStatus(201);
      return;
    }
  });
};

// const updateWords = (req, res) => {
//   const userId = req.body.userId;
//   const words = req.body.words;

//   const filter = { _id: userId };
//   const update = { words: words };
//   User.findOneAndUpdate(filter, update, {
//     new: true,
//   }).then((user) => {
//     console.log("updated 'Words' to Words collection");
//     res.sendStatus(201);
//     return;
//   });
// };

const updateWords = (req, res, next) => {
  const wordsId = req.body.wordsId;
  //   const words = req.body.words;
  const pos = req.body.pos || [];
  const neg = req.body.neg || [];
  const name = req.body.name;
  const filter = { _id: wordsId };
  const update = { $set: { pos: pos, neg: neg, name: name } };
  Words.findOneAndUpdate(filter, update, {
    new: true,
  }).then((user) => {
    console.log("updated 'Words' to Words collection");
    next();
    // res.sendStatus(201);
    // return;
  });
};

const removeWords = (req, res) => {
  const wordsId = req.body.wordsId;

  Words.findByIdAndRemove(wordsId).save((err) => {
    if (err) {
      console.log("error", err);
    }
    console.log("removed 'grupo' from Words collection");
    res.sendStatus(200);
    return;
  });
};

// const updateUserWords = (req, res) => {
//     const wordsId = req.body.wordsId;
//     const userId = req.body.userId;

//     const pos = req.body.pos || [];
//     const neg = req.body.neg || [];
//     const name = req.body.name;
//     const filter = { _id: wordsId };
//     const update = { $set: { pos: pos, neg: neg, name: name } };
//     Words.findOneAndUpdate(filter, update, {
//       new: true,
//     }).then((user) => {
//       console.log("updated 'Words' to Words collection");
//       res.sendStatus(201);
//       return;
//     });
//   };

const listWordsByUser = (req, res) => {
  const userId = req.body.userId;

  User.findOne({
    _id: userId,
  })
    .populate("words", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      console.log(user);
      var words_group = [];

      for (let i = 0; i < user.words.length; i++) {
        // const wordId = user.words[i]

        words_group.push(user.words[i]);
      }

      res.status(200).send({
        grupo_palavras: words_group,
      });
    });
};

export default function (app) {
  app.post("/api/words/add", addWords);
  app.post("/api/words/delete", removeWords);
  app.post("/api/words/update", updateWords, listWordsByUser);
  app.get("/api/words/list", listWordsByUser);
  // app.post("/api/user/words/update", updateUserWords);
}

// [ 61022e333fa1b24f11f9c665, 61022e363fa1b24f11f9c668 ]
