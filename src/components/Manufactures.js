import React, {Component, createRef} from 'react';
import {base} from '../firebase/firebase';
import { Card, Icon } from 'antd';
import ContentEditable from 'react-contenteditable'

  class Manufactures extends Component {
    constructor(props) {
      super(props);

      this.state={
          manufactures: null,
          createManufactureFormVisible: false
      }

      this.manufactureNameRef = createRef();
      this.manufactureCountryRef = createRef();
      this.manufactureAddressRef = createRef();
    }
    
    componentDidMount() {
      this.ref = base.syncState(`manufactures`, {
        context: this,
        state: "manufactures"
      });
    }

    createManufacture = event => {
      event.preventDefault();
      this.addManufacture(this.manufactureNameRef.current.value, this.manufactureCountryRef.current.value, this.manufactureAddressRef.current.value);
      event.currentTarget.reset();
    };

    addManufacture = (name, country, address) => {
      const manufactures = { ...this.state.manufactures };
      console.log(country, address)
      manufactures[`${name}`]={Country : country, Address :  address};
      this.setState({ manufactures });
    };

    deleteManufacture = name => {
      const manufactures = {...this.state.manufactures}
      console.log(manufactures[`${name}`])
      manufactures[`${name}`] = null;
      this.setState({manufactures})
    }

    updateManufactureCountry = (name, country) => {
      const manufactures = {...this.state.manufactures}
      console.log(manufactures[`${name}`])
      manufactures[`${name}`].Country = country;
      this.setState({manufactures})
    }

    updateManufactureAddress = (name, address) => {
        const manufactures = {...this.state.manufactures}
        console.log(manufactures[`${name}`])
        manufactures[`${name}`].Address = address;
        this.setState({manufactures})
    }

    createManufactureFormShow = () => this.setState({createManufactureFormVisible:!this.state.createManufactureFormVisible})
  
    render() {
        return  (
            <>{this.state.manufactures?
                <div 
                    id="manufactures" 
                    style={{width: '100%', padding: "25px"}} 
                >        
                    <Card
                        style={{margin: '2px'}} 
                        title={<span style={{color:'rgb(0, 75, 222)'}}>Manufactures</span>}
                        extra={
                            <Icon 
                                style={{color: 'green'}}
                                type="edit" 
                                key="edit" 
                                onClick={this.createManufactureFormShow}
                            />
                        }
                    >
                    
                        <div style={{float: 'center'}} className='row'>
                            <div className='col-lg-6 col-md-12 col-sm-12'>
                                <table 
                                    style={{color: "rgba(0, 0, 0, 0.5)"}} 
                                    className="table table-responsive table-borderless"
                                >{Object.keys(this.state.manufactures).length>0?
                                    <thead>
                                        <tr style={{border: "1px solid rgba(0, 0, 0, 0.1)"}}>
                                            <th scope="col">Manufactures Name</th>
                                            <th scope="col">Country</th>
                                            <th scope="col">Address</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    :''
                                }
                                    <tbody>{Object.keys(this.state.manufactures).map(key => (
                                        <tr 
                                            key={key} 
                                            style={{border: "1px solid rgba(0, 0, 0, 0.1)"}}
                                        >
                                            <td>{key}</td>
                                            <td>
                                                <ContentEditable
                                                    html={this.state.manufactures[key].Country}
                                                    data-column="item"
                                                    className="content-editable"
                                                    key={key}
                                                    onChange={(event)=>this.updateManufactureCountry(key, event.target.value)}
                                                />
                                            </td>
                                            <td>
                                                <ContentEditable
                                                    html={this.state.manufactures[key].Address}
                                                    data-column="item"
                                                    className="content-editable"
                                                    key={key}
                                                    onChange={(event)=>this.updateManufactureAddress(key, event.target.value)}
                                                />
                                            </td>
                                            <td>
                                                <Icon
                                                    style={{color: 'red'}} 
                                                    type="delete" 
                                                    key="delete" 
                                                    onClick={()=>this.deleteManufacture(key)}
                                                />
                                            </td>
                                        </tr>           
                                    ))}</tbody>
                                </table>
                            </div>

                            <div className='col-lg-6 col-md-12 col-sm-12'>{this.state.createManufactureFormVisible === true?
                                <form onSubmit={this.createManufacture}>
                                    <div className="form-group">
                                    Manufactures Name
                                        <input
                                            name="manufactureName"
                                            className="form-control"
                                            type="text"
                                            ref={this.manufactureNameRef}
                                        />
                                    </div>
                                
                                    <div className="form-group">
                                        Country
                                        <input
                                            name="manufactureCountry"
                                            className="form-control"
                                            type="text"
                                            autoComplete="none"
                                            ref={this.manufactureCountryRef}
                                        />
                                    </div>

                                    <div className="form-group">
                                        Address
                                        <input
                                            name="manufactureAddress"
                                            className="form-control"
                                            type="text"
                                            autoComplete="none"
                                            ref={this.manufactureAddressRef}
                                        />
                                    </div>
                                
                                    <button 
                                        type="submit"
                                        className="btn btn-primary"
                                    >
                                        Submit
                                    </button>
                                </form>
                                :''
                            }</div>
                        </div>
                    </Card>
                </div>
                :''
            }</>
        )
    }
}


export default Manufactures