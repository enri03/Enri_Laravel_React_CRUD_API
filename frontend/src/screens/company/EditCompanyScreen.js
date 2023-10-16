import axios from "axios";
import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import FormContainer from "../../components/FormContainer";
import Header from "../../components/Header";
import { getCompanyDataByID } from "../../actions/companyAction";

const EditCompanyScreen = ({ history, match }) => {
  const [error, setError] = useState("");
  const [updatedSuccess, setUpdatedSuccess] = useState("");
  const [name, setName] = useState("");
  const [logo_url, setLogoUrl] = useState();
  const [website, setWebsite] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const GET_companyDataByID = useSelector((state) => state.companyDataByID);
  const {
    companyData,
    success: getCompanyDataByIDSuccess,
    error: getCompanyDataByIDError,
    loading
  } = GET_companyDataByID;

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
    if (getCompanyDataByIDSuccess) {
      setName(companyData.name);
      setEmail(companyData.email);
      setWebsite(companyData.website);
    }
  }, [history, getCompanyDataByIDSuccess, companyData]);

  useEffect(() => {
    dispatch(getCompanyDataByID(match.params.id));
  }, [history, dispatch]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const companyID = match.params.id;
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("website", website);
      formData.append("logo_url", logo_url);
      formData.append("_method", "put"); // since laravel has issue handling axios.put method must be set here

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          enctype: "multipart/form-data",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.post(
        `http://localhost:8000/api/company/${companyID}`,
        formData,
        config
      );
      if (data) {
        dispatch(getCompanyDataByID(companyID));
        setUpdatedSuccess(data.message);
        setError("");
      }
    } catch (error) {
      setError(error.response.data.message);
      setUpdatedSuccess();
    }
  };

  return (
    <>
      <Header />
      <FormContainer>
        <h1>Edit Company with ID {match.params.id}</h1>
        {error && <Message variant="danger">{error}</Message>}
        {getCompanyDataByIDError && (
          <Message variant="danger">{getCompanyDataByIDError}</Message>
        )}
        {updatedSuccess && (
          <Message variant="success">{updatedSuccess}</Message>
        )}
        {loading?'Loading...':getCompanyDataByIDSuccess && (
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
              Update Company
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default EditCompanyScreen;
