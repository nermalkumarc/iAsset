import React, { Component } from 'react';
import Cookies from 'universal-cookie';
//import { Link } from 'react-router-dom';
import Password from '../../views/Page/Password/Password'
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  Button,
  Form,
  FormGroup,
  FormText,
  Input,
  Label,
  Col,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from 'reactstrap';
import PropTypes from 'prop-types';
import './Layout.css';
import { AppHeaderDropdown, AppSidebarToggler } from '@coreui/react';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Code: "",
      Name: "",
      modal: false,
      large: false,
      small: false,
      primary: false,
      success: false,
      warning: false,
      danger: false,
      info: false,
      collapse: true,
      fadeIn: true,
      timeout: 300
    }
    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);


  }

  componentWillMount() {
    var cookie = new Cookies();
    var empcode = cookie.get("Employee Code")

    this.setState({
      Code: empcode, Name: cookie.get('User Name')

    })
  }

  onLogout = () => {

    var cookies = new Cookies();
    cookies.remove('Employee Code', "", { path: '/' });
    cookies.remove('Password', "", { path: '/' });
    cookies.remove('User Name', "", { path: '/' });
    cookies.remove('User Id', "", { path: '/' });
    window.location.href = "/"

  }
  toggle() {
    this.setState({
      modal: !this.state.modal,
      collapse: !this.state.collapse
    });
  }
  toggleFade() {
    this.setState((prevState) => { return { fadeIn: !prevState } });
  }

  render() {

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppSidebarToggler className="d-md-down-none" display="lg" />
        <h2><b>i<i>Asset</i></b></h2>
        <Nav className="ml-auto" navbar>
          <AppHeaderDropdown direction="down">
            <DropdownToggle nav className='right-text'>
              <strong style={{ fontSize: '15px' }}><span>{this.state.Name}&nbsp;({this.state.Code})</span>&nbsp;<i className="fa fa-caret-down" aria-hidden="true"></i></strong>
            </DropdownToggle>
            <DropdownMenu right style={{ right: 'auto' }}>
              <DropdownItem header tag="div" className="text-center"><strong>Action</strong></DropdownItem>
              <DropdownItem onClick={this.toggle} className="mr-1"><i className="fa fa-unlock-alt"></i>Change password</DropdownItem>
              <DropdownItem onClick={this.onLogout}><i className="fa fa-sign-out"></i> Logout</DropdownItem>
            </DropdownMenu>
          </AppHeaderDropdown>
        </Nav>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Change Password</ModalHeader>
          <ModalBody>
            <Password />
          </ModalBody>

        </Modal>
      </React.Fragment>
    );
  }
}


DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
