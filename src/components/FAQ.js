import React, {Component, createRef} from 'react';
import {base, storage} from './../firebase/firebase';
import { Card, Icon } from 'antd';
import ContentEditable from 'react-contenteditable'
import {Link } from 'react-router-dom'
import { Table } from 'antd'

const columns = [
        { title: 'FAQ ', dataIndex: 'faq_question', key: 'faq_question' },
        // { title: 'Repair Id ', dataIndex: 'faq_ans', key: 'faq_ans' },
    ]

const data = [
        {
        key: 1,
        faq_question: 'What is the Procedure to assemble transmitter??',
        faq_ans: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
        },
    ]

class FAQ extends Component {
    constructor(props) {
      super(props);

      this.state={
          stations: null,
          createStationFormVisible: false,
          pdf: null,
          url: ""
      }

      this.faqQuestion = createRef();
      this.faqAnswer = createRef();
      this.fileOfManual = createRef();
    }
    
    componentDidMount() {
      this.ref = base.syncState(`stations`, {
        context: this,
        state: "stations"
      });
    }

    addManual = event => {
        event.preventDefault();
        this.addFileToStorage(this.state.pdf)
    //   this.addStation(this.stationNameRef.current.value, this.stationAddressRef.current.value);
      event.currentTarget.reset();
    };

    addFileToStorage = (file) => {
        const uploadTask = storage.ref(`manuals/${file.name}`).put(file)
        uploadTask.on('state_changed',
            (snapshot)=>{},
            (error)=>{
                console.log(error)
            },
            ()=>{
                storage.ref('manuals').child(file.name).getDownloadURL().then(url=>{
                    console.log(url)
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
            <>
            <div className="top-nav" style={{ background:'#007bff', position: 'sticky', top: 0, zIndex: 100}} >
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
                <div id="stations" style={{width: '100%', padding: "0 25px"}} >        
                    <Card style={{margin: '2px'}} title={<span style={{color:'rgb(0, 75, 222)'}}>FAQ List</span>}
                        extra={
                            <>
                            <Icon 
                                style={{color: 'green'}} 
                                type="edit" 
                                key="edit" 
                                onClick={this.createStationFormShow}
                            />
                            <span style={{color:'rgb(0, 75, 222)'}}>Add FAQ </span>                            
                            </>
                        }
                    >
                    
                        <div style={{float: 'center'}} className='row'>
                            <div className='col-lg-6 col-md-12 col-sm-12'>{this.state.createStationFormVisible === true?
                                <form onSubmit={this.addManual}>
                                    {/* onSubmit={this.createStation} */}
                                    
                                    <div className="form-group">
                                        Question
                                        <input
                                            name="faqQuestion"
                                            className="form-control"
                                            type="text"
                                            autoComplete="none"
                                            ref={this.faqQuestion}
                                        />
                                    </div>
                                    <div className="form-group">
                                        Answer
                                        <input
                                            name="faqAnswer"
                                            className="form-control"
                                            type="text"
                                            autoComplete="none"
                                            ref={this.faqAnswer}
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary" >
                                        Submit
                                    </button>
                                </form>
                                :''
                            }</div>
                            <div className='col-lg-12 col-md-12 col-sm-12'>
                                <Table columns={columns} 
                                        expandedRowRender={
                                                record => 
                                                <p>
                                                {record.faq_ans}
                                                </p> 
                                                }  
                                        dataSource={data} />
                            </div>
                        </div>
                    </Card>
                </div>
                :''
            }</>
        )
    }
}


export default FAQ