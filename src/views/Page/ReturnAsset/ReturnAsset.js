import React, { Component } from 'react';
import '../Theme.css'
import SweetAlert from 'react-bootstrap-sweetalert';
import { Button,CardBody,	CardFooter,	CardHeader,	Col,	Collapse,	DropdownItem,	DropdownMenu,	DropdownToggle,	Fade,	Form,	FormGroup,	FormText,	FormFeedback,	Input,	InputGroup,	InputGroupAddon,	InputGroupText,	Label,	Row,} from 'reactstrap';


class ReturnAsset extends Component {
    constructor(props)
    {
      super(props)
        this.state={
                Button:"",
                Code:"",
                Name:"",
               AssetId:"",
               AssetName:"",
               Reason:"",
               IssuedOn:"",
               ReturnDate:"",
               Remarks:"",      
               Id:'',
               Status:'',
               EmpId:'',
               AssetID:'', 
               Text:false,    
               model:'',
               show:true,
               show1: true,
        }
        this.getChangeHandler = this.getChangeHandler.bind(this);
        this.changeRadio = this.changeRadio.bind(this);
        this.Update = this.Update.bind(this);
        
     
        if(this.props.code){
            this.getSingleEmployee();
        }

    }
    resetForm = () => { 
      
        this.setState({
          Reason:"",
          

        })
      }
    getChangeHandler(event) {
        
       this.setState({Reason:event.target.value})
       
       
      }
 changeRadio(event)
 {
    this.setState({
        Status:event.target.value
    })
     
 }
    getSingleEmployee= () =>{
        
        var url = "http://localhost:5000/employeeassetlist/"+this.props.code+"/" +this.props.id+ "";
        // alert(`${this.props.code}`)
        // alert(url);
        fetch(url)
        .then(response=>response.json())
        .then(({SingleData})=>{
            
            // alert(JSON.stringify(SingleData[0]))
            this.setState({ 
                Id:SingleData[0].ID,
                Code :SingleData[0].EmpCode,
                Name:SingleData[0].Name,
                EmpId:SingleData[0].EmpId,
                AssetID:SingleData[0].AssetID,
                AssetId:SingleData[0].Code,
                AssetName:SingleData[0].Assetname,
                IssuedOn:SingleData[0].IssuedOn,
                Remarks:SingleData[0].Remarks
            });
        
        })
      }     
      Update=()=>{
    
          var params={
              Id:this.state.Id,
            Code:this.state.Code,
            EmpId:this.state.EmpId,
            AssetID:this.state.AssetID,
            AssetId:this.state.AssetId,
            Remarks:this.state.Remarks,  
            IssuedOn:this.state.IssuedOn,
            ReturnDate: new Date(),
            Reason:this.state.Reason,
            Status:this.state.Status,
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
alert('sdgvsdv')
          this.setState({
            model:'modal'
          })
    }
showText = () =>
{
  
  this.setState ( {
    Text:true,
    show:false
  })
}
hideText = () =>
{
  
  this.setState ( {
    Text:false,
    show:false
  })
}
    render() {
        const { show1 } = this.state;
        

      return (
       
        <div>
  
            <Row>
          
		  <Col xs="12" sm="12">
            
              
              <CardBody>
                
			  <FormGroup row className="my-0">
                  <Col xs="6">
                    <FormGroup>
                      <Label htmlFor="city">Employee Code</Label>
                      <Input type="text" id="city" placeholder="Enter your city" value={this.state.Code} disabled bsSize="sm"/>
                    </FormGroup>
                  </Col>
                  <Col xs="6">
                    <FormGroup>
                      <Label htmlFor="postal-code">Employee Name</Label>
                      <Input type="text" id="postal-code" placeholder="Postal Code" value={this.state.Name} disabled bsSize="sm"/>
                    </FormGroup>
                  </Col>
                </FormGroup>
				<FormGroup row className="my-0">
                  <Col xs="6">
                    <FormGroup>
                      <Label htmlFor="city">Asset Id</Label>
                      <Input type="text" id="city" placeholder="Enter your city" value={this.state.AssetId} disabled bsSize="sm"/>
                    </FormGroup>
                  </Col>
                  <Col xs="6">
                    <FormGroup>
                      <Label htmlFor="postal-code">Asset Name</Label>
                      <Input type="text" id="postal-code" placeholder="Postal Code" value={this.state.AssetName} disabled bsSize="sm"/>
                    </FormGroup>
                  </Col>
                </FormGroup>
                <FormGroup row>
                    <Col md="3">
                      <Label>Status</Label>
                    </Col>
                    <Col md="9">
                    <FormGroup check inline>
                        <Input className="form-check-input" type="radio" id="inline-radio3" name="inline-radios" value='Return' onClick={this.hideText} onChange={this.changeRadio} bsSize="sm"/>
                        <Label className="form-check-label" check htmlFor="inline-radio3">Return</Label>
                      </FormGroup>
                      <FormGroup check inline>
                        <Input className="form-check-input" type="radio" id="inline-radio3" name="inline-radios" value='Damaged'  onChange={this.changeRadio} onClick={this.showText} bsSize="sm"/>
                        <Label className="form-check-label" check htmlFor="inline-radio3">Damaged</Label>
                      </FormGroup>
                      
                      
                      
                    </Col>
                  </FormGroup>
                  {this.state.Text?
                  <FormGroup>
                  <Label htmlFor="country">Reason</Label>
				  <Input type="textarea" name="textarea-input input1" id="textarea-input" rows="4"
                              value={this.state.Reason} placeholder="Enter the reason..." onChange={this.getChangeHandler} bsSize="sm"/>
                </FormGroup>:null
                  }
                
				

				<Col xs="4">
				<br />
                    <FormGroup>
				<Button type="submit" size="sm" color="success" onClick={this.Update} data-dismiss={this.state.model} disabled={this.state.show}>Submit</Button>
				&nbsp;&nbsp;&nbsp;&nbsp;
                <Button type="reset" size="sm" color="danger" onClick={this.resetForm}>Reset</Button>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Button type="reset" size="sm" color="primary" data-dismiss="modal">Cancel</Button>
                
                </FormGroup>
				</Col>
              </CardBody>
			  
            
          </Col>
        </Row>
          

    </div>
      );
    }
  }
  
  export default ReturnAsset;