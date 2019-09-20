import React from 'react';
import { withRouter } from 'react-router-dom';
import Form from '../shared/Form';
import { Consumer } from './AppProvider';
import { Card } from 'antd';

const Login = props => <Consumer>
  {({ state, ...context }) => (
    <div className="main">
      <Card>
        <Form
          action="signIn"
          title="Login"
          onSuccess={() => props.history.push('/dashboard')}
          onError={({ message }) => context.setMessage(`Login failed: ${message}`)}
        />
      </Card>
    </div>
  )}
</Consumer>;

export default withRouter(Login);
