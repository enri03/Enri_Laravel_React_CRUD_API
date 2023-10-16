export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
      case "USER_LOGIN_REQUEST":
        return { loading: true };
      case "USER_LOGIN_SUCCESS":
        return { loading: false, userInfo: action.payload };
      case "USER_LOGIN_FAIL":
        return { loading: false, error: action.payload };
      case "USER_LOGOUT":
        return {};
      default:
        return state;
    }
  };

  export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
      case "USER_REGISTER_REQUEST":
        return { loading: true };
      case "USER_REGISTER_SUCCESS":
        return { loading: false, success: true,message:"Congratulation you now have an account please log in to your account",userData:action.payload.user};
      case "USER_REGISTER_FAIL":
        return { loading: false, error: action.payload, success: false };
      case "USER_LOGOUT":
        return {};
      default:
        return state;
    }
  };
  export const userCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case "USER_CREATE_REQUEST":
        return { loading: true };
      case "USER_CREATE_SUCCESS":
        return { loading: false, success: true,message:action.payload.message};
      case "USER_CREATE_FAIL":
        return { loading: false, error: action.payload, success: false };
      case "USER_RESET_REQUEST":
        return {};
      default:
        return state;
    }
  };
  export const updateUserByIDReducer = (state = {}, action) => {
    switch (action.type) {
      case "USER_UPDATE_REQUEST":
        return { loading: true };
      case "USER_UPDATE_SUCCESS":
        return { loading: false, success: true,message:action.payload };
      case "USER_UPDATE_FAIL":
        return { loading: false, error: action.payload, success: false };
      case "USER_RESET_REQUEST":
        return {}
      default:
        return state;
    }
  };


  export const usersListReducer = (state = {}, action) => {
    switch (action.type) {
      case "GET_USER_LIST_REQUEST":
        return { loading: true };
      case "GET_USER_LIST_SUCCESS":
        return { loading: false, success: true, usersList: action.payload };
      case "GET_USER_LIST_FAIL":
        return { loading: false, error: action.payload };
        case "GET_USER_LIST_RESET":
          return {}
      default:
        return state;
    }
  };

  export const userDataByIDReducer = (state = {}, action) => {
    switch (action.type) {
      case "GET_USER_BY_ID_REQUEST":
        return { loading: true };
      case "GET_USER_BY_ID_SUCCESS":
        return { loading: false, success: true, userData: action.payload };
      case "GET_USER_BY_ID_FAIL":
        return { loading: false, error: action.payload };
        case "GET_USER_BY_ID_RESET":
          return {}
      default:
        return state;
    }
  };

// ------------------   COMPANY  REDUCERS ---------------------//
  export const companyListReducer = (state = {}, action) => {
    switch (action.type) {
      case "GET_COMPANY_LIST_REQUEST":
        return { loading: true };
      case "GET_COMPANY_LIST_SUCCESS":
        return { loading: false, success: true, companyList: action.payload };
      case "GET_COMPANY_LIST_FAIL":
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };

  export const companyDataByIDReducer = (state = {}, action) => {
    switch (action.type) {
      case "GET_COMPANY_BY_ID_REQUEST":
        return { loading: true };
      case "GET_COMPANY_BY_ID_SUCCESS":
        return { loading: false, success: true, companyData: action.payload };
      case "GET_COMPANY_BY_ID_FAIL":
        return { loading: false, error: action.payload };
        case "GET_COMPANY_BY_ID_RESET":
          return {}
      default:
        return state;
    }
  };