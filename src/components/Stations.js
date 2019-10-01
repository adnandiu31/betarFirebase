import React, {Component, createRef} from 'react';
import {base, storage} from './../firebase/firebase';
import { Card, Icon } from 'antd';
import ContentEditable from 'react-contenteditable'
import {Link } from 'react-router-dom'
  class Stations extends Component {
    constructor(props) {
      super(props);

      this.state={
          stations: null,
          createStationFormVisible: false,
          manualss: null,
          pdf: null,
          url: null
      }

      this.productTypeOfManual = createRef();
      this.productNameoOfManual = createRef();
      this.fileOfManual = createRef();
    }
    
    componentDidMount() {
      this.ref = base.syncState(`stations`, {
        context: this,
        state: "stations"
      });

      this.ref = base.syncState(`manualss`,{
          context: this, 
          state: "manualss"
      })
    }

    createManual = event => {
        event.preventDefault();
        this.addFileToStorage(this.state.pdf)
        console.log(this.productTypeOfManual.current.value, this.productNameoOfManual.current.value)
      this.addManual(this.productNameoOfManual.current.value, this.productTypeOfManual.current.value);
      event.currentTarget.reset();
    };

    addManual = (productNameoOfManual, productTypeOfManual) => {
        const manuals = { ...this.state.manuals };
        setTimeout(()=>{
            manuals[`${productNameoOfManual}`] =  {
                productNameoOfManual, 
                productTypeOfManual,
                fileOfManual: "(this.state.url==null)?0:this.state.url"
            };
        }, 9000)
        setTimeout(()=>{
            this.setState({ manuals : manuals});
            console.log("process donee")
        }, 5000)

    };

    addFileToStorage = ( file) => {
        const uploadTask = storage.ref(`manuals/${file.name}`).put(file)
        uploadTask.on('state_changed',
            (snapshot)=>{},
            (error)=>{
                console.log(error)
            },
            ()=>{
                storage.ref('manuals').child(file.name).getDownloadURL().then(url=>{
                    this.setState({url})
                    console.log("url")
                    console.log(this.state.url)
                })
            }
        )
    }
    
    handleFile = e => {
        if(e.target.files[0]){
            const pdf = e.target.files[0]
            this.setState({pdf})
        }
        // console.log(e.target.files[0])
    }
    
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
            <>
            <div className="top-nav" style={{ background:'#007bff',position: 'sticky',top: 0,zIndex: 100}} >
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
            {this.state.stations?
                <div id="Manual" style={{width: '100%', padding: "0 25px"}} 
                >        
                    <Card
                        style={{margin: '2px'}} 
                        title={<span style={{color:'rgb(0, 75, 222)'}}>Product Manual List</span>}
                        extra={
                            <>
                            <Icon 
                                style={{color: 'green'}} 
                                type="edit" 
                                key="edit" 
                                onClick={this.createStationFormShow}
                            />
                            <span style={{color:'rgb(0, 75, 222)'}}>Add Manual </span>                            
                            </>
                        }
                    >
                    
                        <div style={{float: 'center'}} className='row'>
                            <div className='col-lg-8 col-md-12 col-sm-12'>{this.state.createStationFormVisible === true?
                                <form onSubmit={this.createManual}>
                                    {/* onSubmit={this.createStation} */}
                                    <div className="form-group">
                                        Product Type
                                        <select className="form-control"   ref={this.productTypeOfManual} >
                                            <option  className="dropdown-item" >Choose Type</option>
                                            <option  className="dropdown-item" key="1" value="instrument">Instrument</option>
                                            <option  className="dropdown-item" key="2" value="parts">Parts</option>
                                        </select>                  
                                    </div>
                                
                                    <div className="form-group">
                                        Product Name
                                        <input
                                            name="stationAddress"
                                            className="form-control"
                                            type="text"
                                            autoComplete="none"
                                            ref={this.productNameoOfManual}
                                        />
                                    </div>
                                    {/* <div className="form-group"> */}
                                        Upload Manual
                                        <input
                                            name="file"
                                            className="form-control"
                                            type="file"
                                            autoComplete="none"
                                            onChange={this.handleFile}
                                            ref={this.fileOfManual}
                                        />
                                    {/* </div> */}
                                    <button type="submit" className="btn btn-primary">
                                        Submit
                                    </button>
                                </form>
                                :''
                            }</div>
                            <div className='col-lg-12 col-md-12 col-sm-12'>
                                <table 
                                    style={{color: "rgba(0, 0, 0, 0.5)"}} 
                                    className="table table-responsive table-borderless"
                                >{Object.keys(this.state.stations).length>0?
                                    <thead>
                                        <tr style={{border: "1px solid rgba(0, 0, 0, 0.1)"}}>
                                            <th scope="col">Product Type</th>
                                            <th scope="col">Product Name</th>
                                            <th scope="col">Manual</th>
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
                        </div>
                    </Card>
                </div>
                :''
            }</>
        )
    }
}


export default Stations