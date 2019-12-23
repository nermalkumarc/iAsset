import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import { Bar, } from 'react-chartjs-2';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';

// const bar = {
//   labels: ['Moniter', 'CPU', 'Mouse', 'Keyboard', 'Printer', 'Laptop', 'Mobile'],

//   datasets: [
//     {
//       data: [150, 125, 300, 250, 300, 95, 150, 75, 200, 200, 199, 75],
//       backgroundColor: "#20a8d8",
//       label: 'TOTAL'
//     },
//     {
//       data: [100, 92, 250, 200, 280, 85, 111, 68, 150, 180, 120, 60],
//       backgroundColor: "#ffc107",
//       label: 'IN USE'
//     }
//   ],
// };
// const options = {
//   tooltips: {
//     enabled: false,
//     custom: CustomTooltips
//   },
//   maintainAspectRatio: false
// }
// //Random Numbers
// function random(min, max) {
//   return Math.floor(Math.random() * (max - min + 1) + min);
// }

// var elements = 27;
// var data1 = [];
// var data2 = [];
// var data3 = [];

// for (var i = 0; i <= elements; i++) {
//   data1.push(random(50, 200));
//   data2.push(random(80, 100));
//   data3.push(65);
// }


class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);

    this.state = {
      TEmployee: "",
      TAsset: "",
      AvailAsset: "",
      dropdownOpen: false,
      radioSelected: 2,
      Monitor: "",
      CPU: "",
      Mouse: "",
      Keyboard: "",
      Desktop: "",
      Printer: "",
      Laptop: "",
      Mobile: "",
      UseMonitor: "",
      UseCPU: "",
      UseMouse: "",
      UseKeyboard: "",
      UsePrinter: "",
      UseLaptop: "",
      UseMobile: "",
      UseDesktop: ""
    };
    this.dashboard = this.dashboard.bind(this);
    this.dashboard();
  }

  dashboard = () => {

    console.log("connected successfully")

    fetch("http://localhost:5000/")
      .then(response => response.json())
      .then(({ All }) => {
        this.setState({
          TEmployee: All['DashBoard'].EmployeeCount,
          TAsset: All['DashBoard'].TotalAssets,
          AvailAsset: All['DashBoard'].AvailableCount,
        })
        for (let i = 0; i < All['Chart'].length; i++) {

          switch (All['Chart'][i].Name) {
            case "Monitor": this.setState({ Monitor: All['Chart'][i].Available, UseMonitor: All['Chart'][i].InUse })
              break;
            case "CPU": this.setState({ CPU: All['Chart'][i].Available, UseCPU: All['Chart'][i].InUse })
              break;
            case "Mouse": this.setState({ Mouse: All['Chart'][i].Available, UseMouse: All['Chart'][i].InUse })
              break;
            case "Keyboard": this.setState({ Keyboard: All['Chart'][i].Available, UseKeyboard: All['Chart'][i].InUse })
              break;
            case "Printer": this.setState({ Printer: All['Chart'][i].Available, UsePrinter: All['Chart'][i].InUse })
              break;
            case "Laptop": this.setState({ Laptop: All['Chart'][i].Available, UseLaptop: All['Chart'][i].InUse })
              break;
            case "Mobile": this.setState({ Mobile: All['Chart'][i].Available, UseMobile: All['Chart'][i].InUse })
              break;
            case "Desktop": this.setState({ Desktop: All['Chart'][i].Available, UseDesktop: All['Chart'][i].InUse })
              break;

          }
          // this.setState({
          //   TEmployee:All['DashBoard'].EmployeeCount,
          //   TAsset:All['DashBoard'].TotalAssets,
          //   AvailAsset:All['DashBoard'].AvailableCount,
          //   Monitor:All['Chart'][i].Name=='Monitor'?All['Chart'][i].Available:"",
          //   CPU:All['Chart'][0].Available,
          //   Mouse:All['Chart'][9].Available, 
          //   Keyboard:All['Chart'][3].Available,
          //   Printer:All['Chart'][10].Available,
          //   Laptop:All['Chart'][5].Available,
          //   Mobile:All['Chart'][6].Available,
          //   UseMonitor:All['Chart'][7].InUse,
          //   UseCPU:All['Chart'][0].InUse,
          //   UseMouse:All['Chart'][9].InUse, 
          //   UseKeyboard:All['Chart'][3].InUse,
          //   UsePrinter:All['Chart'][10].InUse,
          //   UseLaptop:All['Chart'][5].InUse,
          //   UseMobile:All['Chart'][6].InUse
          //  })
        }


      })

  }


  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  onRadioBtnClick(radioSelected) {
    this.setState({
      radioSelected: radioSelected,
    });
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  render() {

    const bar = {
      labels: ['Monitor', 'CPU', 'Mouse', 'Keyboard', 'Printer', 'Laptop', 'Mobile', 'Desktop'],

      datasets: [
        {
          data: [this.state.Monitor, this.state.CPU, this.state.Mouse, this.state.Keyboard, this.state.Printer, this.state.Laptop, this.state.Mobile, this.state.Desktop],
          backgroundColor: "#20a8d8",
          label: 'TOTAL'
        },
        {
          data: [this.state.UseMonitor, this.state.UseCPU, this.state.UseMouse, this.state.UseKeyboard, this.state.UsePrinter, this.state.UseLaptop, this.state.UseMobile, this.state.UseDesktop],
          backgroundColor: "#ffc107",
          label: 'IN USE'
        }
      ],
    };
    const options = {
      tooltips: {
        enabled: false,
        custom: CustomTooltips
      },
      maintainAspectRatio: false
    }
    //Random Numbers
    function random(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }

    var elements = 27;
    var data1 = [];
    var data2 = [];
    var data3 = [];

    for (var i = 0; i <= elements; i++) {
      data1.push(random(50, 100));
      data2.push(random(80, 100));
      data3.push(65);
    }

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="4" lg="4">
            <Card className="text-white bg-success">
              <CardBody className="pb-0">
                <i className='fa fa-4x fa-users'></i>
                <div className="text-value float-right" style={{ fontSize: '50px' }}>{this.state.TEmployee}</div>
                <div style={{ fontSize: '15px' }}>Total Employees</div>
              </CardBody>
              <div style={{ height: '25px' }}>
              </div>
            </Card>
          </Col>
          <Col xs="12" sm="4" lg="4">
            <Card className="text-white bg-primary">
              <CardBody className="pb-0">
                <i className='fa fa-4x fa-desktop'></i>
                <div className="text-value float-right" style={{ fontSize: '50px' }}>{this.state.TAsset}</div>
                <div style={{ fontSize: '15px' }}>Total Assets</div>
              </CardBody>
              <div style={{ height: '25px' }}>
              </div>
            </Card>
          </Col>
          <Col xs="12" sm="4" lg="4">
            <Card className="text-white bg-warning">
              <CardBody className="pb-0">
                <i className='fa fa-4x fa-laptop'></i>
                <div className="text-value float-right" style={{ fontSize: '50px' }}>{this.state.AvailAsset}</div>
                <div style={{ fontSize: '15px' }}>Available Assets</div>
              </CardBody>
              <div style={{ height: '25px' }}>
              </div>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <div className='text-value'>Assets </div>

              </CardHeader>
              <CardBody>
                <div className="chart-wrapper">
                  <Bar height="110px" data={bar} options={options} />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Dashboard;
