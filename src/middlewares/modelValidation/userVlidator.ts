import {validate} from ".."

const userValidator = (validationCase:"edit")=>{
    switch(validationCase){
        case "edit":
            return[
                validate("username").isOptional().isString().length(2).isUnique("User").exec(),
                validate("email").isOptional().isEmail().isUnique("User").exec(),
                validate("password").isOptional().length(8).exec(),
            ];
        default:
            return [];
    };
};

export {userValidator};