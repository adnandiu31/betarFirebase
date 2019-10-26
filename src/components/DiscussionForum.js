import React, {Component, createRef} from 'react';
import {base, db} from './../firebase/firebase';
import { Card, Icon, Popconfirm, Table, Button } from 'antd';
import { O2A } from 'object-to-array-convert';
import NavList from '../shared/NavList';

class DiscussionForum extends Component {
    constructor(props) {
      super(props);
      this.columns = [
        { title: 'Discussions ', dataIndex: 'discussionQuestion', key: 'discussionQuestion' },
        (localStorage.getItem('userRole') === 'admin')?
        {
            title: 'Action',        
            dataIndex: '',
            key: 'x',
            render: (text, record) =>
          //   this.state.manuals.length >= 1 ? (
              <Popconfirm title="Sure to delete?" onConfirm={() => this.deleteFAQ(text.discussionID)}>
                <a href="onConfirm={() => this.deleteFAQ(text.discussionID)">Delete</a>
              </Popconfirm>
          //   ) : null,
          }:{},
        ]
      this.state={
          stations: null,
          discussion: null,
          faq: null,
          createStationFormVisible: false,
          pdf: null,
          url: "",
          deleteOptionVisible: false,
          tableData: null
      }

      this.discussionQuestion = createRef();
      this.discussionAnswer = createRef();
      this.discussionID = createRef();
    }
    
    componentDidMount() {
      this.ref = base.syncState(`discussion`,{
        context: this,
        state: "discussion"
      });
      db.ref('/discussion').on('value', (data)=>{
        const value = O2A(data)
        this.setState({tableData: value})        
      })
    }

    createFAQ = event => {
        event.preventDefault();
        this.addFAQ( this.discussionQuestion.current.value)
        event.currentTarget.reset();
    };

    addFAQ = (discussionQuestion) => {
      const discussion = { ...this.state.discussion };
      const id = parseInt(Object.keys(this.state.discussion)[Object.keys(this.state.discussion).length-1])+1
      discussion[id] =  {discussionID:id,discussionQuestion};
      this.setState({ discussion });
    };

    deleteFAQ = name => {
        console.log("delete FAQ function" + name)
      const discussion = {...this.state.discussion}
      discussion[`${name}`] = null;
      this.setState({discussion})
    }

    addComment = (e, ans) => {
      const discussion = { ...this.state.discussion };
      var id = ans.discussionID
      const discussionAnswer = discussion[`${id}`].discussionAnswer

      if(!discussionAnswer){
        discussion[`${id}`] = {
          discussionAnswer: {
            0: this.discussionAnswer.current.value
          }
        }
      }
      else{
        discussionAnswer.push(this.discussionAnswer.current.value)
        discussion[`${id}`] = {
          discussionAnswer: discussionAnswer
        }
      }
            
      this.setState({ discussion });      
    }

    addAnswer = (ans) => <>
                { console.log(ans)}
                {ans.discussionAnswer?
                  ans.discussionAnswer.map(
                  (ans)=>{
                    return <p>- {ans}
                        {console.log(ans + "checking")}
                      </p>
                  }
                  ):''
                }
              <input
                  name="discussionAnswer"
                  className="form-control"
                  type="text"
                  autoComplete="none"
                  ref={this.discussionAnswer}
              />
              <Button  onClick={(e)=> {this.addComment(e, ans)} } > Add Comment </Button>
          </>
    
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
            <NavList />
            {this.state.discussion?
                <div id="stations" style={{width: '100%', padding: "0 25px"}} >        
                    <Card style={{margin: '2px'}} title={<span style={{color:'rgb(0, 75, 222)'}}>Discussion List</span>}
                        extra={
                            <>
                            <Icon 
                                style={{color: 'green'}} 
                                type="edit" 
                                key="edit" 
                                onClick={this.createStationFormShow}
                            />
                            <span style={{color:'rgb(0, 75, 222)'}}>Add Discussion </span>                            
                            </>
                        }
                    >
                    
                        <div style={{float: 'center'}} className='row'>
                            <div className='col-lg-6 col-md-12 col-sm-12'>{this.state.createStationFormVisible === true?
                                <form onSubmit={this.createFAQ}>                                    
                                    <div className="form-group">
                                        Question
                                        <input
                                            name="discussionQuestion"
                                            className="form-control"
                                            type="text"
                                            autoComplete="none"
                                            ref={this.discussionQuestion}
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
                                                this.addAnswer
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


export default DiscussionForum