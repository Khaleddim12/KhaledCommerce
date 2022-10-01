import {validate} from '../validator'

const categoryValidation =(validationCase:"create"| "edit")=>{
    switch(validationCase){
        case "create":
            return [
                validate("name").isRequired().isString().isUnique("Category").length(4).exec(),
                
            ];
        case "edit":
            return [
                validate("name").isOptional().isString().isUnique("Category").length(4).exec(),
                
            ];
        default:
            return[];
    }
    
}
export{categoryValidation}