class Category {
    constructor(name, id, subCategories, parent){
        this.name = name
        this.subCategories = subCategories
        this.parent = parent
        this.id = id
    }
}
export function getCategories(){
    const allCategoriesDict= {
        'Electronics': ['Laptops & PC','Phones','Smart Watches','Headphones','Other devices'],
        'Clothes': ['Top','Bottom', 'Shoes']
    }
    let allCategoriesObj = new Category('Categories', 0,null, null)
    let allCategories = []
    let currentId = 1
    for (var key in allCategoriesDict){
        let category = new Category(key,currentId,[],allCategoriesObj)
        let subcategory = []
        currentId++
        allCategoriesDict[key].forEach(element => {
            const cat = new Category(element, currentId, null, category)
            subcategory.push(cat)
            currentId++
        });
        category.subCategories = subcategory
        allCategories.push(category)
    }
    allCategoriesObj.subCategories = allCategories

    return allCategoriesObj
}
