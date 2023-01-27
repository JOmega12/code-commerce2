import React from 'react';
import CustomerCart from './customercart/CustomerCart';
import PaymentInfo from './paymentInfo/PaymentInfo';
import ShippingInfo from './shippingInfo/ShippingInfo';
import './checkout.css';
import { shoppingItems } from '../constants/constants';

class Checkout extends React.Component {
   constructor(props){
      super(props)
      this.state = {
         shoppingItems: shoppingItems,
         total: 0,
         checkoutDisabled: false,
         shipPlusHandle: 0,
         discount: 0,
         optionValue: 'option1'
      }
   }

   //onChange function
   handleInputData = (e) => {
      this.setState((prevState) => ({
         user: {
            ...prevState.user,
            [e.target.name]: e.target.value,
         }
      }))
   }

   addToTotalItems = () => {
      let totalOfItems = 0;
      this.state.shoppingItems.forEach(item => {
         totalOfItems += item.price * item.quantity;
      });
      this.setState({total: totalOfItems})
   }

   handleCheckout = () => {
      if(this.state.shoppingItems.length > 0){
         this.setState({checkoutDisabled: true});
      }
   }


   render() {

      return (
            <div>
               <CustomerCart
               shoppingItemsProps ={this.state.shoppingItems}
               totalAmountItemsProps = {this.state.total}
               checkoutDisabledProps = {this.state.checkoutDisabled}
               />
            </div>
      )
   }
}
  

// have a main screen, where the checkout (check)
//write out the html for the product where in the quantity, you will have an increment dropdown with price
//price * quantity = total price for 1 product
//total product will be in another component with the summary bar 
//would the inputbase be useful in this scenario for the cart screen? 
export default Checkout 