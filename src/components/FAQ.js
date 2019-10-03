import React, {Component, createRef} from 'react';
import {base, db} from './../firebase/firebase';
import { Card, Icon, Popconfirm } from 'antd';
import ContentEditable from 'react-contenteditable'
import {Link } from 'react-router-dom'
import { Table } from 'antd'
import { O2A } from 'object-to-array-convert';

class FAQ extends Component {
    constructor(props) {
      super(props);
      this.columns = [
        { title: 'FAQ ', dataIndex: 'faqQuestion', key: 'faqQuestion' },
        {
            title: 'Action',        
            dataIndex: '',
            key: 'x',
            render: (text, record) =>
          //   this.state.manuals.length >= 1 ? (
              <Popconfirm title="Sure to delete?" onConfirm={() => this.deleteFAQ(text.faqID)}>
                <a>Delete</a>
                
              </Popconfirm>
          //   ) : null,
          },
        ]
      this.state={
          stations: null,
          faq: null,
          createStationFormVisible: false,
          pdf: null,
          url: "",
          deleteOptionVisible: false,
          tableData: null
      }

      this.faqQuestion = createRef();
      this.faqAnswer = createRef();
      this.faqID = createRef();
    }
    
    componentDidMount() {
      this.ref = base.syncState(`stations`, {
        context: this,
        state: "stations"
      });
      this.ref = base.syncState(`faq`,{
          context: this,
          state: "faq"
      });
      db.ref('/faq').on('value', (data)=>{
        const value = O2A(data)
        this.setState({tableData: value})        
        })
    }

    createFAQ = event => {
        // event.preventDefault();
        this.addFAQ( this.faqQuestion.current.value, this.faqAnswer.current.value )
        event.currentTarget.reset();
    };

    addFAQ = (faqQuestion, faqAnswer) => {
      const faq = { ...this.state.faq };
      const id = parseInt(Object.keys(this.state.faq)[Object.keys(this.state.faq).length-1])+1
      faq[id] =  {faqID:id,faqQuestion,faqAnswer};
      this.setState({ faq });
    };

    deleteFAQ = name => {
        console.log("delete FAQ function" + name)
      const faq = {...this.state.faq}
      faq[`${name}`] = null;
      this.setState({faq})
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
            {this.state.faq?
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
                                <form onSubmit={this.createFAQ}>                                    
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
                                <Table columns={this.columns} 
                                        expandedRowRender={
                                                record => 
                                                <p>
                                                {record.faqAnswer}
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