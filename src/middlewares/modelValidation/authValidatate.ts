import { validate } from "../validator";

const authValidation =(validationCase: "login" | "register" | "forgot" | "reset")=>{
    switch(validationCase){
        case "login":
            return [
                validate("username").isRequired().exec(),
                validate("password").isRequired().exec(),
            ];
        case "register":
            return [
                validate("username").isRequired().isString().isUnique("User").exec(),
                validate("password").isRequired().length(8).exec(),
                validate("email").isRequired().isEmail().isUnique("User").exec(),
              ];
        case "reset":
            return [validate("password").isRequired().isString().exec()];
        default:
            return[];
    }
}
export{authValidation}