import {Response} from 'express'

interface IFilterResponse extends Response{
    
    filter:{
        success: boolean;
        rowCount: number;
        pageCount: number;
        pagination: Object;
        data: Object;
    }
}

export {IFilterResponse};