/*--------------------
<--- START IMPORT --->
-------------------- */
// Blockchain assets
import getBlockchain from './ethereum.js';
import { ethers, Contract } from "ethers";
import React, {useState, useEffect} from 'react';

// Design assets + some pieces that are living in another file
import './App.css';
import ReactDOM from "react-dom";

// Super sick animation library, you can just add info to a div to animate it
import AOS from 'aos';
import 'aos/dist/aos.css';

// Alert library to show cool alerts based on errors
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Animated number library
import AnimatedNumber from "animated-number-react";

// Full host of components that we can customize. They're much nicer than 
// regular Bootstrap components. Argon uses all of these with his own customization.
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardSubtitle,
  CardTitle,
  Container,
  Col,
  FormGroup,
  Form,
  Input,
  InputGroupText,
  InputGroup,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  PopoverBody,
  PopoverHeader,
  Row,
  UncontrolledPopover
} from "reactstrap";
/*--------------------
<--- END IMPORT --->
-------------------- */

AOS.init({duration:2000});


// React webpages are divided into components that can be imported from
// other folders and etc. In this case, we have fuction App(). This is a 
// function that is exported in it's entirety to index.html. This function
// contains logic code AND HTML to be rendered.
//
// As far as the HTML is concerned, we are injecting './views/ActualPage.js' into here.
// We are basically creating our own divs then inserting <ActualPage /> as a component
// into our HTML. We can do this with anything. 
//
// For the next project, we can organize components much more easily.
function App() { //@note App Start
  // //Set the state for some constants to be updated
  // const [superbowl, setSuperBowl] = useState(undefined);
  // const [userInfo, setUserInfo] = useState(undefined);
  //Initializer function to connect to and get user's metamask info
  // useEffect(() => {
  //   const init = async () => {
  //     const { superbowl } = await getBlockchain();
  //     const data = await superbowl.getInfo();
  //     setSuperBowl(superbowl);
  //     setUserInfo(data)
  //     };
  //   init();
  // }, []);

  


  var bg = require('./assets/img/logos/stadium-image.jpg')
  var bengalsBG = require('./assets/img/logos/bengals-stadium.jpg')
  var ramsBG = require('./assets/img/logos/rams-stadium.jpg')
  var usd = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  // var usdtTokenAddress = '0x55d398326f99059ff775485246999027b3197955'
  var usdtTokenAddress = '0x78867bbeef44f2326bf8ddd1941a4439382ef2a7'//busd testnet token

  


  // var newSuperBowl = new ethers.Contract(
  //   SuperBowlPool.networks['97'].address,
  //   SuperBowlPool.abi,
  //   superbowl.signer)

  //   console.log(newSuperBowl)

  // Do not load the page until Metamask connection has been established
  
    // const contractAddress = superbowl.address;
    // const userWalletAddress = superbowl.signer.provider.provider.selectedAddress;

    // // Create a new contract interaction object that contains info we need
    // // for checkAllowance. We need to know if we are allowed to spend the
    // // user's money.
    // const preCheckAllowance = new ethers.Contract(
    //   usdtTokenAddress,
    //   ['function allowance(address owner, address spender) external view returns(uint256)'],
    //   superbowl.signer)

    // // Create a new contract interaction object that contains info we need 
    // // for requestApprovalForSpend
    // const preRequestApproval = new ethers.Contract(
    //   usdtTokenAddress, 
    //   ['function approve(address spender, uint amount) public returns(bool)'],
    //   superbowl.signer);
    
    // // Create a contract object to get user BUSD balance from wallet.
    // const checkUserWalletUsdt = new ethers.Contract(
    //   usdtTokenAddress,
    //   ['function balanceOf(address account) external view returns (uint256)'],
    //   superbowl.signer);

    
    // superbowl.getInfo().then(value =>{
    //   // var playersChoice = value.playersChoice;
    //   var playersChoice = '1';
    //   if (playersChoice === '1'){
    //     document.getElementById('teamChoice').innerHTML = 'Bengals'
    //   } else if (playersChoice === '2') {
    //     document.getElementById('teamChoice').innerHTML = 'Rams'
    //   }
    //   // var userTotalBet = usd.format(ethers.utils.formatEther(value.playersInvestment));
    //   var userTotalBet = '20'
    //   document.getElementById('userTotalBet').innerHTML = userTotalBet;
      
    //   // var totalEntirePool = value.totalEntirePool;
    //   var totalEntirePool = '100';

    //   // var totalBengalsPool = value.totalPool1;
    //   var totalBengalsPool = '150342';
    //   // document.getElementById('cards').totalRamsPool = totalBengalsPool

    //   // var totalRamsPool = value.totalPool2;
    //   var totalRamsPool = '250234';
    //   // console.log(document.getElementById('cards').attributes) //@note follow

    //   var userPotentialWinnings = Number(userTotalBet);
    // })



  class PlaceBetModal extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        modal: false
      };
      this.toggle = this.toggle.bind(this);
    }
    toggle() {
      this.setState({
        modal: !this.state.modal
      });
    }
    render() {
      function handleSubmit(event) {
        event.preventDefault()
      }
      
      return (
        <div className="text-center p-2">
          <Button
            className={this.props.buttonStyles}
            type="button"
          onClick={this.toggle}>
            <span>BET</span>
          </Button>
          <Modal 
          className="modal-dialog-centered"
          size="sm"
          isOpen={this.state.modal} 
          toggle={this.toggle}>
            <div className="modal-body p-0">
              <Card className="bg-secondary shadow border-0">
                <CardHeader className={this.props.modalHeader}>
                  <CardTitle className={this.props.cardTitle} >
                    {this.props.titleText}
                  </CardTitle>
                  </CardHeader>
                  <CardBody className={this.props.cardBody}>
                    <Form onSubmit={handleSubmit}>
                      <FormGroup>
                        <Label className={this.props.cardBody}>Enter your betting amount:</Label>
                        <InputGroup>
                        <InputGroupText className="league-placeholder ">
                          $  
                        </InputGroupText>
                        <Input className="text-center league-placeholder" placeholder="Amount (USDT) min 20"></Input>
                        </InputGroup>
                      </FormGroup>
                      <Button type="submit" className={this.props.betStyles}>Place Bet</Button>
                    </Form>
                  </CardBody>
              </Card>
            </div>
          </Modal>
        </div>
      );
    }
  }




  class Cards extends React.Component {
    constructor (props) {
      super(props);
      this.state= {
        bengalHover: false,
        ramHover: false
      };
    }
    handleBengalHover() {
      this.setState({bengalHover: !this.state.bengalHover});
    }
    handleRamHover() {
      this.setState({ramHover: !this.state.ramHover});
    }
    formatValue = (value) => `${usd.format(value)}`;

    render() {
      var bengalStyle={
        transform: this.state.bengalHover ? 'translateY(-15px) translateX(-15px)' : 'none',
        backgroundImage: "url("+bengalsBG+")",
        border: "4px solid #f54e0d"
      }  
      var ramStyle={
        transform: this.state.ramHover ? 'translateY(-15px) translateX(15px)' : 'none',
        backgroundImage: "url("+ramsBG+")",
        border:"4px solid #f9cc02"
      }
      
      

      
      return (
        <>
          <Container className="pt-3">
            <Row>
              <Col data-aos="fade-down-right">
                <Card  className="card-profile shadow border-radius-round"
                onMouseEnter={()=>this.handleBengalHover()} onMouseLeave={()=>this.handleBengalHover()}
                style={bengalStyle}>
                  <Container className="p-4">
                    <Row className="justify-content-center">
                      <img
                        alt="..."
                        src={require("./assets/img/logos/bengals-logo.png")}
                        height="150px"
                        background-color="white"
                      />
                    </Row>
                  </Container>
                  <div
                    style={{ 
                      backgroundColor:'#f54e0d',
                      fontFamily:'Bengals',
                      fontSize:'2.5rem',
                      color:'black'
                    }} className="p-2 text-center">
                    Cincinatti Bengals
                  </div>
                  <div className="text-center font-weight-bold pt-5"
                    style={{ 
                      color:"white",
                      fontFamily:"SuperBowl"
                    }}>
                    TOTAL POOL SIZE
                  </div>
                  <div className="display-2 text-center" style={{ 
                    fontFamily:'SuperBowl',
                    color:'#d0d9df'}}>
                    <AnimatedNumber 
                    value={this.props.bengalsPool}
                    formatValue={this.formatValue}
                    duration="2000"/>
                  </div>
                  
                  <PlaceBetModal 
                    buttonStyles="btn-1 ml-1 bengalsButton"
                    modalHeader="Modal-Header-Bengals"
                    cardTitle="text-center bengals-font-black display-1"
                    titleText="Go Bengals!"
                    cardBody="px-lg-3 text-center bengals-card-body"
                    betStyles="text-center bengalsBetButton"
                  />
                </Card>
              </Col>
              <Col data-aos="fade-down-left">
                <Card  className="card-profile shadow border-radius-round"
                onMouseEnter={()=>this.handleRamHover()} onMouseLeave={()=>this.handleRamHover()}
                style={ramStyle}>
                  <Container className="p-4">
                  <Row className="justify-content-center">
                    <img
                      alt="..."
                      src={require("./assets/img/logos/rams-logo.png")}
                      height="150px"
                    />
                  </Row>
                  </Container>
                  <div
                  style={{ 
                    backgroundColor:'#f9cc02',
                    fontSize:'2.3rem',
                    color:'#18319b',
                    fontFamily:'Rams'
                  }} className="p-2 display-3 text-center">Los Angeles Rams</div>
                  <div className="text-center font-weight-bold pt-5"
                  style={{ 
                    color:"white",
                    fontFamily:"SuperBowl"
                  }} >TOTAL POOL SIZE</div>
                  <div className="display-2 text-center" style={{ 
                    fontFamily:'SuperBowl',
                    color:'#d0d9df'
                  }}>
                    <AnimatedNumber 
                    value={this.props.ramsPool}
                    formatValue={this.formatValue}
                    duration="2000"/>
                  </div>
                  
                  <PlaceBetModal 
                    buttonStyles="btn-1 ml-1 ramsButton"
                    modalHeader="Modal-Header-Rams"
                    cardTitle="text-center rams-font-blue"
                    titleText="Go Rams!"
                    cardBody="px-lg-3 text-center rams-card-body"
                    betStyles="text-center ramsBetButton"
                  />
                </Card>
              </Col>
            </Row>
          </Container>
        </>
      );
    }
  }
// After we write all logic related to our HTML page, we can start
// our HTML. Here, we inject components that we wrote earlier
// and specify different functions above to run when we click on different
// buttons. 
  if(
    typeof superbowl === 'undefined'
  ) {
    return (
      <>
    <div style={{
        backgroundColor:"#171941",
        height:'100%'
      }}>
      </div>
      </>

    )
  }
  return (
    <>
    <div style={{
        backgroundColor:"#171941"
      }}>
      <Container className="pt-2">
        <Row>
        <Col></Col>
        <Col data-aos="fade-down" className="text-center d-block d-sm-block">
          <img
          alt="..."
          src={require("./assets/img/logos/super-bowl-logo.png")}
          height="150px"
          />
        </Col>
        <Col className="text-right d-block d-sm-block">
        </Col>
        </Row>
      </Container>
      <Container className="pb-9">
        <h1 className="text-center" style={{ 
          fontFamily:'SuperBowl',
          color:'#d0d9df'
        }}> SUPER BOWL LVI POOL</h1>

        <Cards bengalsPool="2" ramsPool="4"/>


        <Card className="mt-5 pb-4 border-radius-round" id="gamblerDashboard"  >
          <h1 className="text-center pt-3 pb-3"
          style={{ 
            fontFamily:'SuperBowl',
            color:"#281383"
          }}>Gamblers Dashboard</h1>
          <Container >
            <Row>
              <Col>
                <Card className="p-2 m-2 shadow"
                style={{
                  fontFamily:'SuperBowl',
                  color:"#281383",
                  backgroundColor: '#ffffff'
                }}>
                  <CardTitle className="text-center">
                    Total bet
                  </CardTitle>
                  <CardBody className="text-center">
                    <h2 id="userTotalBet"></h2>
                  </CardBody>
                </Card>
              </Col>
              <Col>
                <Card className="p-2 m-2 shadow"
                style={{
                  fontFamily:'SuperBowl',
                  color:"#281383",
                  backgroundColor: '#ffffff'
                }}>
                  <CardTitle className="text-center">
                    Team
                  </CardTitle>
                  <CardBody className="text-center">
                    <h2 id="teamChoice"></h2>
                  </CardBody>
                  </Card>
              </Col>
              <Col>
                <Card className="p-2 m-2 shadow"
                style={{
                  fontFamily:'SuperBowl',
                  color:"#281383",
                  backgroundColor: '#ffffff'
                }}>
                  <CardTitle className="text-center">
                    Potential winnings
                  </CardTitle>
                  <CardBody className="text-center">
                    <h2 className="text-success"id="userPotentialWinnings"></h2>
                  </CardBody>

                  </Card>
              </Col>
            </Row>
          </Container>
        </Card>
        <Card className="ml-8 mr-8 mt-5 pb-4 border-radius-round" id="gamblerDashboard"  >
          <Container>
          <h2 className="text-center pt-3 pb-3"
          style={{ 
            fontFamily:'SuperBowl',
            color:"#281383"
          }}>How does this work?</h2>
          </Container>
        </Card>
        

      </Container>
      </div>
    </>
    );
}

export default App;
