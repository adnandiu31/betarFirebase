import React from 'react';
import { withRouter } from 'react-router-dom';
import Form from '../shared/RoleForm';
import { Consumer } from './AppProvider';
import { Card } from 'antd';

const Login = props => <Consumer>
  {({ state, ...context }) => (
    <div className="main">
      <Card>
        <Form
          action="signInRole"
          title="Role"
          onSuccess={() => props.history.push('/dashboard')}
          onError={({ message }) => context.setMessage(`Login failed: ${message}`)}
          user={state.currentUser}
          defineRole = {props.defineRole}
        />
      </Card>
    </div>
  )}
</Consumer>;

export default withRouter(Login);
