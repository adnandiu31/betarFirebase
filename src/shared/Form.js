import React, {
    Component,
    createRef
  } from 'react';
  import PropTypes from 'prop-types';
  import { app } from '../firebase/firebase';
  import { O2A } from 'object-to-array-convert';

  class Form extends Component {
    constructor(props) {
      super(props);
  
      this.email = createRef();
      this.password = createRef();
      this.handleSuccess = this.handleSuccess.bind(this);
      this.handleErrors = this.handleErrors.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    state = {
      user:{}
    }

  
    handleSuccess() {
      this.resetForm();
      this.props.onSuccess && this.props.onSuccess();
      console.log(this.props.onSuccess)
    }
  
    handleErrors(reason) {
      this.props.onError && this.props.onError(reason);
    }

  componentDidMount(){
    app.database().ref('users').on('value', (data)=>{
      const value = O2A(data)
      // console.log(value)
      this.setState({user: value})
    })
  }
    
  
    handleSubmit(event) {
      event.preventDefault();
      // const {
      //   email,
      //   password,
      //   props: { action }
      // } = this;
     
      // if(this.state.user.some(((item) => this.email.current.value === item.email) && (item => this.password.current.value === item.password))) {
      //   localStorage.setItem('user', this.email.current.value)
      //   // localStorage.setItem('userRole')
      //   console.log(this.state.user)
      //   this.handleSuccess()
      // }else{
      //   this.handleErrors("Wrong username")
      // }
           
      this.state.user.map((item,i) => {
        if(this.email.current.value === item.email && this.password.current.value === item.password){
          localStorage.setItem('user', this.email.current.value)
          localStorage.setItem('userRole', item.role)
          localStorage.setItem('userID', item.object_key)
          this.handleSuccess()
        }else{
          this.handleErrors("Wrong Pasword")
        }
      })
    }
  
    resetForm() {
      if (!this.email.current || !this.password.current) { return }
      const { email, password } = Form.defaultProps;
      this.email.current.value = email;
      this.password.current.value = password;
    }
  
    render() {
      return (
        <>
        <h3>{this.props.title}</h3>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
          <input
            name="name"
            className="form-control"
            type="email"
            ref={this.email}
          />
          </div>
          <div className="form-group">
          <input
            name="password"
            className="form-control"
            type="password"
            autoComplete="none"
            ref={this.password}
          />
          </div>
          <button 
            type="submit"
            className="btn btn-primary"
          >Submit</button>
        </form>
        </>
      )
    }
  }
  
  Form.propTypes = {
    title: PropTypes.string.isRequired,
    action: PropTypes.string.isRequired,
    onSuccess: PropTypes.func,
    onError: PropTypes.func
  }
  
  Form.defaultProps = {
    errors: '',
    email: '',
    password: ''
  }
  
  export default Form;
  