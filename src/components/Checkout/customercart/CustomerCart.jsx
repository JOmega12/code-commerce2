import React from "react";
import InputBase from "../../InputBase/InputBase";
import './customerCart.css'


class CustomerCart extends React.Component {

   constructor() {
      super();
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

      const itemCartData = [
         {imageItem: 'image-item', image: '', description: 'Milk', price: ''}
      ]

      // if else component would be here for the value i think
      const buttonInput = [
         {type: 'button', value:'incrementCounter/decrement', name:'buttonPlus' },
         {type: 'button', value:'decrementCounter/decrement', name:'buttonPlus' },
      ]

      //make the item numbers specific per item in the data array then increment them

      return(
         <div className="mainCustomerForm">
            <h3>Cart Screen</h3>
            <div className="items-container">
               <div className="item">
                  <div className="image-item">
                     <img src="" alt="" />
                  </div>
                  <div className="description">
                     <span>Milk</span>
                  </div>
                  <div className="quantity">
                     <InputBase type='button' 
                     value='incrementCounter'
                     onClick={this.incrementCounter}
                     name='buttonPlus'/>
                     <p className="incrPlus">{this.state.counter}</p>
                     <InputBase 
                     type='input'
                     onChange= {this.somethingaddingonIncrement}
                     />
                     <InputBase
                     type='button'
                     value='decrementCounter'
                     onClick={this.decrementCounter}
                     name='buttonMinus'/>
                     <p className="incrPlus">{this.state.counter}</p>

                  </div>
               </div>
               <div className="total-price"></div>
            </div>
            <div className="summary">

            </div>
         </div>
      )
   }
}

export default CustomerCart;