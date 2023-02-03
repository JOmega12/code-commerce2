import React from "react";
import '../shippingInfo/shippingInfo.css';
import InputBase from "../../InputBase/InputBase";

class ShippingInfo extends React.Component {
 
   render() {
      return (
         <div className="mainShippingForm">
            <div className="shippingInfoContainer">
               <div className="shipping-box-container">
                  <div className="loadingBar"></div>
                  <h3>Shipping Information</h3>
                  <div className="shippingInfoContainerBox">
                     <div>
                        <p>Address Title</p>
                        <InputBase/>
                     </div>
                     <div>
                        <p>Name</p>
                        <InputBase/>
                     </div>
                     <div>
                        <p>Address</p>
                        <InputBase/>
                     </div>
                     <div className="other-shipping-info">
                        <div className="zipCodeShipping">
                           <p>Zip Code</p>
                           <InputBase/>
                        </div>
                        <div>
                           <p>Country</p>
                           <select name="" id="">
                              <option value=""></option>
                           </select>
                        </div>
                        <div>
                           <p>City</p>
                           <select name="" id="">
                              <option value=""></option>
                           </select>
                        </div>
                        <div>
                           <p>State</p>
                           <select name="" id="">
                              <option value=""></option>
                           </select>
                        </div>
                     </div>
                     <div className="cell-number">
                        <p>Cell Phone</p>
                        <InputBase/>
                     </div>
                     <div className="telephone-number">
                        <p>Telephone</p>
                        <InputBase/>
                     </div>
                     <hr />
                     <div className="shipping-method-container">
                        <div className="standard">
                           
                        </div>
                        <div className="standard">
                           
                        </div>
                     </div>
                     <div className="back-to-cart">
                        <h4>Back To Cart</h4>
                     </div>
                  </div>
               </div>
               <div className="summary">
                  <h3>Summary</h3>
                  {/* missing the items that are taken on */}
                  <div className="total-price">
                     <p>Subtotal: {this.props.subTotalAmountItemsProps}</p>
                     <p>Shipping and Handling: {this.props.shippingAndHandleProps}</p>
                     <p>Discount: {this.props.discountNumberProps}</p>
                     <p>Total: {this.props.finalTotalProps}
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