import React from "react";


class PaymentInfo extends React.Component {
   render(){

      const cardInput = [
         {label: 'Cardholder Name', type: 'text', name:'cardHolderName', error: 'cardHolderNameError'},
         {label: 'Card Number', type: 'number', name:'cardNumber', error: 'cardNumberError'},
      ];

      const expInput = [
         {label: 'Exp.Date', name:'cardHolderName'},
         {label: 'Month', name:'cardHolderName'},
         {label: 'Year', name:'cardHolderName'},
      ]

      const cvvInput= [
         {label: 'CVV', type: 'number', name:'cvv', error: 'cvvError'},
      ]


      
      const monthDropdown = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

      const yearDropdown = [2023, 2024, 2025]


      //create the html first then go from there
      //next watch the videos and copy them for payment information regarding the validation for credit cards
      return(
         <div className="mainShippingForm">
            <div className="shippingInfoContainer">
               <div className="shipping-box-container">
                  <div className="loadingBar"></div>
                  <h3>Payment Information</h3>
                  <div className="shippingInfoContainerBox">
                     {cardInput.map((item) => {
                     <div className="inputShippingInfoContainer">
                     <span class='label'>{item.label}</span>
                     <input 
                     type={item.type} 
                     name = {item.name}
                     />
                     </div>
                     })}
                     
                     <div className="other-shipping-info">

                     </div>
                  </div>
               </div>
               <div className="summary">

               </div>
            </div>
         </div>
      )
   }
}

export default PaymentInfo;