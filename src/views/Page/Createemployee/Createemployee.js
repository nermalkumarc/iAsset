import React, { Component } from 'react';
//import { MDBInput,MDBBtn} from 'mdbreact';
import SweetAlert from 'react-bootstrap-sweetalert';
import SimpleReactValidator from 'simple-react-validator';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {

    Label,

} from 'reactstrap';
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Collapse, DropdownItem, DropdownMenu, DropdownToggle, Fade, Form, FormGroup, FormText, FormFeedback, Input, InputGroup, InputGroupAddon, InputGroupText, Row, } from 'reactstrap';


class CreateEmployee extends Component {
    constructor(props) {

        super(props)
        this.state = {
            unique: null,
            show: null,
            show1: null,
            Button: "",
            ID: 0,
            Code: "",
            Name: "",
            Email: "",
            Mobile: "",
            Department: "",
            Designation: "",
            Role: "",
            DOJ: new Date(),
            Gender: "",
            isActive: "",
            Location: "",
            Password: "",
            Subdetails: {
                department: [],
                designation: [],
                gender: [],
                location: [],
                role: []
            }
        }

        this.getChangeHandler = this.getChangeHandler.bind(this);
        this.Update = this.Update.bind(this);
        this.Save = this.Save.bind(this);
        this.Reset = this.Reset.bind(this);
        this.baseState = this.state

        if (this.props.code) {
            this.getSingleEmployee();
        }

        this.getSubDetails();

    }

    Reset = () => {
        document.getElementById("createform").reset();
        this.setState({
            unique: "",
            Code: "",
            Name: "",
            Email: "",
            Mobile: "",
            Department: "",
            Designation: "",
            Role: "",
            DOJ: "",
            Gender: "",
            isActive: "",
            Location: "",
        })
        this.validator = new SimpleReactValidator();
        this.handleChange = this.handleChange.bind(this);

    }
    handleChange = (date) => {
        alert(date)
        this.setState({
            DOJ: date
        });
    }
    componentWillMount() {

        this.validator = new SimpleReactValidator();
    }

    UniqueChecker = (event) => {
        var empcode = event.target.value;
        var url = "http://localhost:5000/uniquechecker/" + empcode + "/" + this.state.ID;
        console.log(url);
        fetch(url)
            .then(response => response.json())
            .then(({ UniqueData }) => {
                this.setState({ unique: !UniqueData ? "Employee code already exists" : "" })
            })


    }
    getChangeHandler(event) {

        switch (event.target.id) {

            case "code": this.setState({ Code: event.target.value });
                break;
            case "name": this.setState({ Name: event.target.value });
                break;
            case "email": this.setState({ Email: event.target.value });
                break;
            case "mobile": this.setState({ Mobile: event.target.value });
                break;
            case "department": this.setState({ Department: event.target.value });
                break;
            case "designation": this.setState({ Designation: event.target.value });
                break;
            case "role": this.setState({ Role: event.target.value });
                break;
            case "doj": this.setState({ DOJ: event.target.value });
                break;
            case "gender": this.setState({ Gender: event.target.value });
                break;
            case "location": this.setState({ Location: event.target.value });
                break;
            case "password": this.setState({ Password: event.target.value });
                break;
            case "defaultUnchecked": this.setState({ isActive: event.target.checked });
                break;

        }

    }

    Save = () => {

        if (this.validator.allValid()) {
            alert("valid")
            var pad = function (num) { return ('00' + num).slice(-2) };
            var date;
            date = new Date(Date(this.state.DOJ));

            date = date.getUTCFullYear() + '-' + pad(date.getUTCMonth() + 1) + '-' + pad(date.getUTCDate()) + ' ' + pad(date.getUTCHours()) + ':' + pad(date.getUTCMinutes()) + ':' + pad(date.getUTCSeconds());
            var rolename = false;
            if (this.state.Role == "Admin") {
                rolename = false;
            }
            else {
                rolename = true;
            }
            var params = {
                Code: this.state.Code,
                Name: this.state.Name,
                Email: this.state.Email,
                Mobile: this.state.Mobile,
                Department: this.state.Department,
                Designation: this.state.Designation,
                Role: rolename,
                DOJ: date,
                Gender: this.state.Gender,
                Password: this.state.Code,
                Location: this.state.Location,
                isActive: true,
            }
            const options = {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(params)
            }
            fetch("http://localhost:5000/employee", options).then(function (response) {
                response.json()

            }).then((data) => {
                console.log(data)
                this.setState({ show1: true })
            }).catch(err => {
                console.error('Request failed', err)
            })
            console.log("hello", JSON.stringify(params))
        } else {
            this.validator.showMessages();
            this.forceUpdate();
        }



    }



    getSingleEmployee = () => {

        var url = "http://localhost:5000/employeelist/" + this.props.code + "";
        console.log(url);
        fetch(url)
            .then(response => response.json())
            .then(({ SingleData }) => {
                var dat = SingleData[0].DOJ
                var lastChar = dat.substr(0, 10);
                console.log(lastChar)
                var rolename
                if (SingleData[0].RoleID == false) {
                    rolename = "Admin"
                }
                else {
                    rolename = "Employee"
                }

                this.setState({
                    ID: SingleData[0].ID,
                    Code: SingleData[0].Code,
                    Name: SingleData[0].Name,
                    Email: SingleData[0].EmailID,
                    Mobile: SingleData[0].MobileNo,
                    Department: SingleData[0].Department,
                    Designation: SingleData[0].Designation,
                    Role: rolename,
                    DOJ: lastChar,
                    Gender: SingleData[0].Gender,
                    isActive: SingleData[0].isActive,
                    Location: SingleData[0].Location,

                });


            })
    }

    getSubDetails = () => {

        fetch("http://localhost:5000/subdetails/")
            .then(response => response.json())
            .then(({ subdetails }) => {
                var dept = subdetails.filter(function (dept1) { return dept1.Category === "Department"; });
                var des = subdetails.filter(function (des1) { return des1.Category === "Designation"; });
                var gender = subdetails.filter(function (gender1) { return gender1.Category === "Gender"; });

                var loc = subdetails.filter(function (loc1) { return loc1.Category === "Location"; });
                var role1 = subdetails.filter(function (role2) { return role2.Category === "Role"; });
                role1[0]['status'] = false;
                role1[1]['status'] = true;

                this.setState({
                    Subdetails: {
                        department: dept.map(v => (<option value={this.department}>{v.Name}</option>)),
                        designation: des.map(w => (<option value={this.designation}>{w.Name}</option>)),
                        gender: gender.map(x => (<option value={this.gender}>{x.Name}</option>)),
                        location: loc.map(x => (<option value={this.location}>{x.Name}</option>)),
                        role: role1.map(y => (<option value={this.role}>{y.Name}</option>)),
                    }

                })

            })
    }
    Update = () => {
        if (this.validator.allValid()) {

            var pad = function (num) { return ('00' + num).slice(-2) };
            var date;
            date = new Date(Date(this.state.DOJ));

            date = date.getUTCFullYear() + '-' + pad(date.getUTCMonth() + 1) + '-' + pad(date.getUTCDate()) + ' ' + pad(date.getUTCHours()) + ':' + pad(date.getUTCMinutes()) + ':' + pad(date.getUTCSeconds());
            var rolename = false;
            if (this.state.Role == "Admin") {
                rolename = false;
            }
            else {
                rolename = true;
            }
            var param = {
                ID: this.state.ID,
                Code: this.state.Code,
                Name: this.state.Name,
                Email: this.state.Email,
                Mobile: this.state.Mobile,
                Department: this.state.Department,
                Designation: this.state.Designation,
                Role: rolename,
                DOJ: date,
                Gender: this.state.Gender,
                Location: this.state.Location,
                isActive: this.state.isActive,
            }

            const options = {
                method: 'put',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(param)
            }
            fetch("http://localhost:5000/updateemployee/" + param.ID + "", options).then(function (response) {
                response.json()

            }).then((data) => {
                console.log(data)
                this.setState({ show: true })
            })
                .catch(err => {
                    console.error('Request failed', err)
                })
        } else {
            this.validator.showMessages();
            this.forceUpdate();
        }
    }

    render() {

        const { show } = this.state;
        const { show1 } = this.state;



        return (
            <div>
                {/* <Sweetalert /> */}
                <div>
                    <SweetAlert
                        show={show1}
                        success
                        title="Success"
                        text="SweetAlert in React"
                        onConfirm={() => {
                            this.setState({ show1: false })
                            this.props.onClick()
                        }
                        }>Data Saved Successfully</SweetAlert>
                </div>

                {/* <Sweetalert /> */}
                <div>
                    <SweetAlert
                        show={show}
                        success
                        title="Success"
                        text="SweetAlert in React"
                        onConfirm={() => {
                            this.setState({ show: false })
                            this.props.onClick()
                        }
                        }>Data Updated Successfully</SweetAlert>
                </div>
                {/* Beginning of the form  */}
                <div className="container text-center ">
                    {/* <div className="row card"> */}
                    <div className="col-md-12">
                        <div className="form-horizontal card-body"  >
                            <form className="formbody" name="Form" id="createform">
                                <div className=" form-group row ">
                                    <div className="col-md-6">
                                        <Label htmlFor="code" className="pull-left">Employee Code</Label>
                                        {/* <div className="input-group-append">
                     <span className="col-md-1  text-center"><i className="fa fa-id-badge " style={bgcolor}></i></span> */}

                                        <input id="code" value={this.state.Code} maxLength="15" name="code" type="text" placeholder="Employee code" className="form-control" onBlur={this.UniqueChecker.bind(this)} onChange={this.getChangeHandler} required />

                                        {/* </div> */}
                                    </div>

                                    <div className="col-md-6">
                                        <Label htmlFor="code" className="pull-left">Employee Name</Label>
                                        {/* <div className="input-group-append">
                     <span className="col-md-1  text-center"><i className="fa fa-user  pull-left" style={bgcolor}></i></span>                        */}
                                        <input id="name" name="name" maxlength="50" value={this.state.Name} type="text" placeholder="Employee Name" className="form-control" onChange={this.getChangeHandler} required />
                                        {/* </div> */}
                                    </div>
                                </div>
                                {/* VALIDATION */}
                                <div className=" form-group row ">
                                    <div className="col-md-6 pull-left">
                                        <div className="text-danger pull-left">{this.validator.message('Employee Code', this.state.Code, 'required')}</div>
                                        <div className="text-danger pull-left">{this.state.unique}</div>
                                    </div>
                                    <div className="col-md-6  pull-left">
                                        <div className="text-danger pull-left">{this.validator.message('Name', this.state.Name, 'required|alpha_space')}</div>
                                    </div>
                                </div>
                                {/* VALIDATION */}


                                <div className=" form-group  row ">
                                    <div className="col-md-6">
                                        <Label htmlFor="code" className="pull-left">Email Id</Label>
                                        {/* <div className="input-group-append">
                            <span className="col-md-1  text-center"><i className="fa fa-envelope-o  pull-left" style={bgcolor}></i></span> */}
                                        <input id="email" name="email" maxlength="70" value={this.state.Email} type="email" placeholder="Email Address" className="form-control " onChange={this.getChangeHandler} required />
                                        {/* </div>                   */}
                                    </div>
                                    <div className="col-md-6">
                                        <Label htmlFor="code" className="pull-left">Role</Label>
                                        {/* <div className="input-group-append">
                            <span className="col-md-1  text-center"><i className="fa fa-user-secret  pull-left" style={bgcolor}></i></span>                            */}
                                        <select id="role" value={this.state.Role} className="form-control  " placeholder="Select the Role" onChange={this.getChangeHandler} required>
                                            <option value="" disabled="disabled" hidden="hidden">Select the Role</option>
                                            {this.state.Subdetails.role}</select>
                                        {/* </div> */}
                                    </div>
                                </div>
                                {/* VALIDATION */}
                                <div className=" form-group row ">
                                    <div className="col-md-6  pull-left">
                                        <div className="text-danger pull-left">{this.validator.message('Email', this.state.Email, 'required|email')}</div>
                                    </div>
                                    <div className="col-md-6  pull-left">
                                        <div className="text-danger pull-left">{this.validator.message('Role', this.state.Role, 'required')}</div>
                                    </div>
                                </div>
                                {/* VALIDATION */}


                                <div className=" form-group row ">
                                    <div className="col-md-6">
                                        <Label htmlFor="code" className="pull-left">Mobile</Label>
                                        {/* <div class="input-group-append">
                            <span className="col-md-1  text-center"><i className="fa fa-phone-square  pull-left" style={bgcolor}></i></span> */}

                                        <input id="mobile" name="Mobile" value={this.state.Mobile} maxlength="10" type="text" placeholder="Mobile" className="form-control  has-success has-feedback  " onChange={this.getChangeHandler} required />
                                        {/* </div>            */}

                                    </div>

                                    <div className="col-md-6">
                                        <Label htmlFor="code" className="pull-left">Gender</Label>
                                        {/* <div className="input-group-append">
                            <span className="col-md-1  text-center"><i className="fa fa-female  pull-left" style={bgcolor}></i></span>                            */}
                                        <select id="gender" name="gender" value={this.state.Gender} className="form-control  " onChange={this.getChangeHandler} required >
                                            <option value="" disabled="disabled" hidden="hidden">Select the Gender</option>
                                            {this.state.Subdetails.gender}</select>
                                        {/* </div> */}
                                    </div>

                                </div>
                                {/* VALIDATION */}
                                <div className=" form-group row ">
                                    <div className="col-md-6  pull-left">
                                        <div className="text-danger pull-left">{this.validator.message('mobile', this.state.Mobile, 'required|phone')}</div>
                                    </div>
                                    <div className="col-md-6  pull-left">
                                        <div className="text-danger pull-left">{this.validator.message('gender', this.state.Mobile, 'required')}</div>
                                    </div>
                                </div>
                                {/* VALIDATION */}


                                <div className=" form-group row ">

                                    <div className="col-md-6">
                                        <Label htmlFor="code" className="pull-left">Designation</Label>
                                        {/* <div className="input-group-append">
                        <span className="col-md-1  text-center"><i className="fa fa-user-circle " style={bgcolor}></i></span> */}

                                        <select id="designation" value={this.state.Designation} className="form-control" onChange={this.getChangeHandler} required>
                                            <option value="" disabled="disabled" hidden="hidden">Select the designation</option>
                                            {this.state.Subdetails.designation}</select>
                                        {/* </div>                     */}
                                    </div>
                                    <div className="col-md-6">
                                        <Label htmlFor="code" className="pull-left">Department</Label>
                                        {/* <div className="input-group-append">
                        <span className="col-md-1  text-center"><i className="fa fa-suitcase  pull-left" style={bgcolor}></i></span>                            */}
                                        <select id="department" value={this.state.Department} className="form-control " onChange={this.getChangeHandler} required>
                                            <option value="" disabled="disabled" hidden="hidden">Select the Department</option>
                                            {this.state.Subdetails.department}</select>
                                        {/* </div> */}
                                    </div>
                                </div>
                                {/* VALIDATION */}
                                <div className=" form-group row ">
                                    <div className="col-md-6  pull-left">
                                        <div className="text-danger pull-left">{this.validator.message('designation', this.state.Designation, 'required')}</div>
                                    </div>
                                    <div className="col-md-6  pull-left">
                                        <div className="text-danger pull-left">{this.validator.message('department', this.state.Department, 'required')}</div>
                                    </div>
                                </div>
                                {/* VALIDATION */}


                                <div className="form-group row ">
                                    <div className="col-md-6">
                                        <Label htmlFor="code" className="pull-left">Location</Label>
                                        {/* <div className="input-group-append">
                        <span className="col-md-1  text-center"><i className="fa fa-map-marker  pull-left" style={bgcolor}></i></span> */}

                                        <select id="location" name="location" value={this.state.Location} className="form-control " onChange={this.getChangeHandler} >
                                            <option value="" disabled="disabled" hidden="hidden">Select the Location</option>
                                            {this.state.Subdetails.location}</select>
                                        {/* </div> */}
                                    </div>
                                    
<Col xs="4">
										<FormGroup>
											<Label className="pull-left">Issued Date</Label>
											{/* <Input type="date" id="postal-code" placeholder="Postal Code" bsSize="sm" value={this.state.IssuedOn} onChange={this.getIssueddate}/> */}

											<DatePicker
                                            className="mr-5"
                                            value={this.state.DOJ}
                                            selected={this.state.DOJ}
                                            onChange={this.handleChange}
                                        />
										</FormGroup>


									</Col>
                                </div>
                                {/* VALIDATION */}
                                <div className=" form-group row ">
                                    <div className="col-md-6  mr-5">
                                        <div className="text-danger pull-left">{this.validator.message('location', this.state.Location, 'required')}</div>
                                    </div>
                                    <div className="col-md-6  pull-left">
                                        <div className="text-danger pull-left">{this.validator.message('Date', this.state.DOJ, 'required')}</div>
                                    </div>
                                </div>
                                {/* VALIDATION */}

                                <div className="form-group row ">
                                    <div className="custom-control custom-checkbox  col-md-6">
                                        <input type="checkbox" className="custom-control-input" id="defaultUnchecked" checked={this.state.isActive} onChange={this.getChangeHandler} required />
                                        <label className="custom-control-label" htmlFor="defaultUnchecked" >Active</label>
                                    </div>

                                </div>


                            </form>
                            <div className="pull-right row ">
                                <div className="col-md-6 text-center">
                                    <button className="btn bg-success btn-bg btn-md" onClick={this.props.code != null ? this.Update : this.Save}>Submit</button>
                                </div>
                                <div className="col-md-6 ">
                                    <button className="text-center btn bg-danger btn-bg btn-md" onClick={this.Reset}  >&nbsp;Clear&nbsp;</button>
                                </div>
                            </div>

                            <br />
                            <br />
                            <br />
                            <br />
                        </div>
                    </div>
                </div>
                {/* </div> */}

                {/* End of the form  */}

            </div>
        );
    }
}

export default CreateEmployee; 