import React, { useEffect, useState } from "react";
import { Carousel, Container, Row, Col } from "react-bootstrap";
import UserService from "../services/user.service";

const Home = () => {
  const [content, setContent] = useState("");
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % totalItems);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  const totalItems = 6;/* total number of carousel items */;

  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.status ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);
  const carouselImages = [
    "https://img.freepik.com/free-vector/round-seaport-isometric-background-with-two-logistic-ship-blue-fond-big-headline-shipping-illustration_1284-31368.jpg?size=626&ext=jpg&ga=GA1.1.1242796199.1701185293&semt=sph",
    "https://img.freepik.com/free-photo/aerial-view-container-cargo-ship-sea_335224-719.jpg?size=626&ext=jpg&ga=GA1.1.1242796199.1701185293&semt=sph",
    "https://img.freepik.com/free-vector/seaport-isometric-flowchart-with-ocean-liner-port-worker-boom-crane-lighthouse-container-ship-tugboat-tanker-other-descriptions-illustration_1284-31365.jpg?size=626&ext=jpg&ga=GA1.1.1242796199.1701185293&semt=sph",
    "https://img.freepik.com/free-photo/aerial-view-container-cargo-ship-sea_335224-722.jpg?size=626&ext=jpg&ga=GA1.1.1242796199.1701185293&semt=sph",
    "https://img.freepik.com/free-vector/ships-boats-vessels-isometric-icon-set_1284-16877.jpg?size=626&ext=jpg&ga=GA1.1.1242796199.1701185293&semt=sph",
    "https://img.freepik.com/premium-photo/container-ship-sea-import-export-transport_9949-175.jpg?size=626&ext=jpg&ga=GA1.1.1242796199.1701185293&semt=sph"
  ];
  return (
    <div className="home-container">
      <div className="gradient-background">
        <Container><br></br><br></br>
          <Row>
            <Col>
              <Carousel
                activeIndex={index}
                onSelect={handleSelect}
                interval={null} // Set to null to disable automatic sliding
                controls={false} // Hide the default carousel controls
              >
               {carouselImages.map((image, index) => (
                    <Carousel.Item key={index}>
                      <img className="d-block w-100" src={image} alt={`Slide ${index + 1}`} 
                      style={{ width: "500px", height: "500px", objectFit: "contain"}} />
                    </Carousel.Item>
                  ))}
              </Carousel>
              <marquee behavior="scroll" direction="left" >
                <h1 style={{fontSize: "100px"}}>
                {content}
                </h1>
              </marquee>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Home;
