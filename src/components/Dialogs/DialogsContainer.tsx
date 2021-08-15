import React from 'react';
import {actions} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import { AppStateType } from '../../redux/redux-store';

let mapStateToProps = (state: AppStateType) => {
    return {
        dialogsPage: state.dialogsPage
    }
}
// let mapDispatchToProps = (dispatch) => {
//     return {
//         sendMessage: (newMessageBody) => {
//             dispatch(actions.sendMessage(newMessageBody));
//         }
//     }
// }

export default compose<React.ComponentType>(
    connect(mapStateToProps, {...actions }),
    withAuthRedirect
)(Dialogs);