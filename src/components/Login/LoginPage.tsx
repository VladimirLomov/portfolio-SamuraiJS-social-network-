import React from 'react';
import {InjectedFormProps, reduxForm} from "redux-form";
import {createFild, GetStringKeys, Input} from "../common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import { useDispatch, useSelector} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";
import style from "./../common/FormsControls/FormsControls.module.css"
import { AppStateType } from '../../redux/redux-store';


type LoginFormOwnProps = {

    captchaUrl: string | null
}

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType,LoginFormOwnProps>& LoginFormOwnProps>
 = ({handleSubmit,error, captchaUrl}) => {
     
    return (
        <form onSubmit={handleSubmit}>
            
                {createFild<LoginFormValuesTypeKeys>("Email","email",[required],Input)}
                {createFild<LoginFormValuesTypeKeys>("Password","password",[required],Input, {type:"password"})}
                {createFild<LoginFormValuesTypeKeys>(undefined,"rememberMe",[],Input, {type:"checkbox"},'remember me')}

          {captchaUrl && <img src={captchaUrl} /> }
          {captchaUrl &&  createFild<LoginFormValuesTypeKeys>("Symbols from image","captcha",[required],Input,{}) }
           
            { error && <div className={style.formSummaryError}>
                {error}
            </div>
            }
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm =  reduxForm<LoginFormValuesType,LoginFormOwnProps>({form: 'login'})(LoginForm)

export type LoginFormValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
    
    }

    type LoginFormValuesTypeKeys =GetStringKeys< LoginFormValuesType>
    


export const LoginPage: React.FC = () => {

const captchaUrl = useSelector((state: AppStateType) => state.auth.captchaUrl)
const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)
const dispatch = useDispatch()

    const onSubmit = (formData: LoginFormValuesType ) => {
        dispatch(login(formData.email, formData.password, formData.rememberMe, formData.captcha))
    }

    if (isAuth) {
        return <Redirect to={"/profile"} />
    }

    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit}  captchaUrl={captchaUrl} />
    </div>
}



