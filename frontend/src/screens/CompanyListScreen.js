import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import Header from "../components/Header";
import { Table, Image } from "react-bootstrap";
import { getCompanyList } from "../actions/companyAction";
import { Link } from "react-router-dom";
import Message from "../components/Message";
const CompanyListScreen = ({ history }) => {
  const [deleteStatus, setDeleteStatus] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState("");
  const [deleteError, setDeleteError] = useState("");

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const companyListData = useSelector((state) => state.companyList);
  const { companyList, loading, success } = companyListData;

  useEffect(() => {
    if (!userInfo) {
      history.push("/");
    } else {
      dispatch(getCompanyList());
    }
  }, [history, userInfo, dispatch, deleteStatus]);

  const handleDeleteCompany = async (userID) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.delete(
        `http://localhost:8000/api/company/${userID}`,
        config
      );
      setDeleteMessage(data.message);
      setDeleteStatus(true);
      dispatch(getCompanyList());
    } catch (error) {
      setDeleteError(error.response.data.message);
    }
  };
  return (
    <div>
      <Header />
      {deleteError && <Message variant="danger">{deleteError}</Message>}
      {deleteStatus && <Message variant="warning">{deleteMessage}</Message>}
      <Link to={"companies/create/"} className="btn btn-primary">
        Create Company
      </Link>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Website</th>
            <th>Logo URL</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {loading
            ? "Loading..."
            : success &&
              companyList.map((company) => {
                return (
                  <tr key={company.id}>
                    <td>{company.name}</td>
                    <td>{company.email}</td>
                    <td>{company.website}</td>
                    <td>
                      <Image
                        src={
                          "http://localhost:8000/logo_storage/" +
                          company.logo_url
                        }
                        alt="Company Logo"
                        style={{ width: "100px", height: "100px" }}
                      />
                    </td>
                    <td>
                      <Link
                        to={`companies/edit/${company.id}`}
                        className="btn btn-primary"
                      >
                        Edit
                      </Link>
                    </td>
                    <td>
                      <button
                        onClick={() => handleDeleteCompany(company.id)}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
        </tbody>
      </Table>
    </div>
  );
};

export default CompanyListScreen;
