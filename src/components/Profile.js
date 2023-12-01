import React, { useState, useEffect } from "react";
import { Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { Card, Col, Row, OverlayTrigger, Tooltip } from 'react-bootstrap';
import QRCode from "qrcode.react";

const Profile = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const [showAlert, setShowAlert] = useState(false);

  const handleEditClick = () => {
    setShowAlert(true);
    // Add logic if needed
  };

  useEffect(() => {
    const alertTimeout = setTimeout(() => {
      setShowAlert(false);
    }, 3000);
    return () => clearTimeout(alertTimeout);
  }, [showAlert]);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  const welcomeMessage = `Welcome, ${currentUser.username}!`;
  const roleDescription = `is a user with the role ${currentUser.roles.join(', ')}.`;
  const companyInfo = "Part of PT CMWI, with a spirit of improvement and teamwork aiming to achieve online systems and automation in the next 5 years.";
  const qrCodeData = `${currentUser.email}`;

  return (
    <div className="container">
      <br></br><br></br><br></br>
      <h3>{welcomeMessage}</h3>
      {showAlert && (
        <div className="alert alert-danger mt-3">
          Sorry, you don't have eligible access to edit your own profile information!
        </div>
      )}
      <Row className="mt-4">
        <Col md={4}>
          <Card >
            {/* style={{width: "250px" , height:"400px"}} */}
            <div className="text-center">
              <Card.Img variant="top" src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=626&ext=jpg&ga=GA1.1.1242796199.1701185293&semt=ais" 
                alt="User Avatar" style={{width:"150px"}}/>
            </div>
            <Card.Body>
              <Card.Title>{currentUser.username}</Card.Title>
              <div className="text-center">
                <QRCode value={qrCodeData} style={{width:"50px", height:"50px"}}/>
              </div>
              <Card.Text>Email: {currentUser.email}</Card.Text>
              <Card.Text>{roleDescription}</Card.Text>
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip id="tooltip-edit">Sorry, you don't have eligible access to edit your own profile information!</Tooltip>}
              >
                <button className="btn btn-primary" onClick={handleEditClick}>
                  Edit
                </button>
              </OverlayTrigger>
            </Card.Body>
          </Card>
        </Col>

        <Col md={8}>
          <Card>
            <Card.Body>
              <Card.Text>{companyInfo}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

    </div>
  );
};

export default Profile;
