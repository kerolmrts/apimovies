const express= require ('express');
const router= express.Router();
const categoriesController= require ('../controllers/categoriesController')

router.get('/', (req, res) =>{
  categoriesController.getCategories()
   .then((categories) => res.json(categories))
   .catch((error) => res.status(500).send('Erro ao gerar a categoria'))
})

router.post('/', (req, res) =>{
    const newCategory= req.body;
    categoriesController.createCategories(newCategory)
    .then(() => res.status(201).send('Categoria criada com sucesso'))
    .catch((error) => res.status(500).send('Erro ao criar a categoria'))
})

module.exports= router;