import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// import Button from "react-bootstrap/Button";
import Button from "@mui/material/Button";

import { FaHeart } from "react-icons/fa";

import "./home-banner.css";
import { useNavigate } from "react-router-dom";

import { useContext } from "react";

import { AuthContext } from "../../../../context/AuthContext";
import { LoginModalContext } from "../../../../context/LoginModalContext";

const HomeBanner = () => {
  const navigate = useNavigate();

  const { authToken } = useContext(AuthContext);
  const { setModalShow } = useContext(LoginModalContext);

  const redirectSearch = () => {
    navigate("/search");
  };

  // useEffect(() => {
  //   setProfileState();
  // }, []);

  return (
    <div>
      <Row className="home-banner-container">
        <Col
          xs={{ span: 1, order: 2 }}
          sm={{ span: 2, order: 2 }}
          md={{ span: 1, order: 1 }}
        ></Col>
        <Col
          sm={{ span: 12, order: 1 }}
          md={{ span: 6, order: 2 }}
          className="text-center banner-image"
        >
          <img
            className="banner-image"
            src="https://pet-adoption-project.s3.eu-west-2.amazonaws.com/New+Staff+Headshots+(6).png"
            alt="img of pug in pink circle"
          />
        </Col>
        <Col
          xs={{ span: 10, order: 2 }}
          sm={{ span: 8, order: 2 }}
          md={{ span: 4, order: 1 }}
          className="home-banner align-items-center mb-5"
        >
          <Row className="text-left mt-md-5 ">
            <p className="sub-header-banner">
              {" "}
              Do you love me? <FaHeart size={18} />
            </p>
            <h1 className="banner-header">Let's help find a pet for you</h1>
            {authToken ? (
              <Button
                className="home-banner get-started-btn"
                variant="outlined"
                color="primary"
                onClick={redirectSearch}
              >
                Find a Pet{" "}
              </Button>
            ) : (
              <Button
                className="home-banner get-started-btn"
                variant="outlined"
                color="primary"
                onClick={() => {
                  setModalShow(true);
                }}
              >
                Get Started
              </Button>
            )}
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default HomeBanner;
