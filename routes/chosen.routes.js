const { Router } = require("express");
const Fav = require("../models/Fav");
const router = Router();
const auth = require("../middleware/auth.middleware.js");
const config = require("config");

router.get("/", auth, async (req, res) => {
  try {
    const favs = await Fav.find({ owner: req.user.userId });
    res.json(favs)
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const fav = await Fav.findById(req.params.id);
    res.json(fav);
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
});

router.post("/save", auth, (req, res) => {
  const baseUrl = config.get('baseUrl')
  const { value, name, quantity, videos } = req.body;
  const fav = new Fav({
    value: value,
    name: name,
    quantity: quantity,
    videos: videos,
    owner: req.user.userId
  });
  fav
    .save()
    .then((fav) => res.json(fav))
    .catch((e) => res.status(500).send(e.message));
});

router.post("/edit/:id", async (req, res) => {
  const id = req.params.id;
  try {
    console.log(id);
    await Fav.findById(id, (err, fav) => {
      if (!fav) {
        res.status(404).send("Fav not found");
      } else {
        fav.name = req.body.name;
        fav.value = req.body.value;
        fav.quantity = req.body.quantity;
        fav
          .save()
          .then((user) => {
            res.json(user);
          })
          .catch((err) => res.status(500).send(err.message));
      }
    });
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
});

module.exports = router;
