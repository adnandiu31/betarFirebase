import React, {Component} from 'react';
import {base} from '../firebase/firebase';
import Stations from './Stations';
import Manufactures from './Manufactures';
import Products from './Proructs';
import Intents from './Intents';
import SRB from './SRB'
import SIB from './SIB'
import Ledger from './Ledger'
import Users from './Users'

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
                <a style={{color: 'black'}} className="nav-link" href="#users">Users</a>
              </li>
              <li className="nav-item">
                <a style={{color: 'black'}} className="nav-link" href="#stations">Stations</a>
              </li>

              <li className="nav-item">
                <a style={{color: 'black'}} className="nav-link" href="#manufactures">Manufactures</a>
              </li>

              <li className="nav-item">
                <a style={{color: 'black'}} className="nav-link" href="#products">Products</a>
              </li>
              <li className="nav-item">
                <a style={{color: 'black'}} className="nav-link" href="#indent">Indent</a>
              </li>
              <li className="nav-item">
                <a style={{color: 'black'}} className="nav-link" href="#SRB">SRB</a>
              </li>
              <li className="nav-item">
                <a style={{color: 'black'}} className="nav-link" href="#SIB">SIB</a>
              </li>
              <li className="nav-item">
                <a style={{color: 'black'}} className="nav-link" href="#ledger">Ledger</a>
              </li>
            </ul>
          </div>
          <div className="main">
            {/* <Users />
            <Stations />
            <Manufactures />
            <Products /> */}
            <Intents 
              userInfo={this.state.userInfo}
              intentBundle={this.state.intentBundle}
              
              addProductIntent={this.addProductIntent}
              updateRunningIntentSelected={this.state.updateRunningIntentSelected}
              updateRunningIntentLastYear={this.updateRunningIntentLastYear}
              updateRunningIntentNextYear={this.updateRunningIntentNextYear}
              updateRunningIntentProductManufacturer={this.updateRunningIntentProductManufacturer}
              updateRunningIntentProductModel={this.updateRunningIntentProductModel}
              updateRunningIntentProductName={this.updateRunningIntentProductName}
              updateRunningIntentUse={this.updateRunningIntentUse}
              updateRunningIntentSelected={this.updateRunningIntentSelected}
              updateIntent={this.updateIntent}
              createIntentBundle = {this.createIntentBundle}
              deleteIndent = {this.deleteIndent}
              indentApproval = {this.indentApproval}    
            />
            <SRB />
            <SIB />
            <Ledger />
          </div>
        </>:<h1>Session Out</h1>
      )
    }
  }
  
  
  export default Dashboard;
  