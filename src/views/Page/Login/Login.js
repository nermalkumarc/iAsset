import React, { Component } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import Cookies from 'universal-cookie';
import SweetAlert from 'react-bootstrap-sweetalert';

import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

class Login extends Component {

  constructor(props) {

    super(props)
    this.state = {
      show1: null,
      Code: "",
      Password: "",
    }

    this.onKeypress = this.onKeypress.bind(this);
    this.getChangeHandler = this.getChangeHandler.bind(this);
  }

  componentWillMount() {
    this.validator = new SimpleReactValidator();
  }

  getChangeHandler(event) {
    event.target.name == 'code' ? this.setState({ Code: event.target.value }) : this.setState({ Password: event.target.value });
  }
  hideAlert() {
    this.setState({ show1: false })
  }


  onKeypress = (e) => {

    if (e.which === 13) {
      this.Login();
    }
  }

  Login = () => {
    console.log(`Code=${this.state.Code} Passwor=${this.state.Password}`)


    if (this.validator.allValid()) {

      var params = {
        Code: this.state.Code,
        Password: this.state.Password,
      }
      const options = {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
      }
      fetch("http://localhost:5000/login", options).then(res => {
        return res.json();
      })
        .then(data => {

          if (data.Data == "0") {
            this.setState({ show1: true })
          }
          else {
            const cookies = new Cookies();
            cookies.set('Employee Code', data.Data.Code, { path: '/' });
            cookies.set('Password', data.Data.Password, { path: '/' });
            cookies.set('User Name', data.Data.Name, { path: '/' });
            cookies.set('User Id', data.Data.ID, { path: '/' });
            //return <Redirect to='/'  />
            window.location.href = "/"
          }

        }).catch(err => {
          console.error('Request failed', err)
        });
      console.log("hello", JSON.stringify(params))
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }




  }

  render() {
    const { show1 } = this.state
    return (
      <div>
        <div>
          <SweetAlert
            show={show1}
            error
            title="Login Failed!"
            text="SweetAlert in React"
            onConfirm={this.hideAlert.bind(this)}>Employee Code or Passwor is incorrect</SweetAlert>
        </div>
        <div className="app flex-row align-items-center">
          <Container>
            <Row className="justify-content-center">
              <Col md="5">
                <CardGroup>
                  <Card className="p-4">
                    <CardBody>
                      <Form onKeyPress={this.onKeypress}>
                        <h1>Login</h1>
                        <p className="text-muted">Sign In to your account</p>
                        <InputGroup className="mb-4">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-user"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          
                          <Input type="text" placeholder="Username" name="code" id="code" autoComplete="username" onChange={this.getChangeHandler} />
                        </InputGroup>
                        <InputGroup>
                            <div className="text-danger">{this.validator.message('Code', this.state.Code, 'required')}</div>
                        </InputGroup>
                        <InputGroup className="mb-4">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-lock"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input type="password" placeholder="Password" name="password" id="password" autoComplete="current-password" onKeyPress={this.onKeypress} onChange={this.getChangeHandler} />
                            <div className="text-danger">{this.validator.message('Password', this.state.Password, 'required')}</div>
                        </InputGroup>

                      </Form>
                      <Row>
                        <Col xs="6">
                          <Button color="primary" className="px-4" onClick={this.Login}>Login</Button>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </CardGroup>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

export default Login;
