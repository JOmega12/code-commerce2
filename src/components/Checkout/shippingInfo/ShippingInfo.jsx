import React from "react";
import { expressShipping} from "../../constants/constants";
import ProgressBar from "../../ProgressBar/ProgressBar";
import PaymentInfo from "../paymentInfo/PaymentInfo";
import '../shippingInfo/shippingInfo.css';


class ShippingInfo extends React.Component {
 
   constructor(props) {
      super(props)
      this.state= {
         shippingFast: false,
         //shippingInfoDisabled is always false
         shippingInfoDisabled: false,
      }
   }

   // handleSelected = (e) => {
   //    this.setState((prev) => ({
   //       ...prev,
   //       country: e.target.value
   //    }))
   // }

   handleShippingFastTrue = () => {
      this.setState({shippingFast: true})
   }

   handleShippingFastFalse = () => {
      this.setState({shippingFast: false})
   }

   
   //next button for credit card
   handleCheckoutShippingInfo = (e) => {
      e.preventDefault();

      this.props.handleCheckoutShippingInfo();
      this.setState({shippingInfoDisabled: true})
   }

   render() {
      const {shippingInfoDataInputProps} = this.props;
      const addressTitleValue = shippingInfoDataInputProps.map(item => item.addressTitle);
      const nameValue = shippingInfoDataInputProps.map(item => item.name);
      const addressValue = shippingInfoDataInputProps.map(item => item.address);
      const zipCodeValue = shippingInfoDataInputProps.map(item => item.zipCode);
      const phoneNumberValue = shippingInfoDataInputProps.map(item => item.phoneNumber);
      const telephoneValue = shippingInfoDataInputProps.map(item => item.telephone);


      const address = [
         {placeHolder: 'Address Title', name: 'addressTitle', value: addressTitleValue , },
         {placeHolder: 'Name', name: 'name', value: nameValue},
         {placeHolder: 'Address', name: 'address', value: addressValue , },
      ]

      const zipCode = [
         {placeHolder: 'Country',
         name: 'country', },
         {placeHolder: 'City',
         name: 'city', },
         {placeHolder: 'State',
         name: 'state', },
      ]

      const phone = [
         {placeHolder: 'Phone Number',
         name: 'phoneNumber',
         value: phoneNumberValue},
         {placeHolder: 'Telephone',
         name: 'telephone',
         value: telephoneValue},
      ]

      const radio = [
         {placeHolder: 'Standard Shipping', description: 'Delivery in 4-6 Business Days - Free', 
         shippingDetails: '',
         onClick: this.props.handleShippingFastFalse, checked: !this.props.shippingFastStateProps,
         name: expressShipping.regularShipping,},
         {placeHolder: 'Express Shipping', description: 'Delivery in 1-3 Business Days - $5', shippingDetails: 'View Shipping Details', 
         onClick: this.props.handleShippingFastTrue, checked: this.props.shippingFastStateProps
         },
      ]

      const country = ['United States', 'United Kingdom', 'Canada']

      const states = ['California', 'Texas', 'New York',]

      const citys = ['Los Angeles', 'Houston', 'New York',]

      return (
         <div>
         {this.state.shippingInfoDisabled ? (
            <PaymentInfo />
         ): 
         <div className="mainShippingForm">
            <div className="shippingInfoContainer">
               <div className="shipping-box-container">
                  <div className="loadingBar">
                     <ProgressBar percentage={50}/>   
                  </div>
                  <h3>Shipping Information</h3>
                  <div className="shippingInfoContainerBox">
         
                     {address.map(item=> (
                        <div className="inputShippingInfoContainer">
                           <span className="label">{item.placeHolder}</span>
                           <input 
                           style={{width: '50%', height: '25px'}}
                           name={item.name}
                           onChange={this.props.handleInputData}
                           onBlur = {this.props.onBlurFunc}
                           />
                           {this.props.errorMState[item.name] && <span className="errorMSI">{this.props.errorMState[item.name]}</span>}
                        </div>
                     ))}
                     <div className="other-shipping-info">
                        <div className="zipCodeShipping">
                           <div>
                              <span>Zip Code: </span>
                              <input
                              style={{width: '50px', height: '25px'}}
                              name= 'zipCode'
                              value={zipCodeValue}
                              onChange={this.props.handleInputData}
                              onBlur={this.props.onBlurFunc}
                              />
                           </div>
                           {this.props.errorMState['zipCode'] && <span className="errorMSI">{this.props.errorMState['zipCode']}</span>}
                        </div>

                        {zipCode.map(item => (
                           <div className="zipCodeOtherItems">
                              <p>{item.placeHolder}: </p>
                              <select 
                              name={item.name}
                              id=""
                              onChange={this.props.handleInputData}
                              defaultValue={item.value}
                              >
                              {item.name === 'country' && country.map((val) => (
                                 <option 
                                 key={val}
                                 value={val}
                                 >{val}</option>
                              ))}
                              {item.name === 'state' && states.map((val) => (
                                 <option 
                                 key={val}
                                 value={val}>{val}</option>
                              ))}
                              {item.name === 'city' && citys.map((val) => (
                                 <option value={val}
                                 key={val}
                                 >{val}</option>
                              ))}
                              </select> 
                           </div>
                        ))}
                     </div>

                     {phone.map(item => (
                        <div className="phone-number-shipping">
                           <span className="label">{item.placeHolder}</span>
                           <input type="number"
                           style={{width: '150px', height: '25px'}}
                           name={item.name}
                           onChange ={this.props.handleInputData}
                           onBlur = {this.props.onBlurFunc}
                           />
                            {this.props.errorMState[item.name] && <span className="errorMSI">{this.props.errorMState[item.name]}</span>}
                        </div>
                        
                     ))}
                     <hr />
                     <div className="shipping-method-container">
                        {radio.map(item => (
                           <div className="radio-shipping">
                              <input type="radio" 
                              name={item.name}
                              value=''
                              onChange={this.props.handleInputData}
                              onClick={item.onClick}
                              checked = {item.checked}
                              />
                              <p>{item.placeHolder}</p>
                              <p>{item.description}</p>
                              <p>{item.shippingDetails}</p>
                           </div>
                        ))}
                     </div>

                     <div>
                        <button className="back-to-cart"
                        onClick={this.props.handleBackToCartProps}
                        >
                           Back To Cart
                        </button>
                     </div>
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
                     onClick={(e)=> this.handleCheckoutShippingInfo(e)}
                     >CHECKOUT
                     </button>
                  </div>
               </div>
            </div>
         </div>
      }
         </div>
         
      )
   }
}

export default ShippingInfo;