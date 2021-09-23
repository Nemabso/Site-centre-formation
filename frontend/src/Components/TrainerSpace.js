import React, { useState, useRef, useEffect } from "react";
import "../Styles/TrainerSpace.css";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import backgroundImage from "../assets/background.jpeg";
import Image from "react-bootstrap/Image";
import logo from "../assets/logoSite.jpeg"
import { connect } from "react-redux";
import { BsGeoAlt, BsFillEnvelopeFill } from "react-icons/bs";
import { FiPhoneCall } from "react-icons/fi";
import axios from "axios";
import { baseURL } from "../constants";
import Listformations from "./Listformations"
import { login, setisauth, setisadmin, setlistvalue, setcurrenttrainer } from "../Actions/loginActions";
import { setvalueauth } from "../Actions/loginActions";

function TrainerSpace(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userDetails, setUserDetails] = useState({});
  const [name, setName] = useState("");
  const [formations, setFormations] = useState([]);
  const [users, setUsers] = useState([]);
  const [currentFormation, setCurrentFormation] = useState({});
  const [formationname, setFormationName] = useState("");
  const [isChoosed, setIsChoosed] = useState(0);





  const didMountRef = useRef(false);
  useEffect(() => {
    console.log(props.listvalue);
    props.setlistvalue(0);

    if (props.admin) {

      getUsers();
      fetchUserDetails();

    } else {
      fetchUserDetails();

    }

    if (didMountRef.current) {

      // if login success, go to home screen
      if (props.isAuth) {
        //props.setisauth();
        //alert("Is Done")
        //props.setvalueauth(1);
        if (props.admin) {
          forceUpdate();
          getUsers();
          fetchUserDetails();

        }
        else {
          forceUpdate();
          fetchUserDetails();
        }

      } else if (!props.isAuth && !props.isLoading) {
        alert(props.errMsg);
      }
    } else {
      didMountRef.current = true;
    }
  }, [props.isAuth, props.isLoading]);
  const forceUpdate = React.useReducer(bool => !bool)[1];

  function getUsers() {
    axios({
      method: "post",
      url: "/getUsers",
      baseURL: baseURL,


    })
      .then((res) => {

        setUsers(res.data.results);



      })
      .catch((err) => console.log(err));
  }
  function fetchUserDetails() {
    axios({
      method: "post",
      url: "/getUserDetails",
      baseURL: baseURL,
      data: {
        userid: props.userId,
      },

    })
      .then((res) => {
        setUserDetails(res.data.results[0]);
        setName(res.data.results[0].name);
        setFormations(res.data.results[0].formations)


      })
      .catch((err) => console.log(err));
  }

  function loginHandler() {
    const loginData = {
      email: email,
      password: password,
    };
    // calling login() dispatch function
    props.login(loginData);
  };
  const listFormations = () => {
    if (isChoosed === 0) {
      if (formations.length === 0) {
        return (
          <div class="formationTitle">AUCUNE FORMATION</div>
        )
      }
      else {


        return (
          formations.map((item) => (
            <div class="formDiv0"  >
              <a href="###" onClick={() => { setIsChoosed(1); setCurrentFormation(item) }}  >
                <div class="formDiv" ><p class="formName" >{item.formationName.toUpperCase()}</p>
                </div>


              </a>
            </div>
          ))
        );
      }
    }
    else {
      return (
        <div>
          
    

            <Container>
              <Row>
                <Col xs={12} sm={2} md={3} >

                </Col>
                <Col sm={8} md={6}>
                  <p class="formationTitle">DÉTAILS DE LA FORMATION</p>
                  <p class="detail"> NOM: {currentFormation.formationName.toUpperCase()}</p>
                  <p class="detail"> DESCRIPTION: {currentFormation.description}</p>
                  <div class="column2">
                    <div
                      class="video"
                      style={{
                        position: "relative",
                        paddingBottom: "56.25%" /* 16:9 */,
                        paddingTop: 35,

                        height: 0,
                      }}
                    >
                      <iframe
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                        }}
                        src={currentFormation.link}
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen
                      ></iframe>
                    </div>
                  </div>

                  <p class="detail"> LIEN: <a href={currentFormation.link}>{currentFormation.link}</a></p>

                </Col>
                <Col sm={2} md={3}>

                </Col>

              </Row>

            </Container>
          

        </div>
      )
    }

  }


  const listUsers = users.map((item) => (

    <div class="formDiv0"  >

      <div class="formDiv1" >
        <Container className="Roww" >
          <Row >
            <Col sm={7} xs={6} md={6} >
              <p class="formName" >{item.name}</p>
            </Col>
            <Col sm={5} xs={6} md={6} className="colList">
              <a href="###" onClick={() => {
                console.log(item);
                setcurrenttrainer(item._id);
                props.setlistvalue(item._id);

              }} > <p class="list">Liste des formations</p> </a>
            </Col>
          </Row>
        </Container>

      </div>



    </div>
  ))

  const renderScreen = () => {
    if (props.isAuth) {
      if (props.admin) {

        if (props.listvalue !== 0) {
          return (
            <div>
              <Listformations />
            </div>
          )

        }
        else {
          return (
            <div>


              <Container className="center0">
                <Container>
                  <Row>
                    <Col xs={12} sm={6} md={4}>
                      <div ><p class="clientSpace">ESPACE FORMATEUR</p></div>
                    </Col>
                    <Col sm={6} md={4}>
                      <div class="Name">NOM ET PRÉNOM : ADMIN</div>
                    </Col>
                    <Col md={4} className="colll1"  >
                      <div>
                        <div class="addDiv1">
                          <a href="###" onClick={() => props.setisauth()} ><p class="add1">Se déconnecter</p></a>
                        </div>
                      </div>
                    </Col>

                  </Row>


                </Container>
                <Container>
                  <Row>
                    <Col >
                      <p class="formationList">LISTE D'UTILISATEURS </p>
                    </Col>

                  </Row>


                </Container>



                <div>{listUsers}</div>
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



            </div>

          )
        }
      }
      else {
        return (
          <div>
            <Container className="center0">
              <Container>
                <Row>
                  <Col sm={6}>
                    <div ><p class="clientSpace">ESPACE FORMATEUR</p></div>
                  </Col>
                  <Col sm={6}>
                    <div class="Name">NOM ET PRÉNOM : {name}</div>
                  </Col>

                </Row>


              </Container>


              <Container>
                <Row>
                  <Col xs={12} sm={6} md={6}>
                    <p class="formationList"><a href="###" onClick={() => setIsChoosed(0)}>LISTE DES FORMATIONS </a></p>
                  </Col>
                  <Col sm={6} md={6} className="colll1" >
                    <div>
                      <div class="addDiv1">
                        <a href="###" onClick={() => props.setisauth()} ><p class="add1">Se déconnecter</p></a>
                      </div>
                    </div>
                  </Col>

                </Row>


              </Container>

              <div>{listFormations()}</div>
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




          </div>

        );
      }
    }
    else {
      return (
        <div >

          <Container className="center0">
            <Container>
              <p class="clientSpace">ESPACE FORMATEUR</p>
            </Container>

            <Container>
              <Row>
                <Col sm={12} xs={12} md={6} >
                  <div class="loginDiv">
                    <p class="already">DÉJÀ FORMATEUR ?</p>
                    <p class="above">ADRESSE EMAIL *</p>
                    <input class="inputAccount"
                      placeholder="Renseignez votre email"
                      onChange={e => setEmail(e.target.value)} />
                    <p class="above">MOT DE PASSE *</p>

                    <input class="inputAccount"
                      placeholder="Saisissez votre mot de passe"
                      secureTextEntry={true}
                      onChange={e => setPassword(e.target.value)}
                      type="password" />

                    <p class="passForg" >Mot de passe oublié ?</p>
                    <a href="###" onClick={() => loginHandler()}>
                      <div class="logIn1" >M'IDENTIFIER</div></a>
                  </div>
                </Col>
                <Col md={6}>
                  <div class="loginDiv" >
                    <p class="already">NOUVEAU FORMATEUR</p>
                    <a href="/inscription" >
                      <div class="logIn2" >CRÉER UN COMPTE</div></a>
                  </div>
                </Col>
              </Row>

            </Container>

          </Container>
          <div class="divEnd">
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
          </div>
        </div>







      )
    }
  }

  return (

    <div>{renderScreen()}</div>

  );

}
const mapStateToProps = (state) => {
  return {
    // only map needed states here
    isLoading: state.loginReducer.isLoading,
    isAuth: state.loginReducer.isAuth,
    errMsg: state.loginReducer.errMsg,
    valueAuth: state.loginReducer.errMsg,
    userId: state.loginReducer.userId,
    admin: state.loginReducer.admin,
    listvalue: state.loginReducer.listvalue,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    // only map needed dispatches here
    login: (loginData) => dispatch(login(loginData)),
    setvalueauth: (value) => dispatch(setvalueauth(value)),
    setisauth: () => dispatch(setisauth()),
    setisadmin: () => dispatch(setisadmin()),
    setlistvalue: (value) => dispatch(setlistvalue(value)),
    setcurrenttrainer: (data) => dispatch(setcurrenttrainer(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TrainerSpace);
