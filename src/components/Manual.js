import React, {Component, createRef} from 'react';
import {base, storage, db} from '../firebase/firebase';
import { Card, Icon, Popconfirm } from 'antd';
import ContentEditable from 'react-contenteditable'
import { O2A } from 'object-to-array-convert';
import {Link } from 'react-router-dom'
import {Table} from 'antd'



  class Stations extends Component {
    constructor(props) {
      super(props);
      this.columns = [
        { title: 'Product Type', dataIndex: 'productTypeOfManual', key: 'productTypeOfManual' },
        { title: 'Product Name', dataIndex: 'productNameoOfManual', key: 'productNameoOfManual' },
        
        { title: 'PDF', dataIndex: "registerPDF", key: 'registerPDF' ,
          render: (text, record) =>
                         <a href={record.fileOfManual} target="_blank">
                             Download
                         </a>
        },  
        {
          title: 'Action',
          dataIndex: '',
          key: 'x',
          render: (text, record) =>
        //   this.state.manuals.length >= 1 ? (
            <Popconfirm title="Sure to delete?" onConfirm={() => this.deleteStation(record.productNameoOfManual)}>
              <a>Delete</a>
            </Popconfirm>
        //   ) : null,
        },
      ];  
      this.state={
          stations: null,
          createStationFormVisible: false,
          manuals: null,
          pdf: null,
          url: null,
          progress:null,
          tableData: null
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

      this.ref = base.syncState(`manuals`,{
          context: this, 
          state: "manuals"
      })

      db.ref('/manuals').on('value', (data)=>{
        const value = O2A(data)
        this.setState({tableData: value})        
        })
    }

    createManual = event => {
        event.preventDefault();
        this.addFileToStorage(this.state.pdf)
        setTimeout(()=>{
            console.log(this.state.progress)
        }, 2000)        
      this.addManual(this.productNameoOfManual.current.value, this.productTypeOfManual.current.value);
      event.currentTarget.reset();
    };

    addManual = (productNameoOfManual, productTypeOfManual) => {
        const manuals = { ...this.state.manuals };
        console.log(manuals)
        setTimeout(()=>{
            manuals[`${productNameoOfManual}`] =  {
                productNameoOfManual, 
                productTypeOfManual,
                fileOfManual: (this.state.url==null)?0:this.state.url
            }
        }, 5000)
        setTimeout(()=>{
            this.setState({ manuals: manuals});
            console.log("process donee")
        }, 5000)

    };

    addFileToStorage = ( file) => {
        const uploadTask = storage.ref(`manualsList/${file.name}`).put(file)
        uploadTask.on('state_changed',
            (snapshot)=>{
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                this.setState({progress})
            },
            (error)=>{
                console.log(error)
            },
            ()=>{
                storage.ref('manualsList').child(file.name).getDownloadURL().then(url=>{
                    this.setState({url})
                })
            }
        )
    }
    
    handleFile = e => {
        if(e.target.files[0]){
            const pdf = e.target.files[0]
            this.setState({pdf})
        }
    }
    
    deleteStation = name => {
        // console.log(name)
      const manuals = {...this.state.manuals} 
      manuals[`${name}`] = null;
      this.setState({manuals})
    }

    updateStationAddress = (name, address) => {
      const stations = {...this.state.stations}
      stations[`${name}`] = {Address: address};
      this.setState({stations})
    }

    createStationFormShow = () => this.setState({createStationFormVisible:!this.state.createStationFormVisible})
  
    render() {
        const data = this.state.tableData
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
              <li className="nav-item">
                <Link to="/discussion-forum">
                  <a style={{color: 'black'}} className="nav-link" >Discussion Forum</a>
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
                                <Table 
                                    columns={this.columns}
                                    dataSource={data}
                                />
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

// <table 
// style={{color: "rgba(0, 0, 0, 0.5)"}} 
// className="table table-responsive table-borderless"
// >{Object.keys(this.state.manuals).length>0?
// <thead>
//     <tr style={{border: "1px solid rgba(0, 0, 0, 0.1)"}}>
//         <th scope="col">Product Type</th>
//         <th scope="col">Product Name</th>
//         <th scope="col">Manual</th>
//         <th scope="col">Action</th>
//     </tr>
// </thead>
// :''
// }
// <tbody>{Object.keys(this.state.manuals).map(key => (
//     <tr 
//         key={key} 
//         style={{border: "1px solid rgba(0, 0, 0, 0.1)"}}
//     >
//         <td>{key}</td>
//         <td>
//             <ContentEditable
//                 html={this.state.manuals[key].productNameoOfManual}
//                 data-column="item"
//                 className="content-editable"
//                 key={key}
//                 onChange={(event)=>this.updateStationAddress(key, event.target.value)}
//             />
//         </td>
//         <td>
//             <ContentEditable
//                 html={this.state.stations[key].productTypeOfManual}
//                 data-column="item"
//                 className="content-editable"
//                 key={key}
//                 onChange={(event)=>this.updateStationAddress(key, event.target.value)}
//             />
//         </td>
//         <td>
//             <Icon 
//                 style={{color: 'red'}} 
//                 type="delete" 
//                 key="delete" 
//                 onClick={()=>this.deleteStation(key)}
//             />
//         </td>
//     </tr>           
// ))}</tbody>
// </table>