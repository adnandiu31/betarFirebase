import React, {Component, createRef} from 'react';
import {base, db} from './../firebase/firebase';
import { Card, Icon, Popconfirm, Table, Input, Button } from 'antd';
import { O2A } from 'object-to-array-convert';
import NavList from '../shared/NavList';

// import Highlighter from 'react-highlight-words';

class FAQ extends Component {
    constructor(props) {
      super(props);

      this.state={
        stations: null,
        faq: null,
        createStationFormVisible: false,
        pdf: null,
        url: "",
        deleteOptionVisible: false,
        tableData: null, 
        searchText: ''
      }

      this.columns = [
        { title: 'FAQ ', dataIndex: 'faqQuestion', key: 'faqQuestion', ...this.getColumnSearchProps('faqQuestion') },
        (localStorage.getItem('userRole') === 'admin')?
        {
            title: 'Action',        
            dataIndex: '',
            key: 'x',
            render: (text, record) =>
          //   this.state.manuals.length >= 1 ? (
              <Popconfirm title="Sure to delete?" onConfirm={() => this.deleteFAQ(text.faqID)}>
                <a href="onConfirm={() => this.deleteFAQ(text.faqID)}">Delete</a>
                
              </Popconfirm>
          //   ) : null,
          }:{},
        ]
      
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
            style={{ width: 90, marginRight: 100 }}
          >
            Search
          </Button>
          <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </div>
      ),
      filterIcon: filtered => (
        <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined , left: '75px'}} />
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
            {this.state.faq?
                <div id="stations" style={{width: '100%', padding: "0 25px"}} >        
                    <Card style={{margin: '2px'}} title={<span style={{color:'rgb(0, 75, 222)'}}>FAQ List</span>}
                        extra={(localStorage.getItem('userRole') === 'admin')?
                            <>
                            <Icon 
                                style={{color: 'green'}} 
                                type="edit" 
                                key="edit" 
                                onClick={this.createStationFormShow}
                            />
                            <span style={{color:'rgb(0, 75, 222)'}}>Add FAQ </span>                            
                            </>:<></>
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