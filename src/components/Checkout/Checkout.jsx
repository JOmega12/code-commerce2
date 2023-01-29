import React from 'react';
import CustomerCart from './customercart/CustomerCart';
// import PaymentInfo from './paymentInfo/PaymentInfo';
// import ShippingInfo from './shippingInfo/ShippingInfo';
import './checkout.css';
import { shoppingItems } from '../constants/constants';

class Checkout extends React.Component {
   constructor(props){
      super(props)
      this.state = {
         shoppingItems: shoppingItems,
         subTotal: 0,
         checkoutDisabled: false,
         shipPlusHandle: 3.00,
         discount: 0,
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

   updateTotalPrice = (index, e) =>{
      const shoppingStuff = [...this.state.shoppingItems];
      shoppingItems[index].totalPrice = shoppingItems[index].price * e.target.value;
      this.setState({shoppingItems: shoppingStuff, subTotal: shoppingStuff.reduce((acc, item) => acc + item.totalPrice, 0)});
   }

   handleSummary = () => {
      let subTotal = this.state.subTotal;
      let sH = this.state.shipPlusHandle;
      //this one needs an in else and another separate onchange event on the input for discount for this to be applied
      let discount = this.state.discount;

      //then add total amount here
   }

   handleCheckout = () => {
      if(this.state.shoppingItems.length > 0){
         this.setState({checkoutDisabled: true});
      }
   }




   render() {

      return (
         // <div>checkout</div>
            <div>
               <CustomerCart
               shoppingItemsProps ={this.state.shoppingItems}
               subTotalAmountItemsProps = {this.state.subTotal}
               checkoutDisabledProps = {this.state.checkoutDisabled}
               updateTotalPriceProps={this.updateTotalPrice}
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