import React from "react";
import '../shippingInfo/shippingInfo.css';



class ShippingInfo extends React.Component {
 
   render() {

      const address = [
         {placeHolder: 'Address Title', name: 'addressTitle', value: this.props.shippingInfoDataInputProps , },
         {placeHolder: 'Name', name: 'name', value: this.props.shippingInfoDataInputProps},
         {placeHolder: 'Address', name: 'address', value: this.props.shippingInfoDataInputProps , },
      ]

      const zipCode = [
         {name: 'Country', 
         type: ['United States', 'United Kingdom', 'Canada'],
         value: this.props.shippingInfoDataInputProps,
         },
         {name: 'City',
         type: ['Los Angeles', 'Austin', 'New York'],
         value: this.props.shippingInfoDataInputProps, },
         {name: 'State',
         type: ['California', 'Texas', 'New York'],
         value: this.props.shippingInfoDataInputProps, },
      ]

      const phone = [
         {name: 'Phone Number'},
         {name: 'Telephone'},
      ]

      const radio = [
         {name: 'Standard Shipping', description: 'Delivery in 4-6 Business Days - Free'},
         {name: 'Express Shipping', description: 'Delivery in 1-3 Business Days - $5', shippingDetails: 'View Shipping Details'},

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
                           value={item.value[item.name]}
                           // onChange={this.props.handleInputDataShippingInfo}
                           onChange={this.props.handleInputDataShippingInfo
                           }
                           />
                        </div>
                     ))}
                     <div className="other-shipping-info">
                        <div className="zipCodeShipping">
                           <span>Zip Code: </span>
                           <input
                           style={{width: '50px', height: '25px'}}
                           value={this.props.shippingInfoDataProps.ZipCode}
                           onChange={this.props.handleInputData}
                           />
                        </div>

                        {zipCode.map(item => (
                           <div className="zipCodeOtherItems">
                              <p>{item.name}: </p>
                              <select name="" id="">
                              {item.name === 'Country' && country.map((val) => (
                                 <option value={val}>{val}</option>
                              ))}
                              {item.name === 'State' && states.map((val) => (
                                 <option value={val}>{val}</option>
                              ))}
                              {item.name === 'City' && citys.map((val) => (
                                 <option value={val}>{val}</option>
                              ))}
                              </select> 
                           </div>
                        ))}
                     </div>

                     {phone.map(item => (
                        <div className="phone-number-shipping">
                           <span className="label">{item.name}</span>
                           <input type="number"
                           style={{width: '150px', height: '25px'}}
                           onChange ={this.props.handleInputDataShippingInfo}
                           />
                        </div>
                     ))}
                     <hr />
                     <div className="shipping-method-container">
                        {radio.map(item => (
                           <div className="radio-shipping">
                              <input type="radio" />
                              <p>{item.name}</p>
                              <p>{item.description}</p>
                              <p>{item.shoppingDetails}</p>
                           </div>
                        ))}
                     </div>

                     <div>
                        <button className="back-to-cart">Back To Cart</button>
                     </div>
                  </div>
               </div>
               <div className="summary">
                  <h3>Summary</h3>
                  {/* missing the items that are moved from previous component*/}
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
                     disabled={this.props.checkoutDisabledProps}
                     onClick={(e)=> this.handleCheckout(e)}
                     >Payment
                     </button>
                  </div>
               </div>
            </div>
         </div>
      )
   }
}

export default ShippingInfo;