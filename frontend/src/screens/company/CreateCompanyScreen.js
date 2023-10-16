import axios from "axios";
import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import FormContainer from "../../components/FormContainer";
import Header from "../../components/Header";

const CreateCompanyScreen = ({ history }) => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [name, setName] = useState("");
  const [logo_url, setLogoUrl] = useState("");
  const [website, setWebsite] = useState("");
  const [email, setEmail] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const allowedExtensions = ["jpg", "jpeg", "png"];

      const fileExtension = file.name.split(".").pop().toLowerCase();

      if (allowedExtensions.indexOf(fileExtension) === -1) {
        setError("File not accepted. Please choose a jpg, jpeg, or png file.");
      } else {
        setError("");
        setLogoUrl(file);
      }
    }
  };

  useEffect(() => {
    if (success) {
      setName("");
      setEmail("");
      setLogoUrl("");
      setWebsite("");
      setError("");
    }
  }, [history, success]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("website", website);
      formData.append("logo_url", logo_url);
      const config = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        "http://localhost:8000/api/company",
        formData,
        config
      );
      setSuccess(true);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <>
      <Header />
      <FormContainer>
        <h1>Create New Company</h1>
        {error && <Message variant="danger">{error}</Message>}
        {success && (
          <Message variant="success">{"Company created successfully"}</Message>
        )}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Company Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter first name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Company Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="logo_url">
            <Form.Label>Company Logo</Form.Label>
            <Form.Control
              type="file"
              accept=".jpg, .jpeg, .png" // Define the accepted file types (optional)
              onChange={(e) => handleFileChange(e)}
            />
          </Form.Group>
          <Form.Group controlId="website">
            <Form.Label>Company website</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter company website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary">
            Create Company
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default CreateCompanyScreen;
