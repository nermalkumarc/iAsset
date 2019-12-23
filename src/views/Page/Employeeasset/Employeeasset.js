import React, { Component } from 'react';
import { CardBody, Row } from 'reactstrap';
import { MDBDataTable } from 'mdbreact';
// import './AddEmployeeasset.css';
import ReturnAsset from '../ReturnAsset/ReturnAsset';
import AddEmployeeasset from '../AddEmployeeasset/AddEmployeeasset';
import '../Theme.css';
import { NavLink } from 'react-router-dom';
class Employeeasset extends Component {
  
constructor(props){
  super(props)
  this.state={
    // tablerow:[],
    // data1:{columns:[],rows:[]},
    value1:'',
    value2:'',
    data1:{columns:[],rows:[]},
  }
  this.resetForm = this.resetForm.bind(this);
  }
  resetForm = () =>
  {
    this.setState({
      value1:null
    })
  }
  handleChangeInput = (data,data1) => {
    console.log(data.data)
   
      this.setState({ value1: data.data1 ,value2:data1.data});
      
    }
    componentDidMount(){
      this.getProducts();
     }
    
    componentDidMount(){
  this.getProducts();
    }
     
    getProducts= () =>{
      let resultant=fetch('http://localhost:5000/employeeassetlist')
      .then(response=>response.json())
      .then(({data})=>{
        
       for(let i=0;i<data.length;i++){
        
         data[i]['edit']= <button className="btn btn-sm btn-success" data-toggle="modal" data-target="#myModal1"  onClick={()=>this.handleChangeInput({data1:data[i]['EmpCode']},{data:data[i]['Code']})} color="success" size="sm">Return
       </button> 
      
       }
        console.log('name',data)
        this.setState({tablerow:data});
      
        this.setState({data1:{columns:[
            {
              label: 'Name',
              field: 'Name',
              sort: 'asc',
              width: 150
            },
            {
              label: 'Code',
              field: 'Code',
              sort: 'asc',
              width: 150
            },
            {
              label: 'DU',
              field: 'position',
              sort: 'asc',
              width: 270
            },
            {
              label: 'Designation',
              field: 'Empdes',
              sort: 'asc',
              width: 200
            },
            {
              label: 'Asset Id',
              field: 'Empdept',
              sort: 'asc',
              width: 100
            },
            {
              label: 'Asset Name',
              field: 'Assetname',
              sort: 'asc',
              width: 100
            },
            {
              label: 'Issued Date',
              field: 'date',
              sort: 'asc',
              width: 150
            },
            {
              label: 'Action',
              field: 'action',
              sort: 'asc',
              width: 100
            }
          ],
          rows:data
        } 
        });
  
      return data;
   
      })
      .catch(err =>{
        console.log(err)
      })
  
      console.log("values"+JSON.stringify(resultant))
    }
  
  render() {
    return (
      <div>
      <div className="animated fadeIn" tabIndex="-1">
        <button class="float" data-toggle="modal" data-target="#myModal2">
          <i class="fa fa-plus my-float"></i>
        </button>
        <div className="card">
          <div className="card-header">
            <i className="icon-list"></i>EMPLOYEE ASSET
          </div>
          <div className="card-body">
            <Row>
              <CardBody>
              <MDBDataTable
      
      bordered
      hover
      data={this.state.data1}
    />
              </CardBody>
            </Row>
          </div>
        </div>
        <div id="myModal1" className="modal  fade " tabIndex="-1" role="dialog">
         <div className="modal-dialog  modal-lg ">
      <div className="modal-content">
         
         <div className="modal-header">
         <div><strong>Return Asset</strong></div>
           <button type="button" onClick={this.resetForm} className="close" data-dismiss="modal">&times;</button>
        </div>
          
        <div className="modal-body ">
       <ReturnAsset key={this.state.value1} code={this.state.value1} id={this.state.value2}/>
        
        
      </div>
      
    </div>

 </div> 
</div>
<div id="myModal2" className="modal  fade " tabIndex="-1" role="dialog">
         <div className="modal-dialog  modal-lg ">
      <div className="modal-content">
         
      <div className="modal-header">
         <div><strong>Add Employee Asset</strong></div>
           <button type="button" className="close" data-dismiss="modal">&times;</button>
        </div>
          
        <div className="modal-body ">
       <AddEmployeeasset />
        
        
      </div>
      
    </div>

 </div> 
</div>
      </div>
      </div>
    );
  }
}

export default Employeeasset;
