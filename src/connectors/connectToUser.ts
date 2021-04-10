import {connect} from "../redux";

const userSelector = (state: AppState) => ({user: state.user})
const userDispatcher = (dispatch: Function) => {
  return {
    updateUser: (user: Partial<User>) => dispatch({type: 'updateUser', payload: user})
  }
}

const connectToUser = connect(userSelector, userDispatcher)

export default connectToUser