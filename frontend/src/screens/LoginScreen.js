import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { login } from "../actions/userActions";
import { Link } from "react-router-dom";

const LoginScreen = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { error, userInfo } = userLogin;
  const userRegister = useSelector((state) => state.userRegister);
  const { error: DBerror, success, message, userData } = userRegister;
  useEffect(() => {
    if (userInfo) {
      history.push("/home");
    } else if (success) {
      setEmail(userData.email);
    }
  }, [history, userInfo, success, userData]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <FormContainer>
      <h1>Client Login</h1>
      {error && <Message variant="danger">{error}</Message>}
      {DBerror && <Message variant="danger">{DBerror}</Message>}
      {success && <Message variant="success">{message}</Message>}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary">
          Login
        </Button>
        <Link to="/register" className="float-end">
          Click here to Register
        </Link>
      </Form>
    </FormContainer>
  );
};

export default LoginScreen;
