import React from 'react';
import CustomerCart from './customercart/CustomerCart';
// import PaymentInfo from './paymentInfo/PaymentInfo';
import ShippingInfo from './shippingInfo/ShippingInfo';
import './checkout.css';
import { shoppingItems, discountVal, shippingInfoData, shippingInfoDataInput} from '../constants/constants';


class Checkout extends React.Component {
   constructor(props){
      super(props)
      this.state = { 
         shoppingItems: shoppingItems,
         shoppingEmpty: '',
         subTotal: 0,
         //set checkoutDisabled as false to go back to checkout component
         //checkout component is always set as false
         checkoutDisabled: true,
         shipPlusHandle: 0 ,
         discountValueInput: '',
         discount: 0,
         finalTotal: 0,
         shippingInfoData: shippingInfoData,
         shippingInfoDataInput: shippingInfoDataInput,
         shippingFast: false,
      }
   }

   //onChange function for customerCart
   handleInputData = (e) => {
      this.setState({
         [e.target.name] : e.target.value,
         // shippingInfoData: {
         //    ...prevState.shippingInfoData,
         //    [e.target.name] : e.target.value
         // }
      })
   }

   updateTotalPrice = (index, e) =>{
      let preDiscount = 0;
      const shoppingStuff = [...this.state.shoppingItems];
      shoppingStuff[index].totalPrice = shoppingStuff[index].price * e.target.value;
      shoppingStuff[index].quantity = e.target.value;

      console.log(shoppingStuff[index].quantity)

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
      // let sH = this.state.shipPlusHandle;
      let discountValWord = this.state.discountValueInput;
      let discount = 0;
      // let semiTotal = subTotal + sH;
      let totalTotal = 0;

      const discountValue = discountVal.find(item => {
         return item.word === discountValWord
      })

      if(discountValue){
         totalTotal += subTotal - (subTotal * discountValue.number);
         discount += subTotal * discountValue.number

         this.setState({
            finalTotal: totalTotal,
            discount: discount
         })
      } else {
         this.setState({
            finalTotal: totalTotal,
            discount: discount
         })
      }
   }

   handleCheckout = () => {
      if(this.state.finalTotal > 0){
         this.setState({checkoutDisabled: true});
      }
   }

   //shippingInfo container code

   handleInputDataShippingInfo = (e) => {
      const {name, value} = e.target
      let shippingInfoDataInput =[...this.state.shippingInfoDataInput];

      shippingInfoDataInput.find((input) => input.name === name).value = value;

      this.setState( (prev) => ({ 
         ...prev,
         shippingInfoDataInput 
      }));
   }

   handleShippingFastFalse = () => {

      let currentSHTotal= 0;
      let subtractFromTotal = this.state.finalTotal - 5

      this.setState({
         shippingFast: false,
         shipPlusHandle: currentSHTotal,
         finalTotal: subtractFromTotal,
      })
   }

   handleShippingFastTrue = () => {
      //when clicked, it would add another $5 to the subtotal amount
      let currentSHTotal = 5;

      let addToTotalAmount = this.state.finalTotal + currentSHTotal
      
      console.log(addToTotalAmount)

      this.setState({
         shippingFast: true,
         shipPlusHandle: currentSHTotal,
         finalTotal: addToTotalAmount,
      })
   }

   handleBackToCart = () => {
      this.setState({checkoutDisabled: false})
   }





   render() {

      return (
            <div>
               {this.state.checkoutDisabled ?(
               <ShippingInfo 
               //state data for component
               shippingInfoDataProps= {this.state.shippingInfoData}
               shippingInfoDataInputProps = {this.state.shippingInfoDataInput}
               shippingFastStateProps= {this.state.shippingFast}

               //functions for component
               handleInputData = {this.handleInputData}
               handleInputDataShippingInfo = {this.handleInputDataShippingInfo}
               handleShippingFastFalse = {this.handleShippingFastFalse}
               handleShippingFastTrue = {this.handleShippingFastTrue}
               handleBackToCartProps = {this.handleBackToCart}
               
               //summary functions and numbers for component
               shoppingItemsProps ={this.state.shoppingItems}
               subTotalAmountItemsProps = {this.state.subTotal}
               shippingAndHandleProps = {this.state.shipPlusHandle}
               discountNumberProps = {this.state.discount}
               finalTotalProps = {this.state.finalTotal}
               /> 
               ):



               <CustomerCart
               shoppingItemsProps ={this.state.shoppingItems}
               subTotalAmountItemsProps = {this.state.subTotal}
               checkoutDisabledProps = {this.state.checkoutDisabled}
               shippingAndHandleProps = {this.state.shipPlusHandle}
               // discountValueProps = {this.state.discountValueInput}
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

export default Checkout 