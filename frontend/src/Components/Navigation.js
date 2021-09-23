import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../assets/logo2.svg";
import "../Styles/Navigation.css";
const Navigation = () => {
  return (
    <>
      <Navbar
        className="cont"
        collapseOnSelect
        expand="lg"
        
        className="customNav" fixed="top" variant="light" 
      >
        <Container class="cont"  >
          <Navbar.Brand href="/">
            <div class="emptyBrand"></div>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav"/>
          <Navbar.Collapse
           id="basic-navbar-nav"
           className=" justify-content-center"
          >
            <div class="itemCover1"> 
            <Nav className=" justify-content-center">
              <div class="itemCover"> 
              <Nav.Link href="/" >
                <div className="item">Qui sommes nous</div>
              </Nav.Link>
              </div>
              <div class="itemCover"> 
              <Nav.Link href="/">
                <div className="item">Nos formations</div>
              </Nav.Link>
              </div>
              <div class="itemCover">
              <Nav.Link href="/">           
                <div className="item">Blog</div>
              </Nav.Link>
              </div>
              <div class="itemCover">
              <Nav.Link href="/">
                <div className="item">Nous contacter</div>
              </Nav.Link>
           
            </div>
            <div class="itemCover">
           
              <Nav.Link href="/espace-formateur">
                <div className="item">Espace formateur</div>
              </Nav.Link>
            
            </div>
            </Nav>
           
            </div>
          </Navbar.Collapse>
          
        </Container>
      </Navbar>
    </>
  );
};

export default Navigation;
