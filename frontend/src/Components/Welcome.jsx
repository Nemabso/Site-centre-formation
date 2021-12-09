import React, { Component } from "react";
import "../Styles/Welcome.css";

import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
// import { Link } from "react-router-dom";
// import backgroundImage from "../assets/formation1.jpeg";
import formation2 from "../assets/formation2.jpeg";
import formation3 from "../assets/formation3.jpeg";
import formation4 from "../assets/formation4.jpeg";
import logo from "../assets/logoSite.jpeg"
// import Image from "react-bootstrap/Image";
import { BsGeoAlt, BsFillEnvelopeFill } from "react-icons/bs";
import { FiPhoneCall } from "react-icons/fi";

export default class Welcome extends Component {
  render() {
    return (
      <div >
        <div className="sect1">
          <Container>
            <Row>
              <Col sm={6} className="col11" >
                <div class="column2">
                  <div
                    className="video"
                    style={{
                      position: "relative",
                      paddingBottom: "56.25%" /* 16:9 */,
                      paddingTop: 35,
                      height: 0
                    }}
                  >
                    <iframe
                      style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", }}
                      src="https://www.youtube.com/embed/BOwd8nsDh5Y"
                      title="YouTube video player"
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowfullscreen
                    ></iframe>
                  </div>
                </div>

              </Col>

              <Col sm={6}>
                <div className="col12">
                  <p className="title12">
                    Une offre de formation 100% sur mesure
                  </p>
                  <p className="secondtitle12">Vous êtes intéressé par la restauration ?
                  </p>
                  <p className="secondtitle12">
                    EUREKA vous accompagne et vous conseille dans vos projets de formation.
                  </p>
                  <a href="###"> <div class="knowMore">En savoir plus</div></a>
                </div>
              </Col>
            </Row>
          </Container>

        </div>


        <Container className="cont2">
          <Row>
            <Col sm={12}>
              <div className="cont21">
                <p className="actor">VOUS ÊTES ACTEUR DE LA RESTAURATION ET DU COMMERCE ?</p>
                <p className="actorEnd">VOUS SOUHAITEZ FORMER ET RECRUTER VOTRE PERSONNEL ? </p>
                <p className="solution">EUREKA ! Votre solution est là !</p>
                <p className="solution">- Nous élaborons des formations sur mesure assurées par des professionnels.</p>
                <p className="solution">- Nous recrutons vos futurs collaborateurs</p>
                <p className="solutionEnd">- Nous vous accompagnons dans le cadre d'une formation financée à 100%</p>
              </div>
            </Col>
          </Row>

        </Container>



        <Container className="cont3">
          <Row className="cont31">
            <Col md={4}>
              <div class="formationItem">
                <img src={formation2} className="imgFormation" alt="formation2" ></img>
                <p className="formTitle">FORMATION 1</p>
                <p className="formationText">
                  {" "}
                  Dans un contexte économique complexe marqué par l’arrivée de
                  nouvelles générations, par l’impact des nouvelles
                  technologies de communication, par la nécessité de revoir
                  les organisations de travaiL.
                </p>

              </div>
            </Col>
            <Col sm={6} md={4} >
              <div className="formationItem">
                <img src={formation3} className="imgFormation" alt="formation3" ></img>
                <p className="formTitle">FORMATION 2</p>
                <p className="formationText">
                  Dans un contexte économique complexe marqué par l’arrivée de
                  nouvelles générations, par l’impact des nouvelles
                  technologies de communication, par la nécessité de revoir
                  les organisations de travaiL.
                </p>

              </div>
            </Col>
            <Col sm={6} md={4} >
              <div className="formationItem">
                <img src={formation4} className="imgFormation" alt="formation4" ></img>
                <p className="formTitle">FORMATION 3</p>
                <p className="formationText">
                  Dans un contexte économique complexe marqué par l’arrivée de
                  nouvelles générations, par l’impact des nouvelles
                  technologies de communication, par la nécessité de revoir
                  les organisations de travaiL.
                </p>

              </div>
            </Col>
          </Row>
        </Container>

        <Container className="cont4">
          <Row className="cont41">
            <Col xs={12} sm={6} md={3} >
              <div className="col4">
                <img src={logo} className="logo" alt="logo"></img>

              </div>
            </Col>
            <Col sm={6} md={3} >
              <div className="col4">
                <p className="contactUs">Nous contacter :</p>
                <Row className="rowIcons">
                  <Col sm={4} xs={4}>
                    <BsGeoAlt class="icon" />
                  </Col>
                  <Col sm={4} xs={4}  >
                    <FiPhoneCall className="icon" />
                  </Col>
                  <Col sm={4} xs={4} >
                    <BsFillEnvelopeFill className="icon" />
                  </Col>
                </Row>

              </div>
            </Col>
            <Col sm={6} md={3}>
              <div className="col4">
                <p className="legal">Mentions légales</p>
                <p className="condition">Confidentialité</p>
                <p className="condition">Conditions Générales</p>

              </div>
            </Col>
            <Col sm={6} md={3}>
              <div className="col4">
                <p className="legal">Qui sommes nous ?</p>
                <p className="condition">Blog</p>
                <p className="condition">Former et recruter</p>

              </div>
            </Col>
          </Row>
        </Container>

      </div>
    );
  }
}
