import React, { Component } from 'react'
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Collapse, DropdownItem, DropdownMenu, DropdownToggle, Fade, Form, FormGroup, FormText, FormFeedback, Input, InputGroup, InputGroupAddon, InputGroupText, Label, Row, } from 'reactstrap';
import SimpleReactValidator from 'simple-react-validator'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SweetAlert from 'react-bootstrap-sweetalert';

class AddEmployeeasset extends Component {
	constructor(props) {

		super(props)
		this.state = {
			Id: '0',
			EmpCode: '',
			EmpId: '',
			EmpName: '',
			AssetID: '',
			AssetName: '',
			Remarks: '',
			IssuedOn: '',
			ReturnOn: ' ',
			Reason: ' ',
			Status: 'In Use',
			startDate: new Date(),
			closeModal:null,
            show1: null,
			Subdetails: {
				AssetID: [],
				AssetName: [],
				EmpCode: [],
				EmpName: [],
				AssetId: [],
				EmpId: []

			}
		}
		this.getEmployeeDetail();
		this.getDropdownDetail();
		this.getName = this.getName.bind(this);
		this.getCode = this.getCode.bind(this);
		this.getIssueddate = this.getIssueddate.bind(this);
		this.getAssetName = this.getAssetName.bind(this);
		this.getAssetid = this.getAssetid.bind(this);
		this.getRemarks = this.getRemarks.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}
	handleChange(date) {
		this.setState({
			startDate: date
		});
	}
	onDate = date => this.setState({ date })
	getDropdownDetail = () => {
		fetch("http://localhost:5000/dropdownassetdetail/")
			.then(response => response.json())
			.then(({ dropdownasset }) => {
				// alert(JSON.stringify(dropdownasset))
				this.setState({
					Subdetails: {
						AssetID: dropdownasset.map(v => (<option value={v.Code}>{v.Code}</option>)),
						AssetId: dropdownasset.map(l => (<option value={l.AssetId}>{l.AssetId}</option>)),
						AssetName: dropdownasset.map(w => (<option value={w.AssetName}>{w.Name}</option>)),
						EmpCode: this.state.Subdetails.EmpCode,
						EmpName: this.state.Subdetails.EmpName,
						EmpId: this.state.Subdetails.EmpId
					}
				})
			})
	}
	getEmployeeDetail = () => {
		fetch("http://localhost:5000/dropdownemployeedetail/")
			.then(response => response.json())
			.then(({ dropdownemployee }) => {
				// console.log('safvsaf'+ JSON.stringify(dropdownemployee))
				this.setState({
					Subdetails: {
						AssetID: this.state.Subdetails.AssetID,
						AssetName: this.state.Subdetails.AssetName,
						AssetId: this.state.Subdetails.AssetId,
						EmpCode: dropdownemployee.map(v => (<option value={v.EmpId + "," + v.Empname}>{v.Empcode}</option>)),
						EmpName: dropdownemployee.map(w => (<option value={w.EmpName}>{w.Empname}</option>)),
						EmpId: dropdownemployee.map(l => (<option value={l.EmpId}>{l.EmpId}</option>)),

					}

				})

			})
	}
	resetForm = () => {

		this.setState({
			Id: '',
			EmpCode: '',
			EmpName: '',
			AssetID: '',
			AssetName: '',
			Remarks: '',
			IssuedOn: '',
			ReturnOn: ' ',
			Reason: ' ',
			Status: '',


		})
		document.getElementById('addassetForm').reset();
		this.validator = new SimpleReactValidator();
		// dismiss
		// this.props.history.push('/#/employeeasset');
		
		// window.location.href='/'
		// $('#myModal2').hide();
	

	}
	sendValue = () => {
		// alert(`${this.state.Id}`)
		if (this.validator.allValid()) {
			var params = {
				Id: this.state.Id,
				EmpId: this.state.EmpId,
				AssetID: this.state.AssetID,
				Remarks: this.state.Remarks,
				IssuedOn: new Date,
				ReturnOn: this.state.ReturnOn,
				Reason: this.state.Reason,
				Status: this.state.Status,
			}

			const options = {
				method: 'post',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(params)
			}
			fetch("http://localhost:5000/updateasset/", options).then(function (response) {
                return response.json()

            }).then(({ data }) => {

                console.log(data)
                this.setState({ show1: true })
            }).catch(err => {
                console.error('Request failed', err)
            })
            console.log("hello", JSON.stringify(params))
			
			
		}
		else {
			this.validator.showMessages();
			this.forceUpdate();
		}
		
	}

	getCode(event) {
		var str = event.target.value;
		var res = str.split(",");
		this.setState({ EmpId: event.target.value, EmpName: res[1] })

	}
	getName(event) {
		this.setState({ EmpName: event.target.value })
	}
	getIssueddate(event) {
		this.setState({ IssuedOn: event.target.value })
	}
	getAssetName(event) {
		this.setState({ AssetName: event.target.value })
		fetch("http://localhost:5000/getassetdetail/" + event.target.value + "")
			.then(response => response.json())
			.then(({ getasset }) => {
				console.log('s' + JSON.stringify(getasset))
				// alert(JSON.stringify(getasset))
				this.setState({
					Subdetails: {
						AssetID: getasset.map(v => (<option value={v.AssetId}>{v.Code}</option>)),
						AssetId: this.state.Subdetails.AssetId,
						AssetName: this.state.Subdetails.AssetName,
						EmpCode: this.state.Subdetails.EmpCode,
						EmpName: this.state.Subdetails.EmpName,
						EmpId: this.state.Subdetails.EmpId

					}

				})

			})

	}
	getAssetid(event) {

		this.setState({ AssetID: event.target.value })
		alert(event.target.value)
	}
	getRemarks(event) {
		this.setState({ Remarks: event.target.value })
	}

	componentWillMount() {
		this.validator = new SimpleReactValidator();
	}
	render() {
		
        const { show1 } = this.state;
		const Validationstyle = {
			color: "red"
		}
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
				<Row>

					<Col xs="12" sm="12">


						<CardBody>
							<form id="addassetForm">

								<FormGroup row className="my-0">
									<Col xs="4">
										<FormGroup>

											<Label htmlFor="city">Employee Code</Label>
											<Input type="select" id="EmpId" bsSize="sm" value={this.state.Empcode} onChange={this.getCode}>
											<option value="" disabled="disabled" selected hidden>Select the EmpCode</option>
												{this.state.Subdetails.EmpCode}
											</Input>
											<div style={Validationstyle}>{this.validator.message('EmpId', this.state.EmpName, 'required')}</div>
										</FormGroup>
									</Col>

									<Col xs="8">
										<FormGroup>
											<Label htmlFor="postal-code">Employee Name</Label>
											<Input type="text" id="EmpName" name="EmpName" placeholder="Employee Name..." bsSize="sm" value={this.state.EmpName} onChange={this.getName} disabled />
											<div style={Validationstyle}>{this.validator.message('EmpName', this.state.EmpName, 'required')}</div>
										</FormGroup>
									</Col>
								</FormGroup>



								<FormGroup row className="my-0">
									<Col xs="4">
										<FormGroup>
											<Label htmlFor="city">Asset Name</Label>
											<Input type="select" id="AssetName" name="AssetName" bsSize="sm" value={this.state.AssetName} onChange={this.getAssetName}>
											<option value="" disabled="disabled" selected hidden>Select the Asset Name</option>
												{this.state.Subdetails.AssetName}
											</Input>
											<div style={Validationstyle}>{this.validator.message('AssetName', this.state.EmpName, 'required')}</div>
										</FormGroup>
									</Col>

									<Col xs="8">
										<FormGroup>
											<Label htmlFor="postal-code">Asset Id</Label>

											<Input type="select" name="AssetID" id="AssetID" bsSize="sm" value={this.state.AssetID} onChange={this.getAssetid} placeholder="Select Asset Id">
											<option value="" disabled="disabled" selected hidden>Select the Asset Id</option>
												{this.state.Subdetails.AssetID}
											</Input>
											<div style={Validationstyle}>{this.validator.message('AssetID', this.state.EmpName, 'required')}</div>
										</FormGroup>
									</Col>
								</FormGroup>

								<FormGroup>
									<Label htmlFor="country">Remarks</Label>
									<Input type="textarea" name="textarea-input" id="textarea-input" rows="4"
										placeholder="Enter The Remarks..." value={this.state.Remarks} onChange={this.getRemarks} />
								</FormGroup>
								<FormGroup row className="my-0">
									<Col xs="4">
										<FormGroup>
											<Label htmlFor="city">Issued Date</Label>
											{/* <Input type="date" id="postal-code" placeholder="Postal Code" bsSize="sm" value={this.state.IssuedOn} onChange={this.getIssueddate}/> */}

											<DatePicker
												selected={this.state.startDate}
												onChange={this.handleChange}
											/>
										</FormGroup>


									</Col>
								</FormGroup>






							</form>

							<Col xs="4">
								<br />
								<FormGroup>
									<Button type="submit" size="sm" color="success" onClick={this.sendValue} data-dismiss={this.state.closeModal}>Submit</Button>
									&nbsp;&nbsp;&nbsp;&nbsp;
				<Button size="sm" color="danger" onClick={this.resetForm} >Reset</Button>
									&nbsp;&nbsp;&nbsp;&nbsp;
				<Button size="sm" color="primary" data-dismiss="modal">Cancel</Button>

								</FormGroup>
							</Col>
						</CardBody>


					</Col>
				</Row>

			</div>
		)
	}
}

export default AddEmployeeasset
























