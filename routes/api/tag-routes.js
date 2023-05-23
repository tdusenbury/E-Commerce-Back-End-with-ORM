const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
  // find a single tag by its `id`
  // be sure to include its associated Product data

router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }]
     });
     if(!tagData) {
      res.status(400).json({message: "No tag with this id has been found"});
      return;
     }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
  });

router.post('/', async (req, res) => {
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
    } catch (err) {
      res.status(400).json(err);
    }
  });

  // update a tag's name by its `id` value
  router.put('/:id', async (req, res) => {
    try {
      const tagData = await Tag.update(req.body, {
        where: {
          id: req.params.id,
        },
      
      });
      if (!tagData[0]) {
        res.status(400).json({message: "No tag with this id has been found"});
        return;
      }
      res.status(200).json({ message: "Tag has been updated"});
    } catch (err) {
      res.status(400).json(err);
    }
  });


  // delete on tag by its `id` value
  router.delete('/:id', async (req, res) => {
    try {
      const tagData = await Tag.destroy({
    where: {
      id: req.params.id
    }
  });
    if (!tagData) {
      res.status(400).json({message: "No tag with this id has been found"});
      return;
    }
      res.status(200).json({message: "Tag has been deleted."});
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;
