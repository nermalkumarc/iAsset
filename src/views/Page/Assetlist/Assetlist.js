import React, { Component } from 'react';
//import ReactDOM from 'react-dom';
import { CardBody, Row } from 'reactstrap';
import Createasset from '../Createasset/Createasset';
import { MDBDataTable } from 'mdbreact';
import { MDBBtn } from 'mdbreact';
import '../Theme.css';

class Assetlist extends Component {

  constructor(props) {
    super(props)
    this.state = {
      title: '',
      value1: '',
      data1: { columns: [], rows: [] },
    }
    this.Reset = this.Reset.bind(this);

  }

  Reset = () => {
    this.setState({
      value1: null
    })
  }

  handleChangeInput1 = () => {
    this.setState({
      title: "Add",
      value1: "",
    });
  }
  handleChangeInput = (data) => {
    console.log(data.data);
    this.setState({
      title: "Update",
      value1: data.data
    });
  }
  componentDidMount() {
    this.getProducts();
    this.setState({
      value1: ""
    });
  }

  getProducts = () => {
    let resultant = fetch('http://localhost:5000/assetlist')
      .then(response => response.json())
      .then(({ data }) => {
        console.log(data);
        for (let i = 0; i < data.length; i++) {
          data[i]['Edit'] = <MDBBtn data-toggle="modal" data-target="#myModal1" onClick={() => this.handleChangeInput({ data: data[i]['ID'] })} color="success" size="sm">Update
         </MDBBtn>
        }

        this.setState({
          data1: {
            columns: [
              {
                label: 'Code',
                field: 'Code',
                sort: 'asc',
                width: 150
              },
              {
                label: 'Name',
                field: 'Name',
                sort: 'asc',
                width: 100
              },
              {
                label: 'Brand Name',
                field: 'Brand Name',
                sort: 'asc',
                width: 200
              },
              {
                label: 'Status',
                field: 'Status',
                sort: 'asc',
                width: 150
              },
              {
                label: 'Edit',
                field: 'Edit',
                sort: 'asc',
                width: 100
              },
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

    return (
      <div>
        <div className="animated fadeIn" tabIndex="-1">
          <button data-toggle="modal" data-target="#myModal1" className="float" onClick={this.handleChangeInput1}>
            <i className="fa fa-plus my-float"></i>
          </button>
        </div>
        <div className="card">
          <div className="card-header">
            <i className="icon-screen-desktop"></i>ASSET LIST
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
          <div className="modal-dialog  modal-md ">
            <div className="modal-content">
              <div className="modal-header">
                <div><strong>{this.state.title}&nbsp;Asset</strong></div>
                <button type="button" onClick={this.Reset} className="close" data-dismiss="modal"><strong>&times;</strong></button>
              </div>
              <div className="modal-body ">
                <Createasset key={this.state.value1} code={this.state.value1} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Assetlist;
