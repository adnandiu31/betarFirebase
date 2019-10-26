import React, {Component, createRef} from 'react';
import {base, storage, db} from '../firebase/firebase';
import { Card, Icon, Popconfirm, Table, Input, Button } from 'antd';
import { O2A } from 'object-to-array-convert';
import {Link} from 'react-router-dom'
import { setTimeout } from 'timers';

class Register extends Component {
    constructor(props) {
      super(props);

      this.state={
        register: null,
        manufactures: null,
        createManufactureFormVisible: false,
        image: null,
        url:null,
        progress:null,
        tableData: null,
        searchText:''
    }

      this.columns = [
        { title: 'Repair Id ', dataIndex: 'registerRepairID', key: 'repair_id', ...this.getColumnSearchProps('registerRepairID') },
        { title: 'Date', dataIndex: 'registerDate', key: 'date', ...this.getColumnSearchProps('registerDate') },
        { title: 'Product Name', dataIndex: 'registerProductName', key: 'registerProductName', ...this.getColumnSearchProps('registerProductName') },
        { title: 'Fault Location ', dataIndex: 'registerFaultLocation', key: 'registerFaultLocation', ...this.getColumnSearchProps('registerFaultLocation') },
        { 
            title: 'Fault Location Image', 
            dataIndex: 'registerFaultLocationImage', 
            key: 'fault_location_image', 
            render: (text, record) => <a href={record.registerFaultLocationImage}>Image</a>
        },
        { title: 'Symptom', dataIndex: 'registerSymtom', key: 'registerSymtom' },
        { title: 'PDF', dataIndex: "registerPDF", key: 'registerPDF' ,
          render: (text, record) => <a>Download</a>
        },  
        (localStorage.getItem('userRole') =='admin')?
        {
          title: 'Action',
          dataIndex: '',
          key: 'x',
          render: (text, record) => 
          <Popconfirm title="Sure to delete?" onConfirm={() => this.deleteRegister(record.registerRepairID)}>
          <a alt="Inprogress">Delete</a>
        </Popconfirm>,
        }:
        {},
        (localStorage.getItem('userRole') =='admin')?
        {
          title: 'Status',
          dataIndex: '',
          key: 'y',
          render: (text, record) => (record.approve == 1)?"Approved":
                                        <>
                                        {console.log(record.object_key)}
                                        <Popconfirm title="Sure to Approve?" onConfirm={() => this.approveRegister(record.object_key)}>
                                            <a alt="Inprogress">Pending</a>
                                            
                                        </Popconfirm>
                                        </>,
        }:
        {},
      ]; 

      this.registerRepairID = createRef();
      this.registerDate = createRef();
      this.registerProductName = createRef();
      this.registerFaultLocation = createRef();
      this.registerFaultLocationImage = createRef();
      this.registerSymtom = createRef();
      this.registerSolution = createRef();
      this.registerAuthorName = createRef();
      this.registerAuthorStation = createRef();
      this.registerAuthorDesignation = createRef();
      this.registerAuthorMobile = createRef();
      this.registerAuthorEmail = createRef();
      this.registerPDF = createRef();
      this.registerFault = createRef();
      this.approve = createRef();
      this.creatorID = createRef();
      this.userRole = createRef();
    }
    
    componentDidMount() {
      this.ref = base.syncState(`manufactures`, {
        context: this,
        state: "manufactures"
      });
      this.ref = base.syncState(`register`, {
        context: this,
        state: "register"
      });

      db.ref('/register').on('value', (data)=>{
        const value = O2A(data)
        this.setState({tableData: value})        
        })
    }

    createRegister = event => {
      event.preventDefault();
      this.addImageToStorage(this.state.image)
    
        this.addRegister(
            this.registerRepairID.current.value,
            this.registerDate.current.value,
            this.registerProductName.current.value,
            this.registerFaultLocation.current.value,
            this.state.url,
            this.registerSymtom.current.value,
            this.registerSolution.current.value,
            this.registerAuthorName.current.value,
            this.registerAuthorStation.current.value,
            this.registerAuthorDesignation.current.value,
            this.registerAuthorMobile.current.value,
            this.registerAuthorEmail.current.value,
            this.registerFault.current.value
        )
        event.currentTarget.reset();
    };

    addRegister = (
            registerRepairID,
            registerDate, 
            registerProductName, 
            registerFaultLocation, 
            registerFaultLocationImage, 
            // registerPDF,
            registerSymtom,
            registerSolution,
            registerAuthorName,
            registerAuthorStation,  
            registerAuthorDesignation ,
            registerAuthorMobile,
            registerAuthorEmail,
            registerFault 
        ) => {
            
            const register = { ...this.state.register };

            setTimeout(()=>{
                register[`${registerRepairID}`]={
                    registerRepairID,
                    registerDate:registerDate, 
                    registerProductName:registerProductName, 
                    registerFaultLocation:registerFaultLocation, 
                    registerFaultLocationImage:(this.state.url==null)?0:this.state.url, 
                    registerSymtom:registerSymtom,
                    registerPDF: "dummy",
                    registerSolution:registerSolution,
                    registerAuthorName:registerAuthorName,
                    registerAuthorStation:registerAuthorStation,  
                    registerAuthorDesignation:registerAuthorDesignation ,
                    registerAuthorMobile: registerAuthorMobile,
                    registerAuthorEmail:registerAuthorEmail,
                    registerFault : registerFault,
                    approve : 0,
                    userRole : localStorage.getItem('userRole'),
                    userID : localStorage.getItem('userID')
                    };
            }, 5000)
            
            setTimeout(()=>{
                this.setState({ register: register });
            }, 5000)
        };

    handleImage = e => {
        if(e.target.files[0]){
            const image = e.target.files[0]
            this.setState({image})
        }
    }

    addImageToStorage = (file) => {
        const uploadTask = storage.ref(`registerImage/${file.name}`).put(file)
        uploadTask.on('state_changed',
            (snapshot)=>{
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                this.setState({progress})
            },
            (error)=>{
                console.log(error)
            },
            ()=>{
                storage.ref('registerImage').child(file.name).getDownloadURL().then(url=>{
                    this.setState({url})
                })
            }
        )
    }
    approveRegister = id => {
        const register = {...this.state.register}
        register[`${id}`] = {
            approve: 1
        }
        this.setState({register})
    }

    deleteRegister = id => {
        // console.log(id)
      const register = {...this.state.register}
    //   console.log(manufactures[`${name}`])
      register[`${id}`] = null;
      this.setState({register})
    }   

    updateManufactureCountry = (name, country) => {
      const manufactures = {...this.state.manufactures}
    //   console.log(manufactures[`${name}`])
      manufactures[`${name}`].Country = country;
      this.setState({manufactures})
    }

    updateManufactureAddress = (name, address) => {
        const manufactures = {...this.state.manufactures}
        // console.log(manufactures[`${name}`])
        manufactures[`${name}`].Address = address;
        this.setState({manufactures})
    }

    createManufactureFormShow = () => this.setState({createManufactureFormVisible:!this.state.createManufactureFormVisible})

    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
            <Input
                ref={node => {
                this.searchInput = node;
                }}
                placeholder={`Search ${dataIndex}`}
                value={selectedKeys[0]}
                onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
                style={{ width: 188, marginBottom: 8, display: 'block' }}
            />
            <Button
                type="primary"
                onClick={() => this.handleSearch(selectedKeys, confirm)}
                icon="search"
                size="small"
                style={{ width: 90, marginRight: 8 }}
            >
                Search
            </Button>
            <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                Reset
            </Button>
            </div>
        ),
        filterIcon: filtered => (
            <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
            setTimeout(() => this.searchInput.select());
            }
        },
        // render: text => (
        //   <Highlighter
        //     highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        //     searchWords={[this.state.searchText]}
        //     autoEscape
        //     textToHighlight={
        //         text.toString()
        //     }
        //   />
        // ),
    });

    handleSearch = (selectedKeys, confirm) => {
        confirm();
        this.setState({ searchText: selectedKeys[0] });
    };

    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
    };
    
    render() {
       const datalist = this.state.tableData
       const data = (datalist != null && localStorage.getItem('userRole') != 'admin')? 
                        datalist.filter(data => data.approve == 1) : this.state.tableData
      
        return  (
            <>
            <div className="top-nav" style={{ background:'#007bff', position: 'sticky', top: 0, zIndex: 100 }} >
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
            {this.state.register?
                <div id="manufactures"  style={{width: '100%', padding: "25px"}} >        
                    <Card
                        style={{margin: '2px'}} 
                        title={<span style={{color:'rgb(0, 75, 222)'}}>Trouble Shooting Register</span>}
                        extra={
                            <>
                            <Icon 
                                style={{color: 'green'}} type="edit" key="edit" 
                                onClick={this.createManufactureFormShow}
                            />
                            <span style={{color:'rgb(0, 75, 222)'}}>Add Register </span> 
                            </>
                        }
                    >
                    <div className='col-lg-12 col-md-12 col-sm-12'>{this.state.createManufactureFormVisible === true?
                        <form onSubmit={this.createRegister}>
                            <div className="form-group">
                                Date
                                <input
                                    name="registerDate" className="form-control" type="date"
                                    ref={this.registerDate}
                                />
                            </div>
                            <div className="form-group">
                                Repair Id
                                <input
                                    name="registerRepairID" className="form-control" type="text"
                                    ref={this.registerRepairID}
                                />
                            </div>
                            <div className="form-group">
                                Product Name
                                <input
                                    name="registerProductName" className="form-control" type="text"                                            
                                    ref={this.registerProductName}
                                />
                            </div>
                            <div className="form-group">
                                Fault
                                <input
                                    name="registerFault" className="form-control" type="text"                                            
                                    ref={this.registerFault}
                                />
                            </div>
                            <div className="form-group">
                                    Fault Location
                                <input
                                    name="registerFaultLocation" className="form-control" type="text"
                                    ref={this.registerFaultLocation}
                                />
                            </div>
                                Image of the Fault Location
                            <div className="form-group">
                                <input
                                    name="file"  className="form-control" type="file" autoComplete="none"
                                    onChange={this.handleImage}
                                    ref={this.registerFaultLocationImage}
                                />
                            </div>
                            <div className="form-group">
                                Symptoms
                                <input
                                    name="registerSymtom" className="form-control" type="text" autoComplete="none"
                                    ref={this.registerSymtom}
                                />
                            </div>
                            <div className="form-group">
                                Solution                                        
                                <input
                                    name="registerSolution" className="form-control" type="textarea" rows={10} autoComplete="none"
                                    ref={this.registerSolution}
                                />
                            </div>
                            <h3>Fault Solved by</h3>
                            <div className="form-group">
                            Station Name
                                <input
                                    name="registerAuthorStation" className="form-control" type="text"
                                    ref={this.registerAuthorStation}
                                />
                            </div>
                            <div className="form-group">
                            Author Name
                                <input
                                    name="registerAuthorName" className="form-control" type="text"
                                    ref={this.registerAuthorName}
                                />
                            </div>
                            <div className="form-group">
                            Designation
                                <input
                                    name="registerAuthorDesignation" className="form-control" type="text"
                                    ref={this.registerAuthorDesignation}
                                />
                            </div>
                            <div className="form-group">
                            Mobile No.
                                <input
                                    name="registerAuthorMobile" className="form-control" type="text"
                                    ref={this.registerAuthorMobile}
                                />
                            </div>
                            <div className="form-group">
                            Email 
                                <input
                                    name="registerAuthorEmail" className="form-control" type="text"
                                    ref={this.registerAuthorEmail}
                                />
                            </div>                                    
                            <button  type="submit" className="btn btn-primary">
                                Submit
                            </button>
                        </form>
                        :''}
                    </div>
                    <div style={{float: 'center'}} className='row'>
                        <div className='col-lg-12 col-md-12 col-sm-12'>
                            <Table
                                columns={this.columns}
                                expandedRowRender=
                                    {record => 
                                        <p style={{ margin: 0 }}>
                                            <h3>Fault</h3>
                                            {record.registerFault}
                                            <br></br>
                                            <h3>Solution</h3>
                                            { record.registerSolution}
                                            <br />
                                            <br></br>
                                            <h3>Solved By</h3>
                                            <b >{record.registerAuthorName}</b> <br />
                                            Designation: {record.registerAuthorDesignation} <br />
                                            Station: {record.registerAuthorStation} <br />
                                            email: {record.registerAuthorEmail} <br />
                                            Mobile: {record.registerAuthorMobile}
                                        </p>
                                    }
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

export default Register