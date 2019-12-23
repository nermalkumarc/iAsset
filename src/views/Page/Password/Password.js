import React, { Component } from 'react';
import './password.css';
import Cookies from 'universal-cookie';
import SimpleReactValidator from 'simple-react-validator';
import SweetAlert from 'react-bootstrap-sweetalert';
import { Popover, OverlayTrigger } from 'react-bootstrap';
var baseState;

class Password extends Component {

  constructor(props) {
    super(props)
    this.state = {
      show: null,
      show1: null,
      oldcookie: null,
      old: "",
      new: "",
      confirm: "",
      error: {
        olderror: "",
        newerror: "",
        confirmerror: ""
      },
      pswdstrength: {
        upper: <div className="text-danger"><span className="fa fa-times-circle text-danger  p-2"></span>Upper Case</div>,
        lower: <div className="text-danger"><span className="fa fa-times-circle text-danger  p-2"></span>Lower Case</div>,
        special: <div className="text-danger"><span className="fa fa-times-circle text-danger  p-2"></span>Number</div>,
        number: <div className="text-danger"><span className="fa fa-times-circle text-danger  p-2"></span>Special Character</div>,
        len: <div className="text-danger"><span className="fa fa-times-circle text-danger  p-2"></span>Length(8)</div>
      }

    }
    baseState = Object.assign({}, this.state);
    this.getChangeHandler = this.getChangeHandler.bind(this);
    this.getNewPswdChange = this.getNewPswdChange.bind(this);
    this.reSet = this.reSet.bind(this);

  }
  reSet = () => {

    document.getElementById("form").reset();
    this.setState({ error: { olderror: "", confirmerror: "" } })
    this.validator = new SimpleReactValidator();

  }
  /*Validator*/
  componentWillMount() {

    this.validator = new SimpleReactValidator();
  }

  /*SweetAlert Hide Function*/
  hideAlert() {
    this.setState({ show1: false })
  }
  /*Onchange Handler for Inputs*/

  getChangeHandler = (event) => {
    const cookies = new Cookies();
    var oldcookie = cookies.get('Password')

    if (event.target.id == "old") {
      this.setState({ old: event.target.value })
      this.setState({
        error: {
          olderror: event.target.value != oldcookie ? <div className="text-danger ">Incorrect Old Password</div> : "",
          confirmerror: this.state.error.confirmerror,
        }
      })
    }

    else if (event.target.id == "confirm") {
      this.setState({ confirm: event.target.value })
      this.setState({
        error: {
          olderror: this.state.error.olderror,
          confirmerror: event.target.value != this.state.new ? <div className="text-danger">this password does not match with new password</div> : ""
        }
      })
    }
  }
  /*Password Rule Checker*/
  getNewPswdChange = (event) => {
    this.setState({ new: event.target.value })
    var str = event.target.value;
    var upper_text = new RegExp('[A-Z]');
    var lower_text = new RegExp('[a-z]');
    var number_check = new RegExp('[0-9]');
    var special_char = new RegExp('[!/\'^�$%&*()}{@#~?><>,|=_+�-\]');
    this.setState({
      pswdstrength: {
        upper: str.match(upper_text) ? <div className="text-success"><span className="fa fa-check-circle text-success p-2"></span>Upper Case</div> : <div className="text-danger"><span className="fa fa-times-circle text-danger  p-2"></span>Upper Case</div>,
        lower: str.match(lower_text) ? <div className="text-success"><span className="fa fa-check-circle text-success p-2"></span>Lower Case</div> : <div className="text-danger"><span className="fa fa-times-circle text-danger  p-2"></span>Lower Case</div>,
        number: str.match(number_check) ? <div className="text-success"><span className="fa fa-check-circle text-success p-2"></span>Number</div> : <div className="text-danger"><span className="fa fa-times-circle text-danger  p-2"></span>Number</div>,
        len: str.length > 7 ? <div className="text-success"><span className="fa fa-check-circle text-success p-2"></span>Length(8)</div> : <div className="text-danger"><span className="fa fa-times-circle text-danger  p-2"></span>Length(8)</div>,
        special: str.match(special_char) ? <div className="text-success"><span className="fa fa-check-circle text-success p-2"></span>Special Character</div> : <div className="text-danger"><span className="fa fa-times-circle text-danger p-2"></span>Special Character</div>,
      }
    })
  }

  /*Password Updation Function*/

  submit = () => {

    var upper_text = new RegExp('[A-Z]');
    var lower_text = new RegExp('[a-z]');
    var number_check = new RegExp('[0-9]');
    var special_char = new RegExp('[!/\'^�$%&*()}{@#~?><>,|=_+�-\]');
    if (this.validator.allValid()) {
      var pswd = this.state.confirm;
      if (pswd.match(upper_text) && pswd.match(lower_text) && pswd.match(number_check) && pswd.match(special_char) && pswd.length > 7 && this.state.error.olderror == "" && this.state.error.confirmerror == "") {

        const cookies = new Cookies();
        const options = {
          method: 'put',
          headers: {
            'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
          },
          body: `data=${pswd}`
        }
        fetch("http://localhost:5000/changepassword/" + cookies.get('Employee Code') + "", options).then(function (response) {
          response.json()

        }).then((data) => {
          console.log(data)
          this.setState({ show: true })
        }).catch(err => {
          console.error('Request failed', err)
        })
      } else {
        this.setState({ show1: true })
      }

    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  }


  render() {
    //PopOver For Password Rule
    const popover = (
      <Popover id="popover-right" title="Password Rule">
        <ul className="pull-right">
          <li>{this.state.pswdstrength.upper}</li>
          <li>{this.state.pswdstrength.lower}</li>
          <li>{this.state.pswdstrength.number}</li>
          <li>{this.state.pswdstrength.len}</li>
          <li>{this.state.pswdstrength.special}</li>
        </ul>
      </Popover>
    );

    //sweetalert error
    const { show1 } = this.state
    //sweetalert success
    const { show } = this.state
    return (

      <div>

        {/* <Sweetalert ERROR /> */}
        <div>
          <SweetAlert
            show={show1}
            error
            title="Something went wrong"
            text="SweetAlert in React"
            onConfirm={this.hideAlert.bind(this)}>Please Check the Inputs
                </SweetAlert>
        </div>
        {/* <Sweetalert /> */}

        {/* <Sweetalert SUCCESS /> */}
        <div>
          <SweetAlert
            show={show}
            success
            title="SUCCESS"
            text="SweetAlert in React"
            onConfirm={() =>
              window.location.reload()
            }>Password changed Successfully
                </SweetAlert>
        </div>
        {/* <Sweetalert /> */}



        {/* Beginning of the form  */}


        <form id="form" className="form-horizontal row" >
          <div className="card-body ">

            <div className="col-md-8">
              <label className="pull-left">Old Password</label>

              <input id="old" name="old" type="password" placeholder="Old Password" maxLength="30" className="form-control  " onChange={this.getChangeHandler} />

              {/* VALIDATION */}
              <div className="text-danger ">{this.validator.message('old password', this.state.old, 'required')}</div>
              {this.state.error.olderror}
              {/* VALIDATION */}
            </div>

            <div className="col-md-8">
              <label className="pull-left">New Password</label>
              <OverlayTrigger trigger="focus" placement="right" overlay={popover}>
                <input id="new" name="new" type="password" placeholder="New Password" maxLength="30" className="form-control " onChange={this.getNewPswdChange} />
              </OverlayTrigger>



              {/* VALIDATION */}


              <div className="text-danger ">{this.validator.message('new password', this.state.new, 'required')}</div>

              {/* VALIDATION */}
            </div>

            <div className="col-md-8">
              <label className="pull-left">Confirm Password</label>
              <input id="confirm" name="confirm" type="password" maxLength="30" placeholder="Confirm Password" className="form-control  " onChange={this.getChangeHandler} />


              {/* VALIDATION */}
              {this.state.error.confirmerror}
              <div className="text-danger  ">{this.validator.message('confirm password', this.state.confirm, 'required')}</div>
              {/* VALIDATION */}
            </div>



          </div>

        </form>
        <div className="pull-right row ">

          <div className="col-md-6 text-center">
            <button type="submit" className="btn bg-success btn-bg btn-md" onClick={this.submit} >Submit</button>
          </div>
          <div className="col-md-6 ">
            <button type="submit" onClick={this.reSet} className="text-center btn bg-danger btn-bg btn-md">&nbsp;Reset&nbsp;</button>
          </div>

        </div>




        {/* End of the form  */}


      </div>


    );
  }
}

export default Password;

