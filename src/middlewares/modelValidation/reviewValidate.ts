import {validate} from '../validator'
const reviewValidate = (validationCase:"addReview")=>{
    switch(validationCase){
        case "addReview":
            return[
                validate("rating").isRequired().isNumber().exec(),
                validate("comment").isRequired().isString().length(15).exec()
            ];
            default: return[];
    }
}

export {reviewValidate}