import {Action, applyMiddleware, combineReducers, createStore} from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import thunkMiddleware, { ThunkAction } from "redux-thunk";
import { reducer as formReducer } from 'redux-form'
import appReducer from "./app-reducer";
import chatReducer from "./chat-reducer";

let rootReducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer,
    chat: chatReducer
});

type RootReducerType = typeof rootReducers
export type AppStateType = ReturnType<RootReducerType>


export type InferActionsTypes<T> =T extends {[key:string]: (...args:any[])=>infer U } ? U: never

export type BaseThunkType<A extends Action=Action,R = Promise<void>> =  ThunkAction<R, AppStateType, unknown, A>

let store = createStore(rootReducers, applyMiddleware(thunkMiddleware));
// @ts-ignore
window.store = store;


export default store;