/*--------------------
<--- START IMPORT --->
-------------------- */
// Blockchain assets
import getBlockchain from './ethereum.js';
import { ethers, Contract } from "ethers";
import React, {useState, useEffect} from 'react';
import SuperBowlPool from './contracts/SuperBowlPool.json';

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

// Video
import Superbowl from './assets/vid/superbowl.mp4'

// Full host of components that we can customize. They're much nicer than 
// regular Bootstrap components. Argon uses all of these with his own customization.
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
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
var bg = require('./assets/img/logos/stadium-image.jpg')
var bengalsBG = require('./assets/img/logos/bengals-stadium.jpg')
var ramsBG = require('./assets/img/logos/rams-stadium.jpg')
var usd = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});
// var usdcTokenAddress = '0x55d398326f99059ff775485246999027b3197955'
var usdcTokenAddress = '0x78867BbEeF44f2326bF8DDd1941a4439382EF2A7'//busd testnet token

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
const App = ()=>{ //@note App Start
 

  //Set the state for some constants to be updated
  const [superbowl, setSuperBowl] = useState(undefined);
  //Initializer function to connect to and get user's metamask info
  useEffect(() => {
    const init = async () => {
      const { superbowl } = await getBlockchain();
      setSuperBowl(superbowl);
      };
    init();
  }, []);
  
  if (typeof superbowl !== 'undefined'){
    const contractAddress = superbowl.address;
    const userWalletAddress = superbowl.signer.provider.provider.selectedAddress;


    superbowl.getInfo().then(value =>{
        
        
        var userTotalBet = ethers.utils.formatEther(value.playersInvestment);
        document.getElementById('userTotalBet').innerHTML = usd.format(userTotalBet);
        
        var totalEntirePool = Number(value.totalEntirePool.toString()) / Number('0.9');
  
        var totalBengalsPool = ethers.utils.formatEther(value.totalPool1).toString();
        // var totalBengalsPool = '150342';
        if (Number(totalBengalsPool)<Number('10000')){
          var promoPool = Number(totalBengalsPool) + Number('1000')
          document.getElementById('bengalsPoolNumber').innerHTML = usd.format(promoPool);
        }
        
        var totalRamsPool = ethers.utils.formatEther(value.totalPool2).toString();
        if (Number(totalRamsPool)<Number('10000')){
          var promoPool = Number(totalRamsPool) + Number('1000')
          document.getElementById('ramsPoolNumber').innerHTML = usd.format(promoPool);
        }
        // document.getElementById('ramsPoolNumber').innerHTML = usd.format(totalRamsPool);

        var playersChoice = value.playersChoice.toString();
        if (playersChoice === '1'){
          document.getElementById('teamChoice').innerHTML = 'Bengals'
          var userPotentialWinnings = Number(userTotalBet) / Number(totalBengalsPool) * Number(totalRamsPool) + Number(userTotalBet)
        } else if (playersChoice === '2') {
          document.getElementById('teamChoice').innerHTML = 'Rams'
          var userPotentialWinnings = Number(userTotalBet) / Number(totalRamsPool) * Number(totalBengalsPool) + Number(userTotalBet)
        } else if (playersChoice === '0') {
          document.getElementById('teamChoice').innerHTML = '?'
          var userPotentialWinnings = '0'
        }
        document.getElementById('userPotentialWinnings').innerHTML = usd.format(userPotentialWinnings);
      })
  }


  class ClaimButton extends React.Component {

    makeWithdrawal(){
      console.log('hello')
      superbowl.withdraw()
    }
    render(){
      return(
        <Button
        onClick={this.makeWithdrawal}
        >Claim</Button>
      )
    }
  }

  class PlaceBetModal extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        modal: false,
        hidden: 'hidden',
        amount: ''
      };
      this.toggle = this.toggle.bind(this);
    }
    toggle() {
      this.setState({
        modal: !this.state.modal
      });
      
    }

    handleApprovalClicked = async (e) =>{
      const contractAddress = superbowl.address;
      const approvalAmount = ethers.utils.parseEther(String(this.state.amount)+String('1000'));
      const requestApproval = new ethers.Contract(
        usdcTokenAddress, 
        ['function approve(address spender, uint amount) public returns(bool)'],
        superbowl.signer);
      const approval = await requestApproval.approve(contractAddress,approvalAmount).then(resolve =>{
        toast.success('Hooray! Your transaction is currently processing.')
      }, reject =>{
        toast.error("Oh no! Looks like Metamask confirmation was rejected. You can try again.")
      });
    }

    handleAmountChanged(event){
      this.setState({
        amount: event.target.value
      });
    }

    handleButtonClicked = async () =>  {

      const teamChoice = this.props.selection;
      const betAmount = ethers.utils.parseEther(this.state.amount);
      
      const tx = await superbowl.makeBet(
        teamChoice,
        betAmount
      ).then(resolve => {
        console.log('Approval agreement')
        toast.success('Hooray! Your transaction is currently processing.')
      },error => {
        toast.error("Oh no! Looks like Metamask confirmation was rejected. You can try again.")
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
                  <CardTitle data-aos="zoom-in"className={this.props.cardTitle} >
                    {this.props.titleText}
                  </CardTitle>
                  </CardHeader>
                  <CardBody className={this.props.cardBody}>
                    <Form>
                      <FormGroup>
                        <Label className={this.props.cardBody}>Enter your betting amount:</Label>
                        <InputGroup>
                        <InputGroupText className="league-placeholder ">
                          $  
                        </InputGroupText>
                        <Input 
                        className="text-center league-placeholder" 
                        placeholder="Amount (USDC) min 20"
                        onChange={this.handleAmountChanged.bind(this)}
                        ></Input>
                        </InputGroup>
                      </FormGroup>
                      <Button className={this.props.betStyles}onClick={this.handleApprovalClicked.bind(this)}>Approve</Button>
                      <Button className={this.props.betStyles} onClick={this.handleButtonClicked.bind(this)}>Submit</Button>
                      

                    </Form>
                  </CardBody>
                  <CardFooter className="text-center p-1 greyBackground">
                    <small className="text-muted font-weight-bold">Powered by</small><br/>
                    <img
                      alt="..."
                      src={require("./assets/img/logos/usdc-logo.png")}
                      height="20px"
                      />
                      <img
                      className="pl-3"
                      src={require("./assets/img/logos/bsc-logo.png")}
                      height="20px"
                      />
                      <img
                      className="pl-3"
                      src={require("./assets/img/logos/metamask-logo.png")}
                      height="20px"
                      />
                  </CardFooter>
              </Card>
            </div>
          </Modal>
        </div>
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
    
  }
  return (
    <>
    <div style={{
        backgroundColor:"#171941"
      }}>
        <video autoPlay loop muted
        style={{
          position:"absolute",
          width:'100%',
          left:'50%',
          top:'50%',
          height:'100%',
          objectFit:'cover',
          transform:'translate(-50%,-50%)',
          zIndex:'-1' 
        }}>
          <source src={Superowl} type="video/mp4"/>
        </video>
      <Container className="pt-2">
        <Row>
        <Col>
        
        </Col>
        <Col data-aos="fade-down" className="text-center d-block d-sm-block">
          <img
          alt="..."
          src={require("./assets/img/logos/super-bowl-logo.png")}
          height="150px"
          />
        </Col>
        <Col className="text-right d-block d-sm-block text-white">
          
        </Col>
        </Row>
      </Container>
      <Container className="pb-9">
        <h1 className="text-center" style={{ 
          fontFamily:'SuperBowl',
          color:'#d0d9df'
        }}> SUPER BOWL LVI BETS</h1>



          <Container className="pt-3">
            <Row>
              <Col >
                <Card  data-aos="fade-down-right" className="card-profile shadow border-radius-round"
                style={{
                  backgroundImage: "url("+bengalsBG+")",
                  border: "4px solid #f54e0d"
                }}>
                  <Container className="p-4">
                    <Row data-aos="zoom-in" className="justify-content-center">
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
                    TOTAL PRIZE POOL
                  </div>
                  <div id="bengalsPoolNumber" className="display-2 text-center" style={{ 
                    fontFamily:'SuperBowl',
                    color:'#d0d9df'}}>

                  </div>
                  
                  <PlaceBetModal 
                    selection='1'
                    buttonStyles="btn-1 ml-1 bengalsButton"
                    modalHeader="Modal-Header-Bengals"
                    cardTitle="text-center bengals-font-black display-1"
                    titleText="Go Bengals!"
                    cardBody="px-lg-3 text-center bengals-card-body"
                    betStyles="text-center bengalsBetButton"
                    id="bengalsModal"
                  />
                </Card>
              </Col>
              <Col >
                <Card data-aos="fade-down-left" className="card-profile shadow border-radius-round"
                style={{
                  backgroundImage: "url("+ramsBG+")",
                  border:"4px solid #f9cc02"
                }}>
                  <Container data-aos="zoom-in" className="p-4">
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
                  }} >TOTAL PRIZE POOL</div>
                  <div id='ramsPoolNumber' className="display-2 text-center" style={{ 
                    fontFamily:'SuperBowl',
                    color:'#d0d9df'
                  }}>

                  </div>
                  
                  <PlaceBetModal 
                    selection='2'
                    buttonStyles="btn-1 ml-1 ramsButton"
                    modalHeader="Modal-Header-Rams"
                    cardTitle="text-center rams-font-blue"
                    titleText="Go Rams!"
                    cardBody="px-lg-3 text-center rams-card-body"
                    betStyles="text-center ramsBetButton"
                    id="ramsModal"
                  />
                </Card>
              </Col>
            </Row>
          </Container>






        <Card className="mt-5 pb-4 border-radius-round" id="gamblerDashboard"  >
          <h1 className="text-center pt-3 pb-3"
          style={{ 
            fontFamily:'SuperBowl',
            color:"#171941"
          }}>Gamblers Dashboard</h1>
          <Container >
            <Row>
              <Col>
                <Card className="p-2 m-2 shadow"
                style={{
                  fontFamily:'SuperBowl',
                  color:"#281383",
                  backgroundColor: '#171941'
                }}>
                  <CardTitle className="text-center text-white">
                    Total bet
                  </CardTitle>
                  <CardBody className="text-center">
                    <h2 id="userTotalBet" className='text-white'></h2>
                  </CardBody>
                </Card>
              </Col>
              <Col>
                <Card className="p-2 m-2 shadow"
                style={{
                  fontFamily:'SuperBowl',
                  color:"#281383",
                  backgroundColor: '#171941'
                }}>
                  <CardTitle className="text-center text-white">
                    Team
                  </CardTitle>
                  <CardBody className="text-center text-white">
                    <h2 id="teamChoice" className="text-white"></h2>
                  </CardBody>
                  </Card>
              </Col>
              <Col>
                <Card className="p-2 m-2 shadow"
                style={{
                  fontFamily:'SuperBowl',
                  color:"#281383",
                  backgroundColor: '#171941'
                }}>
                  <CardTitle className="text-center text-white">
                    Potential winnings
                  </CardTitle>
                  <CardBody className="text-center">
                    <h2 className="text-success"id="userPotentialWinnings"></h2>
                  </CardBody>
                  
                  </Card>
              </Col>
            </Row>
            <Container className="text-center">
              <ClaimButton/>
            </Container>
            
          </Container>
          <div className="text-center font-weight-bold"><small>brought to you by the team behind Levenue</small></div>
        </Card>



        <Container style={{
          width:'90%'
        }}>
        <CardBody className="mt-5 pb-4 border-radius-round" id="gamblerDashboard" >
          <h2 className="text-center pt-3 pb-3"
          style={{ 
            fontFamily:'SuperBowl',
            color:"#171941"
          }}>How does it work?</h2>
          <Container className="px-2">
          <Card className="shadow text-center py-2"
          style={{
            backgroundColor:'#171941',
            fontFamily:'SuperBowl',
            color:'#d7dcdf'
          }}>
            <Container className="px-2">
            We are the world’s first pooled bets! <br/><br/>We got tired of the casinos making the money so we asked the question:
            <br/><br/>
            why can’t the community make the money instead?<br/>
            That’s exactly what we created here at Super Bowl Bets. <br/><br/> Whatever percent of your own pool you comprise of, will be the percentage of the losing team’s pool you will get.
            <br/><br/>
            Here’s how it works. <br/>
            <Card style={{
              backgroundColor:'#d7dcdf',
              color:'#171941'
            }}>
            Lets say you put in $10 on the Cincinnati Bengals and the entire pool for the Cincinnati Bengals is at $100. <br/><br/>
            If that’s the case, your bet comprised of 10% of the Cincinnati Bengals pool. Therefore, if the Cincinnati Bengals win, you win your full bet amount back AND 10% of the entire LA Rams pool! <br/><br/>So if the Rams have a pool of $2000, you’d win your initial bet of $100 AND an extra $200 which would bring your earnings to $300!!
            </Card><br/>
            You can only choose one team per wallet, so choose wisely!<br/><br/>
            </Container>
            </Card>
          </Container>
          <div className="text-center font-weight-bold"><small>brought to you by the team behind Levenue</small></div>
        </CardBody>
        </Container>
      </Container>
      </div>
    </>
    );
}

export default App;
