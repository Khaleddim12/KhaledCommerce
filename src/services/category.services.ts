//INTERFACES
import {ICategory} from '../interfaces/categoryInterface'

//MODELS
import {Category} from '../models/Category'

//GET CATEGORY BY SLUG
export const getCategory = async (slug: string) =>{
    return Category.findOne({ slug: slug});
};


export const getCategoryByCondititon = async(condition: Object)=>{
    return Category.findOne(condition)
}

export const deleteCategory = async (_id:string) => {
    return Category.findByIdAndDelete(_id);
  };


//create new category
export const addCategory = async(data:ICategory):Promise<ICategory>=>{
    return Category.create(data);
}