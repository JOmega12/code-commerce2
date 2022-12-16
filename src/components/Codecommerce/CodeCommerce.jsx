import React from 'react';
import Authenticate from '../Authenticate/Authenticate';
// import { INIT_TEST } from '../constants/constants';
// import { emailValidation, onlyTextValidation, passwordValidation, zipCodeValidation } from '../validations/validation';




class CodeCommerce extends React.Component {
   constructor() {
      super()

      this.state = {
         isLoggedIn: false,
      }
   }

   handleIsLoggedInStateT = () => {
      this.setState({isLoggedIn: true});
   }

   handleIsLoggedInStateF = () => {
      this.setState({isLoggedIn: false});
   }

   render() {

      return (
         <div>
            
            <Authenticate isLoggedInStateT  = {this.handleIsLoggedInStateT}
            isLoggedInStateF = {this.isLoggedInStateF}
            />
         </div>
      )


   }

}

export default CodeCommerce;