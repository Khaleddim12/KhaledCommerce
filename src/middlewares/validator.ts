import mongoose from "mongoose";
import ObjectId from "mongoose";
import { check } from "express-validator";

//* Utility functions
import { errorMessages } from "../utils/messages/errorMessages";

let validate = (field: string) => {
  let validateObj = {
    result: check(),

    field: function () {
      this.result = check(field);
      return this;
    },

    //* Check string format
    isString: function () {
      this.result = this.result
        .isString()
        .withMessage(errorMessages("string", field))
        .bail();
      return this;
    },

    isNumber: function () {
      this.result = this.result
        .isNumeric()
        .withMessage(errorMessages("number", field))
        .bail();
      return this;
    },

    isObjectID:function(){
      this.result = this.result
      .custom(async value => {
        if (!ObjectId.isValidObjectId(value))
          return Promise.reject("Not valid object ID");
      })
      .bail();
    return this;
  
    },

    //check length between minimum and maximum

    length: function (min: number) {
      this.result = this.result
        .isLength({min: min })
        .withMessage(`length must be more than ${min} characters`)
        .bail();
      return this;
    },

    //check if field is boolean

    isBoolean: function () {
      this.result = this.result
        .isBoolean()
        .withMessage(errorMessages("boolean", field))
        .bail();
      return this;
    },

    //check if field is date

    isDate: function () {
      this.result = this.result
        .isISO8601()
        .toDate()
        .withMessage(errorMessages("date", field))
        .bail();
      return this;
    },
    //check if field is required
    isRequired: function () {
      this.result = this.result
        .exists({ checkFalsy: true })
        .withMessage(errorMessages("required", field))
        .bail();
      return this;
    },

    //check uf field is optinal
    isOptional: function () {
      this.result = this.result.optional();
      return this;
    },

    //check if field is email
    isEmail: function () {
      this.result.isEmail().withMessage(errorMessages("email", field)).bail();
      return this;
    },

    //check if field is unique
    isUnique: function (model: string) {
      this.result = this.result
        .custom(async (value) => {
          try {
            const document = await mongoose
              .model(model)
              .findOne({ [field]: value });

            if (document) return Promise.reject(errorMessages("unique", field));
          } catch (error) {
            return Promise.reject(error);
          }
        })
        .bail();
      return this;
    },

    //check if exist in db
    isExist: function (model: string, path: string) {
      this.result = this.result.custom(async (value) => {
        try {
          const document = await mongoose
            .model(model)
            .findOne({ [path]: value });

          if (!document) return Promise.reject(errorMessages("exist", field));
        } catch (error) {
          return Promise.reject(error);
        }
      });
    },

    // Return results for express validator to be executed
    exec: function () {
      return this.result;
    },
  };

  return validateObj.field();
};
export { validate };
