import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";
import EventBus from "../common/EventBus";

const BoardUser = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getUserBoard().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  }, []);

  return (
      
       <div className="container mt-5"><br></br>
        <h1 className="mb-4">CMWI Shipping Instruction Board</h1>
  
        <div className="row">
          <div className="col-md-6">
            <h2>Container Booking</h2>
            <p>
              Shipping Instruction (SI) is a document that provides instructions to the shipping or freight company about the shipment of your goods. In the context of CMWI, SI is used for Container booking. It includes details such as SI No, Shipment Date, Batch, Container Quantity, and Destination.
            </p>
            <img src="https://img.freepik.com/free-photo/industrial-port-container-yard_1112-1202.jpg?size=626&ext=jpg&ga=GA1.1.1242796199.1701185293&semt=sph" alt="Container Image 1" className="img-fluid mb-3" />
          </div>
  
          <div className="col-md-6">
            <h2>Vessel Scheduling</h2>
            <p>
              Vessel scheduling involves planning and organizing the shipment of goods on vessels. CMWI uses this process to efficiently transport alloy wheels produced at their factory. The schedule includes information about vessel routes, departure, and arrival times.
              
            </p><br></br>
            <img src="https://img.freepik.com/free-photo/aerial-view-container-cargo-ship-sea_335224-720.jpg?size=626&ext=jpg&ga=GA1.1.1242796199.1701185293&semt=sph" alt="Vessel Image 2" className="img-fluid" />
          </div>
        </div>
      </div>
    );
  };
  

export default BoardUser;
