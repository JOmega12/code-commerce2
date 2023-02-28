import React from 'react';
import CustomerCart from './customercart/CustomerCart';
// import PaymentInfo from './paymentInfo/PaymentInfo';
import ShippingInfo from './shippingInfo/ShippingInfo';
import './checkout.css';
import { shoppingItems, discountVal, shippingInfoData, shippingInfoDataInput} from '../constants/constants';
import { addressValidation, onlyTextValidation, phoneNumberValidation, zipCodeValidation } from '../validations/validation';


class Checkout extends React.Component {
   constructor(props){
      super(props)
      this.state = { 
         shoppingItems: shoppingItems,
         shoppingEmpty: '',
         subTotal: 0,
         //set checkoutDisabled as false to go back to checkout component
         //checkout and shippingInfo component is always set as false
         checkoutDisabled: true,
         shipPlusHandle: 0 ,
         discountValueInput: '',
         discount: 0,
         finalTotal: 0,
         shippingInfoData: shippingInfoData,
         shippingInfoDataInput: shippingInfoDataInput,
         shippingFast: false,
         error: {},
      }
   }

   // onChange function for customerCart
   handleInputData = (e) => {
      this.setState((prevState) => ({
         shippingInfoDataInput: prevState.shippingInfoDataInput.map(item => {
            if (item.hasOwnProperty(e.target.name)) {
              return { ...item, [e.target.name]: e.target.value };
            }
            return item;
          }),

         //why does this snippet break the code
         // shippingInfoDataInput: {
         //    ...prevState.shippingInfoDataInput,
         //    [e.target.name] : e.target.value,
         // },
         [e.target.name] : e.target.value,
      }))
      this.handleValidations(e.target.name, e.target.value)
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

   // handleInputDataShippingInfo = (e) => {
   //    // const {name, value} = e.target
   //    // let shippingInfoDataInput =[...this.state.shippingInfoDataInput];

   //    // shippingInfoDataInput.find((input) => input.name === name).value = value;

   //    this.setState( (prev) => ({ 
   //       shippingInfoDataInput: {
   //          ...prev.shippingInfoDataInput,
   //          [e.target.name]: e.target.value,
   //       }
   //    }));
   // }

   addShippingInfoToState = (obj) => {
      const newArr = [...this.state.shippingInfoDataInput];
      newArr.push(obj);
      this.setState((prevState) => ({
         ...prevState,
         shippingInfoData: newArr,
      }))
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

   handleValidations = (name, value) => {
      let errorText;
      
      switch(name){
         case 'addressTitle' :
            errorText= onlyTextValidation(value);
            //find addressTitle type
            //set the state of error message
            break;
         case 'name' :
            errorText= onlyTextValidation(value);
            break;
         case 'address' :
            // errorText= onlyTextValidation(value);
            errorText= addressValidation(value);
            break;
         case 'zipCode' :
            errorText= zipCodeValidation(value);
         break;
         case 'phoneNumber' :
            errorText = phoneNumberValidation(value);
         break;
         case 'telephone' :
            errorText = phoneNumberValidation(value);
         break;
         default:
            errorText = undefined;
            break;
      }

      this.setState((prevState) => ({
         error: {
            ...prevState.error,
            [name]: errorText,
         }
      }))
   }

   handleBlur = (e) => {
      this.handleValidations(e.target.name, e.target.value);
   }


   //it kind of works since it keeps the state in the area and can be transferred to the next
   //might need to work on how to get the button working
   
   //next button for credit card
   handleCheckoutShippingInfo = () => {
      const errorMessage = this.state.error

      if(!errorMessage){
         this.addShippingInfoToState(this.state.shippingInfoDataInput)
         this.setState((prevState) => ({
            shippingInfoData: {
               ...prevState.shippingInfoData,
               shippingInfoDataInput: shippingInfoDataInput
            }
         }))
      }
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
               errorMState = {this.state.error}

               //functions for component
               handleInputData = {this.handleInputData}
               // handleInputDataShippingInfo = {this.handleInputDataShippingInfo}
               handleShippingFastFalse = {this.handleShippingFastFalse}
               handleShippingFastTrue = {this.handleShippingFastTrue}
               handleBackToCartProps = {this.handleBackToCart}
               onBlurFunc = {this.handleBlur}
               handleCheckoutShippingInfo = {this.handleCheckoutShippingInfo}
               
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