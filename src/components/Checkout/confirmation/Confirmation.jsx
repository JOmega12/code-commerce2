import React from "react";
import { expressShipping } from "../../constants/constants";
import ProgressBar from "../../ProgressBar/ProgressBar";
import '../confirmation/confirmation.css'

class Confirmation extends React.Component {

   render() {
      return(
         <div className="mainBoxConfirmation">
            <div className="confirmationBoxContainer">
               <div className="progressBar">
                  <div className="loadingBarConf">
                     <ProgressBar percentage ={100}/>
                  </div>
               </div>
               <div className="mainBoxContainer">
                  <div className="left-mainbox">
                    <div className="confirmationTitle">
                     CONFIRMATION
                    </div>
                    {/* <hr /> */}
                    <div className="checkmark">
                     <i class="fa-solid fa-check"></i>
                    </div>
                    <div className="congratulations">
                     <h4>CONGRATULATIONS</h4>
                     <h4>Your order is accepted</h4>
                     <p>Lorem ipsum dolor sit amet, consectur adipscing elit. Proin et arcu.</p>
                    </div>
                    <div>
                     <button className="trackOrder">
                        Track Order
                     </button>
                    </div>
                    <div>
                     <button className="backToHome">
                        Back To Home Page
                     </button>
                    </div>
                  </div>
                  <div className="right-mainbox">
                     <div className="summaryTitle-confirmationBox">
                     Summary
                     </div>
                     <hr />
                     {this.props.shoppingItemsProps.map((item, index) => {

                        // const data = [
                        //    {label: 'Price: $', value: item.price}
                        // ]
                        if(item.quantity > 0) {
                           return (
                              <div className="itemsFromCart-Conf"
                              key ={index}
                              >
                              <div className="individualItemL-Conf">
                                 <img src={item.imageUrl} alt="" />
                              </div>
                              <div className="individualItemR-Conf">

                                 <h5>{item.title}</h5>
                                 <p>${item.price}</p>
                                 {/* <p>{item.title}</p> */}
                                 {/* {data.map((val) => (
                                    <p>{val.label}{item[val.price]}</p>
                                 ))} */}
                                 {/* <p>Price: ${item.price}</p> */}
                                 <p>Quantity: {item.quantity}</p>
                                 <p>Total: ${item.totalPrice}</p>
                              </div>
                           </div>
                           )
                        } else {
                           return null;
                        }
                     })}
                     <hr />

                     <div className="cart-subTotal-confirmation">
                        <p>Subtotal: ${this.props.subTotalAmountItemsProps}</p>
                        <p>
                        Shipping and Handling: ${this.props.shippingAndHandleProps}
                        </p>
                        <p>Discount: ${this.props.discountNumberProps}</p>
                        <p>Total: ${this.props.finalTotalProps}</p>
                     </div>
                     <hr />
                     <div className="shipping-confirmation">
                        <div className="shipping-title">
                           <h4>SHIPPING</h4>
                           <p>View Shipping Details</p>
                        </div>
                        <div>
                           {this.props.shippingFastProps ? (
                              <div className="expressShipping-conf">
                                 <h4>{expressShipping[1].placeHolder}</h4>
                                 <p>{expressShipping[1].description}</p>
                              </div>
                           ) : (
                              <div className="expressShipping-conf">
                                 <h4>{expressShipping[0].placeHolder}</h4>
                                 <p>{expressShipping[0].description}</p>
                              </div>
                           )}
                        </div>
                     </div>
                     <hr />
                     <div className="payment-confirmation">
                        <div className="payment-title">
                           <h4>PAYMENT</h4>
                           <p>View Payment Details</p>
                        </div>
                        <div>
                           <div>
                              <p>Card Number: **** **** **** {this.props.cardDataInfoProps.cardNumber.substr(-4)}</p>
                              <p>{this.props.cardTypeProps}</p>
                           </div>

                           <p>Total: ${this.props.finalTotalProps}</p>
                        </div>
                     </div>
                  </div>

               </div>
            </div>
         </div>
      )
   }
}

export default Confirmation