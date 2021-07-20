class Category {
    constructor(name, subCategories, parent){
        this.name = name
        this.subCategories = subCategories
        this.parent = parent
    }
}
const allCategoriesDict= {
    'Electronics': ['Laptops & PC','Phones','Smart Watches','Headphones','Other devices'],
    'Clothes': ['Top','Bottom', 'Shoes']
}
let allCategoriesObj = new Category('Categories', null, null)
let allCategories = []
for (var key in allCategoriesDict){
    let category = new Category(key,[],allCategoriesObj)
    let subcategory = []
    allCategoriesDict[key].forEach(element => {
        const cat = new Category(element, null, category)
        subcategory.push(cat)
    });
    category.subCategories = subcategory
    allCategories.push(category)
}
allCategoriesObj.subCategories = allCategories
let currentId = 0
let pagesList = []
let content1 =  []
allCategoriesObj.subCategories.forEach(item => {
    content1.push(item.name)
})
pagesList.push({ content: content1, pageId: currentId, parentPageId: null})
currentId++
allCategoriesObj.subCategories.forEach(category => {
    let content =  []
    category.subCategories.forEach(item => {
        content.push(item.name)
    })
    pagesList.push({ content: content, pageId: currentId, parentPageId: 0})
    // category.subCategories.forEach(_category => {
    //     pagesList.push({ name: _category.name, pageId: null, parentPageId: currentId})
    // })
    currentId++ 
})

export function getPagesList(){
    console.log(pagesList)
    return pagesList
}