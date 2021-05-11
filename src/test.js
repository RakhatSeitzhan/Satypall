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
let allCategories = []
for (var key in allCategoriesDict){
    let category = new Category(key,[],null)
    let subcategory = []
    allCategoriesDict[key].forEach(element => {
        const cat = new Category(element, null, category)
        subcategory.push(cat)
    });
    category.subCategories = subcategory
    allCategories.push(category)
}
export function getCategories(){
    return allCategories
}
