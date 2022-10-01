import{errorSentances} from "../../types"

const errorData = (path: string, value?: string): errorSentances=>{
    const sentances: errorSentances = {
        required: `${path} is required!.`,
        special:
          "Incorrect format: " + path + " must contain only letters and numbers!.",
        email: "Please enter an email with the format of: example@example.com.",
        number: `Incorrect value entered: ${path} must only contain numbers.`,
        zip: `Please enter a valid Zip code for your region.`,
        unique: `${path} with the same value is already exist!.`,
        minLength: `${path} must be atleast ${value ?? "2"} characters.`,
        maxLength: `${path} must be atleast ${value ?? "12"} characters.`,
        boolean: `Incorrect value entred: ${path} must be a boolean.`,
        date: `Incorrect date format.`,
        string: `${path} must be a string!.`,
        betweenLength: `Must contain between ${value ?? "20, to 200"} characters`,
        exist: `${path} does not exist!.`,
        auth: `Not authenticated to access this route`,
        image:`Only .png, .jpg and .jpeg format allowed!`,
        upload:`no image have been choosen to upload`

      };
      return sentances;
    };
    
    export const errorMessages  = (type: keyof errorSentances,path: string,
        value?: string)=>{
            const sentance = errorData(path,value)
            return sentance[type];
        }
    export {errorData};