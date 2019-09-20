import React, {Component, createRef} from 'react';
import {base} from './../firebase/firebase';
import { Card, Icon } from 'antd';
import ContentEditable from 'react-contenteditable'

  class SIB extends Component {
    constructor(props) {
      super(props);

      this.state={
          stations: null,
          createStationFormVisible: false
      }

      this.stationNameRef = createRef();
      this.stationAddressRef = createRef();
    }
    
    componentDidMount() {
      this.ref = base.syncState(`stations`, {
        context: this,
        state: "stations"
      });
    }

    createStation = event => {
      event.preventDefault();
      this.addStation(this.stationNameRef.current.value, this.stationAddressRef.current.value);
      event.currentTarget.reset();
    };

    addStation = (name, address) => {
      const stations = { ...this.state.stations };
      stations[`${name}`] =  {'Address': address};
      this.setState({ stations });
    };

    deleteStation = name => {
      const stations = {...this.state.stations}
      stations[`${name}`] = null;
      this.setState({stations})
    }

    updateStationAddress = (name, address) => {
      const stations = {...this.state.stations}
      stations[`${name}`] = {Address: address};
      this.setState({stations})
    }

    createStationFormShow = () => this.setState({createStationFormVisible:!this.state.createStationFormVisible})
  
    render() {
        return  (
            <>{this.state.stations?
                <div 
                    id="SIB" 
                    style={{width: '100%', padding: "0 25px"}} 
                >        
                    <Card
                        style={{margin: '2px'}} 
                        title={<span style={{color:'rgb(0, 75, 222)'}}>SIB</span>}
                        extra={
                            <Icon 
                                style={{color: 'green'}} 
                                type="edit" 
                                key="edit" 
                                onClick={this.createStationFormShow}
                            />
                        }
                    >
                        <div style={{float: 'center'}} className='row'>
                            <div className='col-lg-6 col-md-12 col-sm-12'>
                                <table 
                                    style={{color: "rgba(0, 0, 0, 0.5)"}} 
                                    className="table table-responsive table-borderless"
                                >{Object.keys(this.state.stations).length>0?
                                    <thead>
                                        <tr style={{border: "1px solid rgba(0, 0, 0, 0.1)"}}>
                                            <th scope="col">Product Name</th>
                                            <th scope="col">Requirement</th>
                                            <th scope="col">Remarks</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    :''
                                }
                                    <tbody>{Object.keys(this.state.stations).map(key => (
                                        <tr 
                                            key={key} 
                                            style={{border: "1px solid rgba(0, 0, 0, 0.1)"}}
                                        >
                                            <td>{key}</td>
                                            <td>
                                                <ContentEditable
                                                    html={this.state.stations[key].Address}
                                                    data-column="item"
                                                    className="content-editable"
                                                    key={key}
                                                    onChange={(event)=>this.updateStationAddress(key, event.target.value)}
                                                />
                                            </td>
                                            <td>
                                                <Icon 
                                                    style={{color: 'red'}} 
                                                    type="delete" 
                                                    key="delete" 
                                                    onClick={()=>this.deleteStation(key)}
                                                />
                                            </td>
                                        </tr>           
                                    ))}</tbody>
                                </table>
                            </div>

                            <div className='col-lg-6 col-md-12 col-sm-12'>{this.state.createStationFormVisible === true?
                                <form onSubmit={this.createStation}>
                                    <div className="form-group">
                                        Station Name
                                        <input
                                            name="stationName"
                                            className="form-control"
                                            type="text"
                                            ref={this.stationNameRef}
                                        />
                                    </div>
                                
                                    <div className="form-group">
                                        Address
                                        <input
                                            name="stationAddress"
                                            className="form-control"
                                            type="text"
                                            autoComplete="none"
                                            ref={this.stationAddressRef}
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


export default SIB