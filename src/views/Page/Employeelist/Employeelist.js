import React, { Component } from 'react';
import { CardBody, Row } from 'reactstrap';
import CreateEmployee from '../Createemployee/Createemployee';
import { MDBDataTable } from 'mdbreact';
import { MDBBtn } from 'mdbreact';
import '../Theme.css'
var $ = window.$;

class Employeelist extends Component {

  constructor(props) {
    super(props)
    this.state = {
      value1: null,
      data1: { columns: [], rows: [] },

    }
    this.baseState = this.state
    this.Reset = this.Reset.bind(this);


  }
  handleChangeInput1 = () => {
    this.setState({ value1: null });
  }
  handleChangeInput = (data) => {
    console.log(data.data)
    this.setState({ value1: data.data });
  }
  handleChangeParent = () => {
    this.getEmployees();
      $('#myModal1').modal('toggle');
  }
  Reset = () => {

    this.setState({
      value1: ""
    })
  }
  componentDidMount() {
    this.getEmployees();
  }

  getEmployees = () => {
    let resultant = fetch('http://localhost:5000/employeelist')
      .then(response => response.json())
      .then(({ data }) => {
        //console.log("data",data)
        for (let i = 0; i < data.length; i++) {
          //console.log(data[i]['Code'])
          data[i]['edit'] = <MDBBtn data-toggle="modal" data-target="#myModal1" onClick={() => this.handleChangeInput({ data: data[i]['Code'] })} color="success" size="sm">Update
         </MDBBtn>
        }

        this.setState({
          data1: {
            columns: [
              {
                label: 'Employee Code',
                field: 'Code',
                sort: 'asc',
                width: 150
              },
              {
                label: 'Employee Name',
                field: 'position',
                sort: 'asc',
                width: 270
              },
              {
                label: 'Department',
                field: 'Empdes',
                sort: 'asc',
                width: 200
              },
              {
                label: 'Designation',
                field: 'Empdept',
                sort: 'asc',
                width: 100
              },
              {
                label: 'Loaction',
                field: 'location',
                sort: 'asc',
                width: 150
              },
              {
                label: 'Edit',
                field: 'edit',
                sort: 'asc',
                width: 100
              }
            ],
            rows: data
          }
        });

        return data;

      })
      .catch(err => {
        console.log(err)
      })

    console.log("values" + JSON.stringify(resultant))
  }
  render() {

    const data = {
      columns: [
        {
          label: 'Name',
          field: 'name',
          sort: 'asc',
          width: 150
        },
        {
          label: 'Position',
          field: 'position',
          sort: 'asc',
          width: 270
        },
        {
          label: 'Office',
          field: 'office',
          sort: 'asc',
          width: 200
        },
        {
          label: 'Age',
          field: 'age',
          sort: 'asc',
          width: 100
        },
        {
          label: 'Start date',
          field: 'date',
          sort: 'asc',
          width: 150
        },
        {
          label: 'Salary',
          field: 'salary',
          sort: 'asc',
          width: 100
        }
      ],
      rows: [
        {
          name: 'Tiger Nixon',
          position: 'System Architect',
          office: 'Edinburgh',
          age: '61',
          date: '2011/04/25',
          salary: '$320'
        },
        {
          name: 'Rhona Davidson',
          position: 'Integration Specialist',
          office: 'Tokyo',
          age: '55',
          date: '2010/10/14',
          salary: '$327'
        }]
    }
    return (
      <div>
        <div className="animated fadeIn" tabIndex="-1">
          <button data-toggle="modal" data-target="#myModal1" className="float" onClick={this.handleChangeInput1}>
            <i className="fa fa-plus my-float"></i>
          </button>
        </div>
        <div className="card">
          <div className="card-header">
            <i className="icon-people"></i>EMPLOYEE LIST
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
        <div id="myModal1" className="modal  fade" toggle={this.toggle} tabIndex="-1" role="dialog">
          <div className="modal-dialog  modal-lg ">

            {/* <!-- Modal content--> */}
            <div className="modal-content">
              <div className="modal-header">
                <h4>Employee Form</h4>
                <button type="button" onClick={this.Reset} className="close" data-dismiss="modal">&times;</button>

              </div>
              <div className="modal-body ">
                <CreateEmployee key={this.state.value1} code={this.state.value1} onClick={this.handleChangeParent} />
                {/* //<p>Some text in the modal.</p> */}

              </div>
              <div className="modal-footer">
                {/* <button type="button" class="btn btn-default" data-dismiss="modal">Close</button> */}
              </div>
            </div>

          </div>
        </div>

        {/* <!--End of Modal content--> */}
      </div>
    );
  }
}

export default Employeelist;
