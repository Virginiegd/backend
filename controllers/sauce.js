const Sauce = require('../models/sauce');
const fs = require('fs');

// Création d'une sauce
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    delete sauceObject._userId;
    const sauce = new Sauce({
      ...sauceObject,
      userId: req.auth.userId,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    sauce.save()
      .then(() => { res.status(201).json({ message: 'Sauce ajoutée avec succès !'})})
      .catch(error => { res.status(400).json({ error })});
};

// Modification d'une sauce
exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file ? {...JSON.parse(req.body.sauce),
  imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : { ...req.body };

  delete sauceObject._userId;
  Sauce.findOne({ _id: req.params.id})
    .then((sauce) => {
      if (sauce.userId != req.auth.userId) {
        res.status(403).json({ error: 'Action non authorisée' });
      } else {
        const filename = sauce.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
        Sauce.updateOne({ _id: req.params.id}, {...sauceObject, _id: req.params.id})
          .then(() => res.status(200).json({ message: 'Sauce modifiée avec succès !'}))
          .catch(error => res.status(403).json({ error }))
      });
    }
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

// Suppression d'une sauce
exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id})
      .then(sauce => {
        if (sauce.userId != req.auth.userId) {
          res.status(401).json({ error : 'Suppression non authorisée !'})
        } else {
          const filename = sauce.imageUrl.split('/images/')[1];
          fs.unlink(`images/${filename}`, () => {
            Sauce.deleteOne({ id: req.params.id})
              .then(() => res.status(200).json({ message: 'Sauce supprimée avec succès'}))
              .catch( error => res.status(401).json({ error }));
          });
        }
      })
      .catch( error => res.status(500).json({ error }));
};

// Afficher le détail d'une sauce
exports.findOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
      .then(sauce => res.status(200).json(sauce))
      .catch(error => res.status(404).json({ error }));
};

// Afficher toutes les sauces
exports.findAllSauce = (req, res, next) => {
    Sauce.find()
      .then(sauces => res.status(200).json(sauces))
      .catch(error => res.status(400).json({ error }));
};

// Liker/disliker une sauce
exports.likeSauce = (req, res, next) => {
// J'aime la sauce
  try {
    Sauce.findOne({ _id: req.params.id })
      .then((sauce) => {
        if (!sauce.usersLiked.includes(req.body.userId) && req.body.like === 1) {
          Sauce.updateOne(
            { _id: req.params.id },
            {
              $inc: { likes: 1 },
              $push: { usersLiked: req.body.userId },
            })
            .then(sauce => res.status(200).json({ message: 'Votre like a bien été enregistré !' }))
            .catch(error => res.status(400).json({ error }));
          // Je n'aime pas la sauce
        } else if (!sauce.usersLiked.includes(req.body.userId) && req.body.like === -1) {
          Sauce.updateOne(
            { _id: req.params.id },
            {
              $inc: { dislikes: 1 },
              $push: { usersDisliked: req.body.userId },
            })
            .then(() => res.status(200).json({ message: 'Votre dislike a bien été pris en compte.' }))
            .catch(error => res.status(400).json({ error }));
        } else {
          if (sauce.usersLiked.includes(req.body.userId)) {
            Sauce.updateOne(
              { _id: req.params.id },
              {
                $inc: { likes: -1 },
                $pull: { usersLiked: req.body.userId }
              }
            ).then(sauce = res.status(200).json({ message: 'Votre like a bien été supprimé' }))
              .catch(error => res.status(400).json({ error }));
          } else if (sauce.usersDisliked.includes(req.body.userId)) {
            Sauce.updateOne(
              { _id: req.params.id },
              {
                $inc: { dislikes: -1 },
                $pull: { usersDisliked: req.body.userId }
              }
            ).then(() => res.status(200).json({ message: 'Votre dislike a bien été supprimé' }))
              .catch(error => res.status(400).json({ error }));
            }
          }
        }
      )} catch (error) {res.status(400).json({ error})};
    } ;

   