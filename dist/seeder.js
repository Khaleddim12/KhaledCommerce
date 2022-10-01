"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
// ! The following arguments illustrates the input argument of the seeding process
//*********************************************/
// * -c Insert constant data                  */
// * -t Delete all data                       */
// * -i insert test data                      */
// * -d delete test data                      */
//*********************************************/
// Load env
dotenv_1.default.config({ path: 'src/config/config.env' });
//connect to mongo database
mongoose_1.default.connect(process.env.MONGO_URI);
