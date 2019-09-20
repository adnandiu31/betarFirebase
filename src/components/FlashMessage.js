import React from 'react';
import { Consumer } from '../components/AppProvider';

const FlashMessage = () => <Consumer>
  {({ state, ...context }) => state.message &&
    <div style={{display: "flex",  
      alignItems: "center",
      justifyContent: "center",
      paddingTop: "30px"
    }}>
      <div 
        className="alert alert-danger" 
        role="alert"
      >
        {state.message}
        <button 
          type="button" 
          className="close"
          aria-label="Close"
          onClick={() => context.clearMessage()}
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </div>}
</Consumer>;

export default FlashMessage;