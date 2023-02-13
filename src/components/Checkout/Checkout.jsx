import React from 'react';
import CustomerCart from './customercart/CustomerCart';
// import PaymentInfo from './paymentInfo/PaymentInfo';
import ShippingInfo from './shippingInfo/ShippingInfo';
import './checkout.css';
import { shoppingItems, discountVal, shippingInfoData,  } from '../constants/constants';

// shippingInfoDataInput

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
         shipPlusHandle: 3.99 ,
         discountValueInput: '',
         discount: 0,
         finalTotal: 0,
         shippingInfoData: shippingInfoData,
         shippingInfoDataInput: '',
         // nextShippingStep: false,
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



   //onChange function for shippingInfo
   // handleInputDataShippingInfo = (e) => {
   //    this.setState({
   //       shippingInfoData: {
   //          ...shippingInfoData,
   //          [e.target.name] : e.target.value
   //       }
   //    })
   // }

   handleInputDataShippingInfo = (e) => {
      let shippingInfoData = [...this.state.shippingInfoDataInput];
      shippingInfoData[0][e.target.name] = e.target.value;
      this.setState({ shippingInfoData });
   }





   render() {

      return (
            <div>
               {this.state.checkoutDisabled ?(
               <ShippingInfo 
               shippingInfoDataProps= {this.state.shippingInfoData}
               shippingInfoDataInputProps = {this.state.shippingInfoDataInput}


               handleInputData = {this.handleInputData}
               handleInputDataShippingInfo = {this.handleInputDataShippingInfo}
               /> ):



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

export default Checkout 