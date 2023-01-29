import React from "react";
// import InputBase from "../../InputBase/InputBase";
import './customerCart.css'


class CustomerCart extends React.Component {

   constructor(props) {
      super(props);
      this.state= {
         counter: 0
      }
   }


   render() {
      //make the item numbers specific per item in the data array then increment them

      return(
         // <div>hi</div>
         <div className="mainCustomerForm">
            <h3>Shopping Cart</h3>
            <div className="items-container">
               <div className="item-cart">
                     {this.props.shoppingItemsProps.map(item => (
                        <div className="mini-container-items">
                           <div className="img-item-container">
                              <img src={item.img} alt={item.name} />
                           </div>
                           <p>{item.name}</p>
                           <p>${item.price}</p>
                           <p>Quantity:</p>

                           <select name="quantity" id=""
                           
                           onChange={(e)=> this.props.updateTotalPriceProps(this.props.shoppingItemsProps.indexOf(item), e)}
                           >
                               Quantity: 
                           {[...Array(10).keys()].map( (_ , index) => (<option value={index+1}>{index + 1}</option>))}
                           </select>


                           <p>Total: {item.totalPrice}</p>
                        </div>
                     ))}
               </div>
               <div className="summary">
                  <h3>Summary</h3>
                  <div className="promo-container">
                     <p>Do you have a promo code?</p>
                     <div className="promo-button">
                        <input type="text" />
                        <button>Apply</button>
                     </div>
                     <div className="total-price">
                        <p>Subtotal: {this.props.subTotalAmountItemsProps}</p>
                        <p>Shipping and Handling: </p>
                        <p>Discount: </p>
                        <p>Total:
                        </p>
                     </div>
                     <div>
                        <button
                        disabled={this.props.checkoutDisabledProps}
                        >Checkout</button>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      )
   }
}

export default CustomerCart;