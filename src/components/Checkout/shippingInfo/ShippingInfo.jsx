import React from "react";
import { expressShipping, shippingInfoDataInput } from "../../constants/constants";
import '../shippingInfo/shippingInfo.css';



class ShippingInfo extends React.Component {
 
   constructor(props) {
      super(props)
      this.state= {
         shippingFast: false,
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

   render() {

      const address = [
         {placeHolder: 'Address Title', name: 'addressTitle', value: this.props.shippingInfoDataInputProps.value , },

         {placeHolder: 'Name', name: 'name', value: this.props.shippingInfoDataInputProps.value},

         {placeHolder: 'Address', name: 'address', value: this.props.shippingInfoDataInputProps.value , },
      ]

      const zipCode = [
         {placeHolder: 'Country',
         name: shippingInfoDataInput[4].name, 
         },

         {placeHolder: 'City',
         name: shippingInfoDataInput[5].name, },
         
         {placeHolder: 'State',
         name: shippingInfoDataInput[6].name, },
      ]

      const phone = [
         {placeHolder: 'Phone Number',
         name: shippingInfoDataInput[7].name,
         value: this.props.shippingInfoDataInputProps.value},
         {placeHolder: 'Telephone',
         name: shippingInfoDataInput[8].name,
         value: this.props.shippingInfoDataInputProps.value},
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

      const country = [
         'United States', 'United Kingdom', 'Canada'
      ]

      const states = [
         'California', 'Texas', 'New York',
      ]

      const citys = [
         'Los Angeles', 'Houston', 'New York',
      ]

      return (
         <div className="mainShippingForm">
            <div className="shippingInfoContainer">
               <div className="shipping-box-container">
                  <div className="loadingBar"></div>
                  <h3>Shipping Information</h3>
                  <div className="shippingInfoContainerBox">
         
                     {address.map(item=> (
                        <div className="inputShippingInfoContainer">
                           <span className="label">{item.placeHolder}</span>
                           <input 
                           style={{width: '50%', height: '25px'}}
                           name={item.name}
                           //value does not work since the onchange does the lifting for the item.name === item.value
                           // value={item.value}
                           onChange={this.props.handleInputDataShippingInfo}
                           />
                        </div>
                     ))}
                     <div className="other-shipping-info">
                        <div className="zipCodeShipping">
                           <span>Zip Code: </span>
                           <input
                           style={{width: '50px', height: '25px'}}
                           name= 'zipCode'
                           value={this.props.shippingInfoDataInputProps.value}
                           onChange={this.props.handleInputDataShippingInfo}
                           />
                        </div>

                        {zipCode.map(item => (
                           <div className="zipCodeOtherItems">
                              <p>{item.placeHolder}: </p>
                              <select 
                              name={item.name}
                              id=""
                              onChange={this.props.handleInputDataShippingInfo}
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
                           onChange ={this.props.handleInputDataShippingInfo}
                           />
                        </div>
                     ))}
                     <hr />
                     <div className="shipping-method-container">
                        {radio.map(item => (
                           <div className="radio-shipping">
                              <input type="radio" 
                              name={item.name}
                              value=''
                              onChange={this.props.handleInputDataShippingInfo}
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
                     onClick={(e)=> this.handleNext(e)}
                     >CHECKOUT
                     </button>
                  </div>
               </div>
            </div>
         </div>
      )
   }
}

export default ShippingInfo;