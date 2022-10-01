import {validate} from '../validator'

const productValidate = (validationCase:"create"| "edit"|"assign")=>{
    switch(validationCase){
        case "create":
            return [
                validate("name").isRequired().isString().isUnique("Product").length(4).exec(),
                validate("category").isRequired().isObjectID().exec(),
                validate("price").isRequired().isNumber().exec(),
                validate("count").isRequired().isNumber().exec(),
                validate("description").isRequired().length(15).exec(),
            ];
        case "edit":
            return [
                validate("name").isOptional().isString().isUnique("Product").length(4).exec(),
                validate("category").isOptional().isObjectID().exec(),
                validate("price").isOptional().isNumber().exec(),
                validate("count").isOptional().isNumber().exec(),
                validate("description").isOptional().length(15).exec(),          
            ];
        case "assign":
            return [
                validate("count").isRequired().isNumber().exec()          
            ];
        default: return[];
    }
}

export {productValidate}