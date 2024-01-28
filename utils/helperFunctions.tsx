import crypto from "crypto";


export const createCodeToToken = ()=>{
    const token = crypto.randomInt(100_000, 1_000_000).toString();
    return token
}