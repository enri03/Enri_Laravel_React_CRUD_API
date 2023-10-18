import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import Header from "../components/Header";
import { Table } from "react-bootstrap";
import { getUsersList } from "../actions/userActions";
import { Link } from "react-router-dom";
import Message from "../components/Message";
const UsersListScreen = ({ history }) => {
  const [deleteStatus, setDeleteStatus] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState("");
  const [deleteError, setDeleteError] = useState("");

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const usersListData = useSelector((state) => state.usersList);
  const { usersList, loading, success } = usersListData;

  useEffect(() => {
    if (!userInfo) {
      history.push("/");
    } else {
      dispatch(getUsersList());
    }
  }, [history, userInfo, dispatch, deleteStatus]);

  const handleDeleteUser = async (userID) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.delete(
        `http://localhost:8000/api/user/${userID}`,
        config
      );
      setDeleteMessage(data.message);
      setDeleteStatus(true);
      dispatch(getUsersList());
    } catch (error) {
      setDeleteError(error.response.data.message);
      setDeleteStatus(false);
    }
  };
  return (
    <div>
      <Header />
      {!deleteStatus && deleteError && <Message variant="danger">{deleteError}</Message>}
      {deleteStatus && <Message variant="warning">{deleteMessage}</Message>}
      <Link to={`users/create/`} className="btn btn-primary">
        Create User
      </Link>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Company</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {loading
            ? "Loading..."
            : success &&
              usersList.map((user) => {
                return (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.last_name}</td>
                    <td>{user.company_name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone_number}</td>
                    <td>
                      <Link
                        to={`users/edit/${user.id}`}
                        className="btn btn-primary"
                      >
                        Edit
                      </Link>
                    </td>
                    <td>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
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

export default UsersListScreen;
