
import React from "react";

// reactstrap components
import { Button, Container, Row, Col } from "reactstrap";

class Hero extends React.Component {
  render() {
    return (
      <>
        <div className="position-relative">
          <section className="section section-hero section-shaped">
            <div className="shape shape-style-1 shape-primary">
              <span className="span-150" />
              <span className="span-150" />
              <span className="span-50" />
              <span className="span-75" />
              <span className="span-100" />
              <span className="span-75" />
              <span className="span-50" />
              <span className="span-100" />
              <span className="span-50" />
              <span className="span-100" />
            </div>
            <Container className="shape-container d-flex align-items-center py-lg">
              <div className="col px-0">
                <Row className="align-items-center justify-content-center">
                  <Col className="text-center" lg="6">
                    <img
                      alt="..."
                      className="img-fluid"
                      src={require("../../assets/img/brand/orgone-react-white.png")}
                      style={{ width: "300px" }}
                    />
                    
                    <p className="display-4 text-white mt-5">
                      Earn 7% daily! Stable returns for passive income.
                    </p>
                    <div className="btn-wrapper mt-3">
                      
                      <Button
                        className="btn-green btn-icon mb-3 mb-sm-0"
                        color="success"
                        size="lg">
                        <span className="btn-inner--text">Invest now!</span>
                      </Button>{" "}
                      
                    </div>
                    <div className="mt-5">
                      <small className="text-white font-weight-bold mb-0 mr-2">
                        Long-lasting ROI contract aiming to pay participants indefinitely.
                        Deposit BUSD stablecoins and get paid as the contract grows in value.
                      </small>

                    </div>
                  </Col>
                </Row>
              </div>
            </Container>
            {/* SVG separator */}
            <div className="separator separator-bottom separator-skew zindex-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
              >
                <polygon
                  className="fill-white"
                  points="2560 0 2560 100 0 100"
                />
              </svg>
            </div>
          </section>
        </div>
      </>
    );
  }
}

export default Hero;
