import React, {
    Component,
    createRef
  } from 'react';
  import PropTypes from 'prop-types';
  
  class Form extends Component {
    constructor(props) {
      super(props);
  
      this.role = createRef();
      this.handleSuccess = this.handleSuccess.bind(this);
      this.handleErrors = this.handleErrors.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);

      this.state = {
        users: null
      }
    }
  
    handleSuccess() {
      this.resetForm();
      this.props.onSuccess && this.props.onSuccess();
    }
  
    handleErrors(reason) {
      this.props.onError && this.props.onError(reason);
    }
  
    handleSubmit(event) {
      event.preventDefault();
      const {role} = this;

      this.props.defineRole(role.current.value)
      this.handleSuccess()
    }
  
    resetForm() {
      if (!this.role.current) { return }
      const { role } = Form.defaultProps;
      this.role.current.value = role
    }
  
    render() {
      return (
        <>
        <h3>{this.props.title}</h3>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input
              name="role"
              className="form-control"
              type="text"
              ref={this.role}
            />
          </div> 
          <button 
            type="submit"
            className="btn btn-primary"
          >
            Submit
          </button>
        </form>
        </>
      )
    }
  }
  
  Form.propTypes = {
    title: PropTypes.string.isRequired,
    action: PropTypes.string.isRequired,
    onSuccess: PropTypes.func,
    onError: PropTypes.func,
    defineRole: PropTypes.func
  }
  
  Form.defaultProps = {
    errors: '',
    role: ''
  }
  
  export default Form;
  