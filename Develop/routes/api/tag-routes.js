const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
// find all tags
// be sure to include its associated Product data

router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product }],

    });
    res.status(200).json(tagData)
  } catch (err) {
    res.status(500).json({
      msg: "internal server error",
      err
    });
  }
});
// find a single tag by its `id`
// be sure to include its associated Product data
router.get('/:id',async (req, res) => {
  try{ 
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product}],
  });
  if (!tagData){
    res.status(404).json({message: "No tag found with that data!"});
    return;
  }
  res.status(200).json(tagData);
}catch(err) {
  res.status(500).json(err);
}
});

// create a new tag
router.post('/', async (req, res) => {
  try {
    const newTag = await Tag.create({
      tag_name:req.body.tag_name,
    });
    res.status(200).json(newTag);
  }catch(err){
    res.status(400).json(err);
  }
});

  // update a tag's name by its `id` value
router.put('/:id', (req, res) => {
  Tag.update({
    tag_name:req.body.tag_name,
},
{
where:{
    id:req.params.id
}
}).then(tag=>{
    if(!tag[0]){
        return res.status(404).json({msg:"no such tag or no change made!"})
    }
res.json(tag)
}).catch(err=>{
res.status(500).json({
    msg:"internal server error",
    err
})
})
});

  // delete on tag by its `id` value
router.delete('/:id', (req, res) => {
  Tag.destroy({
    where:{
        id:req.params.id
    }
    }).then(tag=>{
        if(!tag){
            return res.status(404).json({msg:"no such tag name"})
        }
    res.json(tag)
}).catch(err=>{
    res.status(500).json({
        msg:"internal server error",
    })
})
});

module.exports = router;
