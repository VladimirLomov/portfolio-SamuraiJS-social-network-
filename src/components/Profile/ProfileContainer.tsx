import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getStatus, getUserProfile, updateStatus, savePhoto, saveProfile} from "../../redux/profile-reducer";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {compose} from "redux";
import { AppStateType } from '../../redux/redux-store';
import { ProfileType } from '../../types/types';

type MapPropsType = ReturnType<typeof mapStateToProps>

type MapDispatchPropsType = {
    getUserProfile: (userId:number) => void
    getStatus: (userId:number) => void
    updateStatus: (status:string) => void
    savePhoto: (file:File) => void
    saveProfile: (profile: ProfileType) => Promise<any>
}
type PathParamsType = {
    userId: string
}

type PropsType = MapPropsType & MapDispatchPropsType & RouteComponentProps<PathParamsType>

class ProfileContainer extends React.Component<PropsType> {


refreshProfile(){
    let userId: number | null = +this.props.match.params.userId; // "+" конвертация в число
    if (!userId) {
        userId = this.props.authorizedUserId;
        if (!userId) {
            this.props.history.push("/login");
        }
    }
    if (!userId) {
        console.error("ID should exist in URI params or in state")
    } else {
    this.props.getUserProfile(userId );
    this.props.getStatus(userId );
    }
}

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps:PropsType, prevState:PropsType){
        if(this.props.match.params.userId !== prevProps.match.params.userId){
       this.refreshProfile()
        }

    }

    render() {
        console.log(this.props.history);
        return (
            <Profile {...this.props}
            isOwner ={!this.props.match.params.userId}
                     profile={this.props.profile}
                     status={this.props.status}
                     updateStatus={this.props.updateStatus}
                     savePhoto={this.props.savePhoto} />
        )
    }
}

let mapStateToProps = (state: AppStateType) => {
    //console.log('mapStateToProps PROFILE')
    return ({
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        authorizedUserId: state.auth.userId,
        isAuth: state.auth.isAuth
    })
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, {getUserProfile, getStatus, updateStatus, savePhoto, saveProfile}),
    withRouter
)(ProfileContainer);




