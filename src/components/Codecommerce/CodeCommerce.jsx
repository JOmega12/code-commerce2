import React from 'react';
import Authenticate from '../Authenticate/Authenticate';
// import { INIT_TEST } from '../constants/constants';
// import { emailValidation, onlyTextValidation, passwordValidation, zipCodeValidation } from '../validations/validation';
import Checkout from '../Checkout/Checkout';




class CodeCommerce extends React.Component {
   constructor() {
      super()

      this.state = {
         //originally is false
         isLoggedIn: true,
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
            
            {this.state.isLoggedIn ? (
               <Checkout />
            ): 
               <Authenticate isLoggedInStateT  = {this.handleIsLoggedInStateT}
               isLoggedInStateF = {this.isLoggedInStateF}
               />
            }

         </div>
      )


   }

}

export default CodeCommerce;