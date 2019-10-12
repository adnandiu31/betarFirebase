import React, {Component} from 'react';
import {base} from '../firebase/firebase';
import Stations from './Manual';
import Register from './Register';
import FAQ from './FAQ'
import {Link} from 'react-router-dom'

  class Dashboard extends Component {
    constructor(props){
      super(props)

      this.state={
        userInfo: null,
        intentBundle: null
      }
    }
    componentDidMount(){
      this.ref = base.syncState(`users/${this.props.user.uid}`, {
        context: this,
        state: "userInfo",
      });
      this.ref = base.syncState(`users/${this.props.user.uid}/intents`,{
        context: this,
        state: "intentBundle"
      })
    }

    createIntentBundle = (id, intentName, intentType, intentYear, intentList) => {
      const intentBundle = { ...this.state.intentBundle}
      intentBundle[`${id}`]={
        "items" : intentList,
        "name"  : intentName,
        "type"  : intentType,
        "year"  : intentYear
      }

      this.setState({intentBundle})
    }

    deleteIndent = (id) => {
      console.log(id)
      const userInfo = { ...this.state.userInfo}
      userInfo[`running-intent`][`items`][`${id}`] = null
      this.setState({userInfo})
    }

    indentApproval = (id) => {
      console.log(id)
      console.log("hi")
      console.log(this.state.intentBundle)
    }

    addProductIntent = (
      id,
      name,
      model,
      manufacturer,
      selected, 
      lastYear, 
      nextYear,
      use,
  ) => {
    const userInfo = { ...this.state.userInfo };
    userInfo[`running-intent`][`items`][`${id}`]={
        
        "last-year": lastYear,
        "next-year": nextYear,
        "product-manufacturer" : manufacturer, 
        "product-model" :  model,
        "product-name" : name,
        "selected" : selected,
        "use": use
      };
    this.setState({userInfo});
  };

    updateRunningIntentSelected = (id, selected) => {
      const userInfo = {...this.state.userInfo}
      userInfo[`running-intent`][`items`][`${id}`][`selected`]=selected;
      this.setState({userInfo})
      // console.log("hi")
    }

    updateRunningIntentProductManufacturer = (id, manufacturer) => {
      const userInfo = {...this.state.userInfo}
      userInfo[`running-intent`][`items`][`${id}`][`product-manufacturer`] = manufacturer;
      this.setState({userInfo})
    }

    updateRunningIntentProductModel = (id, model) => {
      const userInfo = {...this.state.userInfo}
      userInfo[`running-intent`][`items`][`${id}`][`product-model`] = model;
      // this.setState({userInfo})
      this.setState((state,props)=>({
        userInfo: state.userInfo + props.userInfo
      }))
    }

    updateRunningIntentProductName = (id, name) => {
      const userInfo = {...this.state.userInfo}
      userInfo[`running-intent`][`items`][`${id}`][`product-name`] = name;
      this.setState({userInfo})
    }

    updateRunningIntentLastYear = (id, lastYear) => {
      const userInfo = {...this.state.userInfo}
      userInfo[`running-intent`][`items`][`${id}`][`last-year`] = lastYear;
      this.setState({userInfo})
    }

    updateRunningIntentNextYear = (id, nextYear) => {
      const userInfo = {...this.state.userInfo}
      userInfo[`running-intent`][`items`][`${id}`][`next-year`] = nextYear;
      this.setState({userInfo})
    }

    updateRunningIntentUse = (id, use) => {
      const userInfo = {...this.state.userInfo}
      userInfo[`running-intent`][`items`][`${id}`][`use`] = use;
      this.setState({userInfo})
    }

    updateRunningIntentSelected = (id, selected) => {
      const userInfo = {...this.state.userInfo}
      userInfo[`running-intent`][`items`][`${id}`][`selected`] = selected;
      this.setState({userInfo})
    }

    updateIntent = (new_intent) => {
      const curr_intent = this.state.userInfo.intents
      curr_intent.push(new_intent)

      const userInfo = {...this.state.userInfo}
      userInfo['intents'] = curr_intent

      this.setState({userInfo})

    }

    render() {
      return  (
        this.state.userInfo!==null?
        <>
          <div style={{
              background:'#007bff',
              position: 'sticky',
              top: 0,
              zIndex: 100
            }} 
            className="top-nav"
          >
            <ul className="nav nav-tabs">
              <li className="nav-item">
                <Link to="/manual-list" >
                    <a style={{color: 'black'}} className="nav-link" >Manual List</a>                
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/register">
                  <a style={{color: 'black'}} className="nav-link" >Trouble Shooting Register</a>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/FAQ">
                  <a style={{color: 'black'}} className="nav-link" >FAQ</a>
                </Link>
              </li>              
            </ul>
          </div>
          <div className="main">
            
            <Stations />
            <Register />
           
           
          </div>
        </>:<h1>Session Out</h1>
      )
    }
  }
  
  
  export default Dashboard;
