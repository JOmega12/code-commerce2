import React from "react";
// import InputBase from "../../InputBase/InputBase";
import './customerCart.css';


class CustomerCart extends React.Component {

   handleDiscount = (e) => {
      e.preventDefault(e);
      this.props.discountButtonProps();
   }
   
   handleCheckout = (e) => {
      e.preventDefault(e);
      this.props.handleCheckoutProp();
   }


   render() {

      const {handleInputData} = this.props;


      return(
         // <div>hi</div>
         <div className="mainCustomerForm">
            <h3>Shopping Cart</h3>
            <form className="items-container">
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
                           {[...Array(11).keys()].map( (_ , index) => (<option value={index}>{index}</option>))}
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
                        
                        <input
                        autoComplete = 'off'
                        placeholder="Promo"
                        name='discountValueInput'
                        type="text" 
                        onChange={handleInputData}
                        />

                        <button
                        onClick={(e) => this.handleDiscount(e)}
                        >Apply
                        </button>

                     </div>
                     <div className="total-price">
                        <p>Subtotal: ${this.props.subTotalAmountItemsProps}</p>
                        <p>Shipping and Handling: ${this.props.shippingAndHandleProps}</p>
                        <p>Discount: ${this.props.discountNumberProps}</p>
                        <p>Total: ${this.props.finalTotalProps}
                        </p>
                     </div>
                     <div>
                        <button
                        disabled={this.props.checkoutDisabledProps}
                        onClick={(e)=> this.handleCheckout(e)}
                        >Checkout
                        </button>
                     </div>
                  </div>
               </div>
            </form>
         </div>
      )
   }
}


export default CustomerCart;