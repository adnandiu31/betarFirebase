import React, {Component, createRef} from 'react';
import {base, db, storage} from '../firebase/firebase';
import { Card, Icon, Popconfirm, Table, Input, Button } from 'antd';
import { O2A } from 'object-to-array-convert';
import NavList from '../shared/NavList';

  class Users extends Component {
    constructor(props) {
        super(props);
        this.state={
        users: null,
        stations: null,
        createStationFormVisible: false,
        manuals: null,
        pdf: null,
        url: null,
        progress:null,
        tableData: null,
        searchText: '',
      }
        this.columns = [
          { title: 'Name', dataIndex: 'userName', key: 'userName', ...this.getColumnSearchProps('userName') },
          { title: 'Role', dataIndex: 'userRole', key: 'userRole', ...this.getColumnSearchProps('userRole') },
          { title: 'User ID', dataIndex: 'userID', key: 'userID', ...this.getColumnSearchProps('userID') },
          { title: 'Password', dataIndex: 'userPassword', key: 'useuserPasswordrName', ...this.getColumnSearchProps('userPassword') },
          { title: 'Designation', dataIndex: 'userDesignation', key: 'userDesignation', ...this.getColumnSearchProps('userDesignation') },
          { title: 'Station', dataIndex: 'userStation', key: 'userStation', ...this.getColumnSearchProps('userStation') },
          { title: 'Mobile No.', dataIndex: 'userMobile', key: 'userMobile', ...this.getColumnSearchProps('userMobile') },
          { title: 'Email', dataIndex: 'userEmail', key: 'userEmail', ...this.getColumnSearchProps('userEmail') },          
          { title: 'Signature', dataIndex: "userSignature", key: 'userSignature' ,
            render: (text, record) =>
                           <a href={record.userSignature} target="_blank" rel="noopener noreferrer">
                               Download
                               
                           </a>
          }, 
          
          (localStorage.getItem('userRole') === 'admin')?
          {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            render: (key, record) =>
            <>
              <Popconfirm title="Sure to delete?" onConfirm={() => this.deleteUser(record.object_key)}>
                <Button>
                  Delete
                </Button>
              </Popconfirm>
              
              <Button>Edit</Button>
            </>
          }:{}
        ];  
        
        this.userName = createRef()
        this.userRole = createRef();
        this.userID = createRef();
        this.userPassword = createRef();
        this.userDesignation = createRef();
        this.userStation = createRef()
        this.userMobile = createRef();
        this.userEmail = createRef();
        this.userSignature = createRef();
      }
      
      componentDidMount() {
        this.ref = base.syncState('users', {
            context: this,
            state: "users"
        })  
        this.ref = base.syncState(`stations`, {
          context: this,
          state: "stations"
        });
  
        this.ref = base.syncState(`manuals`,{
            context: this, 
            state: "manuals"
        })
  
        db.ref('/users').on('value', (data)=>{
          const value = O2A(data)
          this.setState({tableData: value})        
          })
      }
  
      createUser = event => {
        event.preventDefault();
        this.addFileToStorage(this.state.pdf)
        setTimeout(()=>{
            console.log(this.state.progress)
        }, 2000)  
        this.addUser(
          this.userName.current.value, 
          this.userRole.current.value,
          this.userStation.current.value, 
          this.userID.current.value, 
          this.userPassword.current.value, 
          this.userDesignation.current.value, 
          this.userMobile.current.value, 
          this.userEmail.current.value)
      
        event.currentTarget.reset();
      };
  
      addUser = (userName, userRole, userStation, userID, userPassword, userDesignation, userMobile, userEmail) => {
          const users = { ...this.state.users };
          const id = parseInt(Object.keys(this.state.users)[Object.keys(this.state.users).length-1])+1
          
          setTimeout(()=>{
              users[id] =  {
                userName, 
                userRole, 
                userStation, 
                userID, 
                userPassword, 
                userDesignation, 
                userMobile, 
                userEmail,
                userSignature: (this.state.url==null)?0:this.state.url
              }
          }, 5000)
          setTimeout(()=>{
              this.setState({ users});
              console.log("process donee")
          }, 5000)
  
      };
  
      addFileToStorage = ( file ) => {
          const uploadTask = storage.ref(`userSignature/${file.name}`).put(file)
          uploadTask.on('state_changed',
              (snapshot)=>{
                  const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                  this.setState({progress})
              },
              (error)=>{
                  console.log(error)
              },
              ()=>{
                  storage.ref('userSignature').child(file.name).getDownloadURL().then(url=>{
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
      
      deleteUser = id => {
          // console.log(name)
        const users = {...this.state.users} 
        users[`${id}`] = null;
        this.setState({users})
      }
  
      updateStationAddress = (name, address) => {
        const stations = {...this.state.stations}
        stations[`${name}`] = {Address: address};
        this.setState({stations})
      }
  
      createStationFormShow = () => this.setState({createStationFormVisible:!this.state.createStationFormVisible})
  
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
          const data = this.state.tableData
          return  (
              <>
              <NavList />
              {this.state.stations?
                  <div id="Manual" style={{width: '100%', padding: "0 25px"}} 
                  >        
                      <Card
                          style={{margin: '2px'}} 
                          title={<span style={{color:'rgb(0, 75, 222)'}}>Users List</span>}
                          extra={(localStorage.getItem('userRole') === 'admin')?
                              <>
                              <Icon 
                                  style={{color: 'green'}} 
                                  type="edit" 
                                  key="edit" 
                                  onClick={this.createStationFormShow}
                              />
                              <span style={{color:'rgb(0, 75, 222)'}}>Add User </span>                            
                              </>
                          :<></>
                              
                          }
                      >
                          <div style={{float: 'center'}} className='row'>
                              <div className='col-lg-8 col-md-12 col-sm-12'>{this.state.createStationFormVisible === true?
                                  <form onSubmit={this.createUser}>                                  
                                      <div className="form-group">
                                          Name
                                          <input
                                              name="userName"
                                              className="form-control"
                                              type="text"
                                              autoComplete="none"
                                              ref={this.userName}
                                          />
                                      </div>
                                      <div className="form-group">
                                          Role
                                          <select className="form-control"   ref={this.userRole} >
                                              <option  className="dropdown-item" >Choose Role</option>
                                              <option  className="dropdown-item" key="1" value="DG">DG</option>
                                              <option  className="dropdown-item" key="2" value="ME">ME</option>
                                              <option  className="dropdown-item" key="3" value="CE">CE</option>
                                              <option  className="dropdown-item" key="4" value="SH">Station Head</option>
                                              <option  className="dropdown-item" key="5" value="SI">Station-In-Charge</option>
                                              <option  className="dropdown-item" key="6" value="SK">Store Keeper</option>
                                              <option  className="dropdown-item" key="7" value="IR">IR</option>
                                              <option  className="dropdown-item" key="8" value="GE">General</option>
                                          </select>                  
                                      </div>
                                      <div className="form-group">
                                          Station
                                          <select className="form-control"   ref={this.userStation} >
                                              <option  className="dropdown-item" >Choose Station</option>
                                              <option  className="dropdown-item" key="1" value="Dhaka">Dhaka</option>
                                              <option  className="dropdown-item" key="2" value="Rajshahi">Rajshahi</option>
                                              <option  className="dropdown-item" key="2" value="Rajshahi">Khulna</option>
                                          </select>                  
                                      </div>
                                      <div className="form-group">
                                          User ID
                                          <input
                                              name="userID"
                                              className="form-control"
                                              type="text"
                                              autoComplete="none"
                                              ref={this.userID}
                                              // value= {
                                              //   this.userRole.current == null ?
                                              //   this.userRole.current.value:
                                              //   "as"
                                              // }
                                          />
                                      </div>
                                      <div className="form-group">
                                          Password
                                          <input
                                              name="userPassword"
                                              className="form-control"
                                              type="text"
                                              autoComplete="none"
                                              ref={this.userPassword}
                                          />
                                      </div>
                                      <div className="form-group">
                                          Designation
                                          <input
                                              ref={this.userDesignation}
                                              name="us"
                                              className="form-control"
                                              type="text"
                                              autoComplete="none"
                                              ref={this.userDesignation}
                                          />
                                      </div>
                                      <div className="form-group">
                                          Mobile No.
                                          <input
                                              name="userMobile"
                                              className="form-control"
                                              type="text"
                                              autoComplete="none"
                                              ref={this.userMobile}
                                          />
                                      </div>
                                      <div className="form-group">
                                        Email Address
                                        <input
                                              name="userEmail"
                                              className="form-control"
                                              type="text"
                                              autoComplete="none"
                                              ref={this.userEmail}
                                          />
                                      </div>
                                      
                                      {/* <div className="form-group"> */}
                                          Signature
                                          <input
                                              name="file"
                                              className="form-control"
                                              type="file"
                                              autoComplete="none"
                                              onChange={this.handleFile}
                                              ref={this.userSignature}
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


export default Users