import React from 'react';
import {reduxForm} from "redux-form";
import {InjectedFormProps} from "redux-form";
import { required } from '../../../../utils/validators/validators';
import { createFild, GetStringKeys, Input } from '../../../common/FormsControls/FormsControls';

type PropsType = {

}

export type AddPostValuesType = {
    newPostText: string
}

type AddPostValuesTypesKeys = GetStringKeys<AddPostValuesType>


const AddPostForm: React.FC<InjectedFormProps<AddPostValuesType,PropsType>&PropsType> = (props) => {
    return (
            <form onSubmit={props.handleSubmit}>
                <div>
                {createFild<AddPostValuesTypesKeys>("Your post","newPostText",[required],Input)}
                    
                </div>
                <div>
                    <button>Add post</button>
                </div>
            </form>
    )
}

export default  reduxForm<AddPostValuesType,PropsType>({form: 'profile-add-post'})(AddPostForm)
