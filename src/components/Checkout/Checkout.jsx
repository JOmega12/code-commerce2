import React from 'react';
import CustomerCart from './customercart/CustomerCart';
// import PaymentInfo from './paymentInfo/PaymentInfo';
import ShippingInfo from './shippingInfo/ShippingInfo';
import './checkout.css';
import { shoppingItems, discountVal } from '../constants/constants';

class Checkout extends React.Component {
   constructor(props){
      super(props)
      this.state = { 
         shoppingItems: shoppingItems,
         subTotal: 0,
         checkoutDisabled: false,
         shipPlusHandle: 3.99 ,
         discountValueInput: '',
         discount: 0,
         finalTotal: 0,
         nextShippingStep: false,
      }
   }

   //onChange function
   handleInputData = (e) => {
      this.setState({
         [e.target.name] : e.target.value
      })
   }

   updateTotalPrice = (index, e) =>{
      let preDiscount = 0;
      const shoppingStuff = [...this.state.shoppingItems];
      shoppingItems[index].totalPrice = shoppingItems[index].price * e.target.value;

      let preTotal = shoppingStuff.reduce((acc, item) => acc + item.totalPrice, 0);

      this.setState({
         shoppingItems: shoppingStuff,
         subTotal: preTotal,
         discount: preDiscount,
         finalTotal: preTotal,
      });
   }

   handleDiscountButton = () => {

      let subTotal = this.state.subTotal;
      let sH = this.state.shipPlusHandle;
      let discountValWord = this.state.discountValueInput;
      let discount = 0;
      let semiTotal = subTotal + sH;
      let totalTotal = 0;

      const discountValue = discountVal.find(item => {
         return item.word === discountValWord
      })

      if(discountValue){
         totalTotal += (semiTotal * discountValue.number) + semiTotal;
         discount += discountValue.number * 100;
         this.setState({
            finalTotal: totalTotal.toFixed(2),
            discount: discount.toFixed(2)
         })
      } else {
         this.setState({
            finalTotal: totalTotal.toFixed(2),
            discount: discount.toFixed(2)
         })
      }
   }

   handleCheckout = () => {
      if(this.state.finalTotal > 0){
         this.setState({checkoutDisabled: true});
      }
   }




   render() {

      return (
         // <div>checkout</div>
            <div>
               {this.state.checkoutDisabled ?(
               <ShippingInfo /> ):
               <CustomerCart
               shoppingItemsProps ={this.state.shoppingItems}
               subTotalAmountItemsProps = {this.state.subTotal}
               checkoutDisabledProps = {this.state.checkoutDisabled}
               shippingAndHandleProps = {this.state.shipPlusHandle}
               discountValueProps = {this.state.discountValueInput}
               discountNumberProps = {this.state.discount}
               finalTotalProps = {this.state.finalTotal}


               handleInputData = {this.handleInputData}
               updateTotalPriceProps={this.updateTotalPrice}
               discountButtonProps ={this.handleDiscountButton}


               
               handleCheckoutProp = {this.handleCheckout}
               />
               }
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