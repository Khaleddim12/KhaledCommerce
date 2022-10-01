import fs from 'fs';
import mongoose from 'mongoose';
import color from 'colors';
import dotenv from 'dotenv';


// ! The following arguments illustrates the input argument of the seeding process
//*********************************************/
// * -c Insert constant data                  */
// * -t Delete all data                       */
// * -i insert test data                      */
// * -d delete test data                      */
//*********************************************/

// Load env
dotenv.config({ path: 'src/config/config.env' });

//load models
import {
    Cart,
    Product,
    Category,
    User
} from './models'

//connect to mongo database
mongoose.connect(process.env.MONGO_URI);