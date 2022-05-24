import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Container } from "react-bootstrap";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Hello EC</Navbar.Brand>
        </Container>
      </Navbar>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
