import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {Textarea} from "../../common/FormsControls/FormsControls";
import AddPostForm, { AddPostValuesType } from './AddPostForm/AddPostForm';
import { PostType } from '../../../types/types';

export type MapPropsType = {
posts: Array<PostType>
}
export type DispatchPropsType = {
 addPost: (newPostText:string)=> void   
}

const MyPosts: React.FC<MapPropsType & DispatchPropsType> = props => {
    let postsElements =
        [...props.posts]
            .reverse()
            .map(p => <Post key={p.id} message={p.message} likesCount={p.likesCount}/>);


    let onAddPost = (values: AddPostValuesType) => {
        props.addPost(values.newPostText);
    }

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <AddPostForm onSubmit={onAddPost}/>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
};
    
const MyPostMemorized = React.memo(MyPosts)

export default MyPostMemorized;