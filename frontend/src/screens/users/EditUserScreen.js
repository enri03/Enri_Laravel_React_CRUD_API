import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import FormContainer from "../../components/FormContainer";
import { getUserDataByID, updateUserByID } from "../../actions/userActions";
import Header from "../../components/Header";

const EditUserScreen = ({ match, history }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const getUserData = useSelector((state) => state.userDataByID);
  const { userData, loading, success,error:getUserDataError } = getUserData;
  const updateUserData = useSelector((state) => state.updateUserByID);
  const { message, error: DBerror } = updateUserData;

  const [error, setError] = useState();
  const [name, setName] = useState("");
  const [last_name, setLastName] = useState("");
  const [company_name, setCompanyName] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  //populate the field with the user data
  useEffect(() => {
    if (success && userData) {
      setName(userData.name);
      setLastName(userData.last_name);
      setCompanyName(userData.company_name);
      if (userData.phone_number === "noPhoneNumber") {
        setPhoneNumber("");
      } else {
        setPhoneNumber(userData.phone_number);
      }
      setEmail(userData.email);
    }
  }, [success, userData]);

  useEffect(() => {
    if (!userInfo) {
      history.push("/");
    } else {
      dispatch(getUserDataByID(match.params.id));
    }
  }, [history, userInfo, dispatch,match]);

  //Validate Name
  const handleNameChange = (e) => {
    const newValue = e.target.value;
    if (/^[^0-9]*$/.test(newValue)) {
      // Only set the name state if the input is valid (no numbers)
      setName(newValue);
      setError();
    } else {
      setError("You cant type numbers to Name Field");
    }
  };
  //Validate Last Name
  const handleLastNameChange = (e) => {
    const newValue = e.target.value;
    if (/^[^0-9]*$/.test(newValue)) {
      // Only set the last name state if the input is valid (no numbers)
      setLastName(newValue);
      setError();
    } else {
      setError("You cant type numbers to Last Name Field");
    }
  };
  //Validate Phone Number
  const handlePhoneNumber = (e) => {
    const newValue = e.target.value;
    if (/^[0-9]*$/.test(newValue) && newValue.length <= 15) {
      // Only set the name state if the input is valid (only numbers) and no more then 15 numbers
      setPhoneNumber(newValue);
      setError();
    } else {
      setError(
        "Phone number should be only numbers and no more then 15 numbers"
      );
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const userID = userData.id;
    dispatch(
      updateUserByID(
        userID,
        name,
        last_name,
        email,
        company_name,
        phone_number,
        password
      )
    );
  };

  return (
    <>
      <Header />
      <FormContainer>
        <h1>Edit User with ID {match.params.id}</h1>
        {error && <Message variant="danger">{error}</Message>}
        {getUserDataError && <Message variant="danger">{getUserDataError}</Message>}
        {DBerror && <Message variant="danger">{DBerror}</Message>}
        {message && <Message variant="success">{message}</Message>}
        {loading
          ? "Loading"
          : success && (
              <Form onSubmit={submitHandler}>
                <Form.Group controlId="name">
                  <Form.Label>Fisrt Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter first name"
                    value={name}
                    onChange={(e) => handleNameChange(e)}
                    required
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId="last_name">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter last name"
                    value={last_name}
                    onChange={(e) => handleLastNameChange(e)}
                    required
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId="company_name">
                  <Form.Label>Company Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter company name"
                    value={company_name}
                    onChange={(e) => setCompanyName(e.target.value)}
                    defaultValue="noCompany"
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId="phone_number">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter phone number"
                    value={phone_number}
                    onChange={(e) => handlePhoneNumber(e)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    aria-required
                  ></Form.Control>
                </Form.Group>

                <Button type="submit" variant="primary">
                  Update
                </Button>
              </Form>
            )}
      </FormContainer>
    </>
  );
};

export default EditUserScreen;
