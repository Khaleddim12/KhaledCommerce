
import {IUser} from "../interfaces"
//Environment Variables

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            MONGO_URI: string;
            PORT: number;
            NODE_ENV: 'development' | 'production';
            JWT_SECRET: string;
            JWT_EXPIRE: string;
            JWT_COOKIE_EXPIRE: string;
            SMTP_HOST: string;
            SMTP_PORT: number;
            SMTP_USER: string;
            SMTP_PASSWORD: string;
            FROM_EMAIL: string;
            FROM_NAME: string;
        }
    }
}
export {};

declare global {
  namespace Express {
    interface Request {
      user: string | IUser;
      fileName:string,
    }
  }
}

declare global {
  namespace Express {
    interface Response {
      filter: {};
      paginatedResults:{};
    }
  }
}


export {};