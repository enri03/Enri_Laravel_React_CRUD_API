import axios from "axios";

export const getCompanyList = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: "GET_COMPANY_LIST_REQUEST",
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
      "http://localhost:8000/api/company",
      config
    );
    dispatch({
      type: "GET_COMPANY_LIST_SUCCESS",
      payload: data,
    });
    dispatch({
      type: "USER_RESET_REQUEST",
    });
  } catch (error) {
    dispatch({
      type: "GET_COMPANY_LIST_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// get company data by ID
export const getCompanyDataByID = (companyID) => async (dispatch, getState) => {
  try {
    dispatch({
      type: "GET_COMPANY_BY_ID_REQUEST",
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
      `http://localhost:8000/api/company/${companyID}/edit`,
      config
    );
    dispatch({
      type: "GET_COMPANY_BY_ID_SUCCESS",
      payload: data,
    });
  } catch (error) {
    console.log(error.response);
    dispatch({
      type: "GET_COMPANY_BY_ID_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
