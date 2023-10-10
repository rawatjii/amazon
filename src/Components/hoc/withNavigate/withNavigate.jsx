import React, {Component} from "react";
import { useNavigate } from "react-router-dom";

// const withNavigate = WrappedComponent => {
//     return class WithNavigate extends Component{
//         navigate = useNavigate();

//         render(){
//             return <WrappedComponent {...this.props} navigate={this.navigate} />
//         }
//     };
// };

export const withNavigate = WrappedComponent => props => {
    const navigate = useNavigate();
    // etc... other react-router-dom v6 hooks
  
    return (
      <WrappedComponent
        {...props}
        navigate={navigate}
      />
    );
  };