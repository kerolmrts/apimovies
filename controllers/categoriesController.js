const FileSystem= require ('fs').promises;
const path= require('path')


const categoriesFilePath= path.join(__dirname, '../data/categories.json');

const getCategories= () =>{
    return FileSystem.readFile(categoriesFilePath, 'utf-8')
    .then((categoriesData) =>JSON.parse(categoriesData))
    .catch((error) =>{
        throw new Error('Impossível ler o arquivo JSON')
    })
}

const createCategories=(newCategory) =>{
    return getCategories()
    .then((categoriesData) =>{
        categoriesData.push({name: newCategory.name})
        return FileSystem.writeFile(categoriesFilePath,JSON.stringify(categoriesData));
    })
    .catch((error) =>{
        throw new Error ('A categoria não foi criada')
    })
}

module.exports= {
    getCategories,
    createCategories
};