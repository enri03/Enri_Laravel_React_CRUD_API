import axios from "axios";
// User Log in action
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: "USER_LOGIN_REQUEST",
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };

    const { data } = await axios.post(
      "http://localhost:8000/api/login",
      { email, password },
      config
    );

    dispatch({
      type: "USER_LOGIN_SUCCESS",
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: "USER_LOGIN_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// User register action
export const register =
  (name, last_name, email, company_name, phone_number, password) =>
  async (dispatch) => {
    try {
      dispatch({
        type: "USER_REGISTER_REQUEST",
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      };
      const { data } = await axios.post(
        "http://localhost:8000/api/register",
        { name, last_name, company_name, phone_number, email, password },
        config
      );
      dispatch({
        type: "USER_REGISTER_SUCCESS",
        payload: data,
      });

      //localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: "USER_REGISTER_FAIL",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

// User Log out action
export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: "USER_LOGOUT" });
  document.location.href = "/";
};

// Action to get  users list
export const getUsersList = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: "GET_USER_LIST_REQUEST",
    });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get("http://localhost:8000/api/user", config);
    dispatch({
      type: "GET_USER_LIST_SUCCESS",
      payload: data,
    });
    dispatch({
      type: "USER_RESET_REQUEST",
    });
  } catch (error) {
    dispatch({
      type: "GET_USER_LIST_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
// Create new user action
export const createUser =
  (name, last_name, email, company_name, phone_number, password) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: "USER_CREATE_REQUEST",
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.post(
        "http://localhost:8000/api/user",
        { name, last_name, company_name, phone_number, email, password },
        config
      );
      dispatch({
        type: "USER_CREATE_SUCCESS",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "USER_CREATE_FAIL",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
export const getUserDataByID = (userID) => async (dispatch, getState) => {
  try {
    dispatch({
      type: "GET_USER_BY_ID_REQUEST",
    });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `http://localhost:8000/api/user/${userID}/edit`,
      config
    );
    dispatch({
      type: "GET_USER_BY_ID_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "GET_USER_BY_ID_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
//Action to update user by ID
export const updateUserByID =
  (userID, name, last_name, email, company_name, phone_number, password) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: "USER_UPDATE_REQUEST",
      });
      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.put(
        `http://localhost:8000/api/user/${userID}`,
        { name, last_name, company_name, phone_number, email, password },
        config
      );
      dispatch({
        type: "USER_UPDATE_SUCCESS",
        payload: data.message,
      });
      dispatch(getUserDataByID(data.user_id));
    } catch (error) {
      dispatch({
        type: "USER_UPDATE_FAIL",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
