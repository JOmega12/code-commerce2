import React from "react";
import { cardInformation, OTHERCARDS } from "../../constants/constants";
import ProgressBar from "../../ProgressBar/ProgressBar";
import { cardNumberValidation, onlyTextValidation, securityCodeValidation } from "../../validations/validation";

import '../paymentInfo/paymentInfo.css'


class PaymentInfo extends React.Component {
   constructor(props) {
      super(props)
      this.state= {
         cardData: cardInformation,
         maxLength: OTHERCARDS.length,
         cardType: null
      }
   }


   findDebitCardType = (cardNumber) => {
      const regexPattern = {
         MASTERCARD: /^5[1-5][0-9]{1,}^[2-7][0-9]{1,}$/,
         VISA: /^4[0-9]{2,}$/,
         AMERICAN_EXPRESS: /^3[47][0-9]{5,}$/,
         DISCOVER: /^6(?:011|5[0-9]{2})[0-9]{3,}$/,
      };

      for (const card in regexPattern){
         if(cardNumber.replace(/[^\d]/g, '').match(regexPattern[card])) return card;
      }
   }

   handleInputData = (e) => {

   if(e.target.name === 'cardNumber') {
      let mask = e.target.value.split(' ').join('');
      if(mask.length) {
         mask = mask.match(new RegExp('.{1,4}', 'g')).join(' ');
         this.setState((prevState) => ({
            cardData: {
               ...prevState.cardData,
               [e.target.name]: mask,
            }
         }))
      } else {
         this.setState((prevState) => ({
            cardData: {
               ...prevState.cardData,
               [e.target.name]: '',
            }
         }))
      }
   } else {
      this.setState((prevState) => ({
         cardData: {
            ...prevState.cardData,
            [e.target.name]: e.target.value,
         }
         //why does this snippet break the code
         // shippingInfoDataInput: {
         //    ...prevState.shippingInfoDataInput,
         //    [e.target.name] : e.target.value,
         // },
      }))
   }
      this.handleValidations(e.target.name, e.target.value)
   }

   handleValidations = (name, value) => {
      let errorText;
      
      switch(name){
         case 'cardHolderName' :
            errorText = onlyTextValidation(value);
         break;
         case 'cardNumber' :
            errorText = cardNumberValidation(value);
            this.setState((prevState) => ({
               cardType: this.findDebitCardType(value),
               error: {
                  ...prevState.error,
                  cardError: errorText,
               },
            }));
         break;
         case 'cvv' :
            errorText = securityCodeValidation(value);
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
   
   render(){

      const cardInput = [
         {label: 'Cardholder Name', type: 'text', name:'cardHolderName', error: 'cardHolderNameError'},
         {label: 'Card Number', type: 'text', name:'cardNumber', error: 'cardNumberError'},
      ];

      const expInput = [
         // {label: 'Exp.Date', name:'expDate'},
         {label: 'Month', name:'monthExp'},
         {label: 'Year', name:'yearExp'},
      ]

      // const cvvInput= [
      //    {label: 'CVV', type: 'number', name:'cvv', error: 'cvvError'},
      // ]


      
      const monthDropdown = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

      const yearDropdown = [2023, 2024, 2025]


      //create the html first then go from there
      //next watch the videos and copy them for payment information regarding the validation for credit cards
      return(
         <div className="mainPaymentForm">
            <div className="paymentInfoContainer">
               <div className="payment-box-container">
                  <div className="loadingBar">
                     <ProgressBar percentage = {75} />
                  </div>
                  <h3>Payment Information</h3>
                  <div className="paymentInfoContainerBox">
                     {cardInput.map((item) => (
                     <div className="inputPaymentInfoContainer">
                     <span class='labelPayment'>{item.label}</span>
                     <input 
                     style={{width: '70%', height: '25px'}}
                     type={item.type} 
                     name = {item.name}
                     value={this.state.cardData && this.state.cardData[item.name]}
                     onChange = {this.handleInputData}

                     />
                     </div>
                     ))}
                     
                     <div className="other-payment-info">
                        <span>Exp. Date</span>
                        <div className="expDateItemsContainer">
                        {expInput.map(item => (
                           <div className="expDateItems">
                              <select 
                              name={item.name} 
                              id=""
                              >
                                 {item.name === 'monthExp' && monthDropdown.map((val) => (
                                    <option
                                    key={val}
                                    value={val}
                                    >{val}</option>
                                 ))}
                                 {item.name === 'yearExp' && yearDropdown.map((val) => (
                                    <option
                                    key={val}
                                    value={val}
                                    >{val}</option>
                                 ))}
                              </select>
                           </div>
                        ))}
                        </div>
                     </div>
                     
                     <div className="inputPaymentInfoContainer">
                     <span class='labelPayment cvvInput'>CVV</span>
                     <input 
                     style={{width: '20%', height: '25px'}}
                     type= 'number'
                     name = 'cvv'
                     />
                     </div>

                  </div>

                  <div>
                     <button
                     className="backToContainerShip"
                     > 
                        Back To Address
                     </button>
                  </div>
               </div>

               
               <div className="summary">
               <h3>Summary</h3>
                  {/* missing the items that are moved from previous component*/}
                  {this.props.shoppingItemsProps.map((item, index) => {
                     if(item.quantity > 0) {
                        return (
                           <div className="itemsFromCart"
                           key ={index}
                           >
                           <div className="individualItemL">
                              <img src={item.img} alt="" />
                           </div>
                           <div className="individualItemR">
                              <h5>{item.name}</h5>
                              <div className="description-items">
                                 <p>Price: ${item.price}</p>
                                 <p>Quantity: {item.quantity}</p>
                                 <p>Total: ${item.totalPrice}</p>
                              </div>
                           </div>
                        </div>
                        )
                     } else {
                        return null;
                     }
                  })}

               <div className="total-price">
                  <p>
                     Subtotal: {this.props.subTotalAmountItemsProps}
                  </p>
                  <p>
                     Shipping and Handling: {this.props.shippingAndHandleProps}</p>
                  <p>
                     Discount: {this.props.discountNumberProps}</p>
                  <p>
                     Total: {this.props.finalTotalProps}
                  </p>
               </div>
               <div>
                  <button
                  className="checkout-next"
                  disabled={this.props.checkoutDisabledProps}
                  // onClick={(e)=> this.handleCheckoutShippingInfo(e)}
                  >CHECKOUT
                  </button>
               </div>
               </div>
            </div>
         </div>
      )
   }
}

export default PaymentInfo;