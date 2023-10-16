import { createStore, combineReducers,applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'
import {userLoginReducer,userRegisterReducer,usersListReducer,userDataByIDReducer,updateUserByIDReducer,userCreateReducer,companyListReducer,companyDataByIDReducer} from './reducers/generalReducer';

const reducer = combineReducers({
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    usersList: usersListReducer,
    userDataByID:userDataByIDReducer,
    updateUserByID:updateUserByIDReducer,
    userCreate:userCreateReducer,
    companyList:companyListReducer,
    companyDataByID:companyDataByIDReducer
})

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null


const initialState = {
    userLogin:{userInfo:userInfoFromStorage},
}
const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store