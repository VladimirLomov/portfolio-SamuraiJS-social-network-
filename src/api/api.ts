import axios from "axios";
import { ProfileType, UserType } from "../types/types";


export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers:     {
        "API-KEY": "214e56d1-a719-4e20-b298-8799e58fd70d"
    }
});





export enum ResultCodesEnum  {
    Success = 0,
    Error = 1,
    

}

export enum ResultCodeForCaptchaEnum {
    CaptchaIsRequired = 10
}


export type GetItemsType = {
    items:Array<UserType>
    totalCount:number
    error: string | null
}

export type ResponseType<D = {}, RC = ResultCodesEnum> = {

    data: D
    messages: Array<string>
    resultCode: RC
}




