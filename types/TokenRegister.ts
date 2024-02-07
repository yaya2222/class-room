import {Document } from "mongoose";

export default interface TokenRegister {
    email: string,
    token: string,
    expires: Date,
}

export interface ITokenRegister extends TokenRegister,Document {}