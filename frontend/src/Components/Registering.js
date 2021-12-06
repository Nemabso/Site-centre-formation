import React, { useState, useRef, useEffect } from "react";
import "../Styles/Registering.css";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useHistory } from "react-router-dom";
// import backgroundImage from "../assets/background.jpeg";
// import Image from "react-bootstrap/Image";
import logo from "../assets/logoSite.jpeg";
import { BsGeoAlt, BsFillEnvelopeFill } from "react-icons/bs";
import { FiPhoneCall } from "react-icons/fi";
// import { Alert } from 'react-alert'

import { connect } from "react-redux";
import { signup, setisauth } from "../Actions/signupActions";


function Registering(props) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const didMountRef = useRef(false);

  useEffect(() => {
    if (didMountRef.current) {
      props.setisauth();
      // if signup success, go to login screen
      if (props.isAuth) {
        alert("Votre inscription s'est réalisée avec succès ! ");
        history.push('/espace-formateur')
        //props.navigation.navigate("LogIn");

        props.setisauth();
      } else if (!props.isAuth && !props.isLoading) {
        alert(props.errMsg);
      }
    } else {
      didMountRef.current = true;
    }
  }, [props.isAuth, props.isLoading]);

  function signupHandler() {

    console.log(email);
    const signupData = {
      name: name,
      email: email,
      password: password,
    };

    props.signup(signupData);
    console.log(signupData);

  }


  return (
    <div >

      <Container className="center0">
        <Container>
          <p class="clientSpace">ESPACE FORMATEUR</p>
        </Container>

        <Container>
          <Row>
            <Col xs={12} sm={2} md={3} >

            </Col>
            <Col sm={8} md={6}>
              <div class="loginDiv">
                <p class="alreadyReg">JE CRÉE MON COMPTE</p>
                <p class="above">NOM ET PRÉNOM *</p>
                <input class="inputAccount"
                  placeholder="Renseignez votre nom et prénom"
                  onChange={e => setName(e.target.value)} />

                <p class="above">ADRESSE EMAIL *</p>
                <input class="inputAccount"
                  placeholder="Renseignez votre email"
                  onChange={e => setEmail(e.target.value)} />

                <p class="above">MOT DE PASSE *</p>
                <input class="inputAccount"
                  placeholder="Saisissez votre mot de passe"
                  secureTextEntry={true}
                  onChange={e => setPassword(e.target.value)}
                  type="password"
                />


                <a href="###" onClick={() => signupHandler()}>
                  <div class="logIn" >M'INSCRIRE</div></a>
                <a href="/espace-formateur" >
                  <div class="logIn" >M'IDENTIFIER</div></a>

              </div>
            </Col>
            <Col sm={2} md={3}>

            </Col>

          </Row>

        </Container>

      </Container>
      <Container className="cont4">
        <Row className="cont41">
          <Col xs={12} sm={6} md={3} >
            <div class="col4">
              <img src={logo} class="logo"></img>

            </div>
          </Col>
          <Col sm={6} md={3} >
            <div class="col4">
              <p class="contactUs">Nous contacter :</p>
              <Row className="rowIcons">
                <Col sm={4} xs={4}>
                  <BsGeoAlt class="icon" />
                </Col>
                <Col sm={4} xs={4}  >
                  <FiPhoneCall class="icon" />
                </Col>
                <Col sm={4} xs={4} >
                  <BsFillEnvelopeFill class="icon" />
                </Col>
              </Row>

            </div>
          </Col>
          <Col sm={6} md={3}>
            <div class="col4">
              <p class="legal">Mentions légales</p>
              <p class="condition">Confidentialité</p>
              <p class="condition">Conditions Générales</p>

            </div>
          </Col>
          <Col sm={6} md={3}>
            <div class="col4">
              <p class="legal">Qui sommes nous ?</p>
              <p class="condition">Blog</p>
              <p class="condition">Former et recruter</p>

            </div>
          </Col>
        </Row>
      </Container>

    </div >
  );

}
const mapStateToProps = (state) => {
  return {
    // only map needed states here
    isLoading: state.signupReducer.isLoading,
    isAuth: state.signupReducer.isAuth,
    errMsg: state.signupReducer.errMsg,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    // only map needed dispatches here
    signup: (signupData) => dispatch(signup(signupData)),
    setisauth: () => dispatch(setisauth()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Registering);
