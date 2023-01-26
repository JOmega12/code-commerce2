import React from "react";
import InputBase from "../../InputBase/InputBase";
import './customerCart.css'

// import '../../Images/cheese.png'

class CustomerCart extends React.Component {

   constructor(props) {
      super(props);
      this.state= {
         counter: 0
      }
   }

   incrementCounter = () => {
      this.setState({
         counter: this.state.counter + 1
      })
   }

   decrementCounter = () => {
      this.setState({
         counter: this.state.counter - 1
      })
   }


   render() {
      //make the item numbers specific per item in the data array then increment them

      return(
         <div className="mainCustomerForm">
            <h3>Shopping Cart</h3>
            <div className="items-container">
               <div className="item-cart">
                     {this.props.shoppingItemsProps.map(item => (
                        <div className="mini-container-items">
                           <p>{item.name}</p>
                           <p>${item.price}</p>
                           <p>Quanity:</p>
                           <label htmlFor="quantity"></label>
                           <select name="quantity" id=""> Quantity
                              <option value="option1">1</option>
                              <option value="option2">2</option>
                              <option value="option3">3</option>
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
                        <p>Cart Subtotal: </p>
                        <p>Shipping and Handling: </p>
                        <p>Discount: </p>
                        <p>Total: {this.props.totalAmountItemsProps}
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