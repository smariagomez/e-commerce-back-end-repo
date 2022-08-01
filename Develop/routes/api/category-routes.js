const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
// find all categories
// be sure to include its associated Products

router.get('/', async (req, res) => {
  try {
    const categoryData = await
      Category.findAll({
        include: [{ model: Product }],
      });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// find one category by its `id` value
// be sure to include its associated Products
router.get('/:id', async (req, res) => {
  try {
    const categoryData = await
      Category.findByPk(req.params.id,
        {
          include: [{ model: Product }],
        });

    if (!categoryData) {
      res.status(404).json({
        message:
          'No category found matching that data!'
      });
      return;
    }
    res.status(200).json
      (categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create a new category
router.post('/', async (req, res) => {
  try {
    const newCategory = await Category.create({
      category_name: req.body.category_name,
    });
    res.status(200).json(newCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});

// update a category by its `id` value
router.put('/:id', (req, res) => {
  Category.update({
    category_name: req.body.category_name
  },
    {
      where: {
        id: req.params.id,
      }
    }).then(category => {
      if (!category) {
        return res.status(404).json({ msg: 'No category with this id!' })
      }
      res.json(category)
    }).catch(err => {
      res.status(500).json({
        msg: "internal server error",
        err
      })
    })
});

// delete a category by its `id` value
router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id,
    }
  }).then(category => {
    if (!category) {
      return res.status(404).json({ msg: 'No category found with that id!' })
    }
    res.json(category)
  }).catch(err => {
    res.status(500).json({
      msg: "internal server error",
      err
    })
  })
})

module.exports = router;
