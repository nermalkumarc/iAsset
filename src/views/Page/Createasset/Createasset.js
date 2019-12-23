import React, { Component, browserHistory } from 'react';
import '../Theme.css'
import SweetAlert from 'react-bootstrap-sweetalert';
import SimpleReactValidator from 'simple-react-validator';
import { Col, CardBody, FormGroup, Input, Label, } from 'reactstrap';

class Createasset extends Component {

    constructor(props) {
        super(props)
        this.state = {
            ID: 0,
            Code: "",
            Name: "",
            BrandName: "",
            Status: "Available",
            oldStatus: "",
            show: null,
            show1: null,
            dismiss: null,
            unique: null,
        }
        this.getChangeHandler = this.getChangeHandler.bind(this);
        if (this.props.code) {
            this.getSingleEmployee();
        }
    }

    Reset = () => {
        this.setState({
            Code: "",
            Name: "",
            BrandName: "",
            Status: false,
        });
        document.getElementById('assetForm').reset();
        this.validator = new SimpleReactValidator();
    }

    componentWillMount() {
        this.validator = new SimpleReactValidator();

    }

    getChangeHandler(event) {

        switch (event.target.id) {
            case "Code": this.setState({ Code: event.target.value });
                break;
            case "Name": this.setState({ Name: event.target.value });
                break;
            case "BrandName": this.setState({ BrandName: event.target.value });
                break;
            case "defaultUnchecked": this.setState({ Status: event.target.checked ? ("Damaged") : (this.state.oldStatus) });
                break;

        }
    }

    Save = () => {
        if (this.validator.allValid()) {
            var params = {
                Code: this.state.Code,
                Name: this.state.Name,
                BrandName: this.state.BrandName,
                Status: this.state.Status
            }

            const options = {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(params)
            }
            fetch("http://localhost:5000/asset", options).then(function (response) {
                return response.json()

            }).then(({ data }) => {

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
    UniqueChecker = (event) => {
        
        var assetcode = event.target.value;
        var url = "http://localhost:5000/uniqueassetchecker/" + assetcode +"/"+this.state.ID;
        console.log(url);
        fetch(url)
            .then(response => response.json())
            .then(({ UniqueData }) => {
                this.setState({ unique: !UniqueData ? "Asset code already exists" : "" })
            })
        
    }

    getSingleEmployee = () => {
        console.log(this.props);
        var url = "http://localhost:5000/assetlist/" + this.props.code + "";
        console.log(url);
        fetch(url)
            .then(response => response.json())
            .then(({ SingleData }) => {
                this.setState({
                    ID: SingleData[0].ID,
                    Code: SingleData[0].Code,
                    Name: SingleData[0].Name,
                    BrandName: SingleData[0].BrandName,
                    Status: SingleData[0].Status,
                    oldStatus: SingleData[0].Status,
                });

            })
    }

    Update = () => {
        if (this.validator.allValid()) {
            var param = {
                ID: this.state.ID,
                Code: this.state.Code,
                Name: this.state.Name,
                BrandName: this.state.BrandName,
                Status: this.state.Status
            }
            
            const options = {
                method: 'put',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(param)
            }

            fetch("http://localhost:5000/updateasset/" + param.ID + "", options).then(function (response) {
                return response.json()

            }).then(({ data }) => {
                
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
                <div>
                    <SweetAlert
                        show={show1}
                        success
                        title="Success"
                        text="SweetAlert in React"
                        onConfirm={() => {
                            this.getProducts();
                            this.setState({
                                show1: false,
                            })
                        }
                        }>Data Saved Successfully</SweetAlert>
                </div>
                <div>
                    <SweetAlert
                        show={show}
                        success
                        title="Success"
                        text="SweetAlert in React"
                        onConfirm={() =>
                            this.setState({
                                show: false,
                                dismiss: "modal"
                            })
                        }>Data Updated Successfully</SweetAlert>
                </div>
                <CardBody>
                    <form id="assetForm">
                        <FormGroup>
                            <Label htmlFor="Code">Code: </Label>
                            <Input id="Code" onChange={this.UniqueChecker.bind(this)} value={this.state.Code} maxLength='25' name="Code" type="text" placeholder="Code..." className="form-control mr-5" onChange={this.getChangeHandler} />
                            <div className='Validationstyle'>{this.validator.message('Code', this.state.Code, 'required')}</div>
                            <div className='Validationstyle'>{this.state.unique}</div>

                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="Name">Name:</Label>
                            <Input id="Name" name="Name" type="text" maxLength='30' placeholder="Name..." value={this.state.Name} className="form-control mr-5" onChange={this.getChangeHandler} />
                            <div className='Validationstyle'>{this.validator.message('Name', this.state.Name, 'required')}</div>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="BrandName">Brand Name:</Label>
                            <Input id="BrandName" name="BrandName" maxLength='25' type="text" placeholder="Brand Name..." value={this.state.BrandName} className="form-control mr-5" onChange={this.getChangeHandler} />
                            <div className='Validationstyle'>{this.validator.message('Brand name', this.state.BrandName, 'required')}</div>
                        </FormGroup>
                        {this.props.code !== "" ? (<FormGroup>
                            <Col xs="4">
                                <div className="custom-control custom-checkbox  col-md-6">
                                    <Input type="checkbox" className="custom-control-input" id="defaultUnchecked" value={this.state.Status} onChange={this.getChangeHandler} />
                                    <Label className="custom-control-label" htmlFor="defaultUnchecked" >Damaged</Label>
                                </div>
                            </Col>
                        </FormGroup>) : (<span />)}
                    </form>
                    <FormGroup>
                        <button onClick={this.Reset} className="text-center btn bg-danger btn-bg btn-md pull-right">&nbsp;Reset&nbsp;</button>
                        <button className="btn bg-success btn-bg btn-md  mr-2 pull-right" data-dismiss={this.state.dismiss} onClick={this.props.code !== "" ? this.Update : this.Save}>Submit</button>
                    </FormGroup>
                </CardBody>
            </div>

        );
    }
}

export default Createasset;