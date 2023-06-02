import React from "react";
// import InputBase from "../../InputBase/InputBase";
import "./customerCart.css";
import Item from './Item'

class CustomerCart extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedItems: {},
      isCart: false,
    }
  }

  //this is the og code for handle QuantityChange
  // handleQuantityChange = (item, e) => {
  //   const selectedItems = {...this.state.selectedItems};
  //   selectedItems[item.id] = parseInt(e.target.value);
  //   this.setState({selectedItems});
  //   this.props.updateTotalPriceProps(this.props.shoppingItemsProps.indexOf(item), e)
  // }


  handleQuantityChange = (item, quantity) => {
    const selectedItems = {...this.state.selectedItems};
    selectedItems[item.id] = parseInt(quantity)
    this.setState({selectedItems});
    // this.props.updateTotalPriceProps(this.props.shoppingItemsProps.indexOf(item), e);
    // this.props.updateTotalPriceProps(item.id, parseInt(quantity));
  }

  addToCart = (item, e) => {
    e.preventDefault()
    const { selectedItems } = this.state;
    const quantity = selectedItems[item.id] || 0;
    
    // // Check if the item is already in the cart
    // if (quantity > 0) {
    //   // Item already exists, update the quantity
    //   selectedItems[item.id] = quantity + 1;
    // } else {
    //   // Item doesn't exist, add it to the cart with quantity 1
    //   selectedItems[item.id] = 1;
    // }

    this.props.updateTotalPriceProps(item.id, selectedItems[item.id])
    this.setState({ selectedItems });
  };


  handleDiscount = (e) => {
    e.preventDefault(e);
    this.props.discountButtonProps();
  };

  handleCheckout = (e) => {
    e.preventDefault(e);

    const { selectedItems } = this.state;
    const { shoppingItemsProps } = this.props;

    const outOfStock = shoppingItemsProps.filter((item) => 
      selectedItems[item.id] > item.quantityAvailable
    ); 

    if(outOfStock.length > 0) {
      alert(`The following items(s) are out of stock: ${outOfStock.map(item => item.title).join(', ')}}`)
    } else {
      this.props.handleCheckoutProp();
    }
  };

  render() {
    const { handleInputData } = this.props;

    return (
      <div className="mainCustomerForm">
        <h3>Shopping Cart</h3>
        <form className="items-container">

          <div className="shoppingItemsContainer"
            style={{display: 'flex', flexDirection: 'column'}}
          >
            <div className="shirts-items-container">
              {this.props.shoppingItemsProps
                .filter((item) => item.category === 'Shirts')
                .map((item, index) => (
                <Item 
                  item={item} 
                  selectedItems ={this.state.selectedItems} handleQuantityChange={this.handleQuantityChange}
                  addToCartProps={this.addToCart}
                  key = {index}
                />
                ))
              }
            </div>
{/*             <div className="shirts-items-container">
              {this.props.shoppingItemsProps
                .filter((item) => item.category === 'Shorts')
                .map((item) => (
                  <Item item={item} selectedItems ={this.state.selectedItems} handleQuantityChange={this.handleQuantityChange}/>
                ))
              }
            </div>
            <div className="shirts-items-container">
              {this.props.shoppingItemsProps
                .filter((item) => item.category === 'Shoes')
                .map((item) => (
                  <Item item={item} selectedItems ={this.state.selectedItems} handleQuantityChange={this.handleQuantityChange}/>
                ))
              }
            </div>
            <div className="shirts-items-container">
              {this.props.shoppingItemsProps
                .filter((item) => item.category === 'Gym Equipment')
                .map((item) => (
                  <Item item={item} selectedItems ={this.state.selectedItems} handleQuantityChange={this.handleQuantityChange}/>
                ))
              }
            </div>
            <div className="shirts-items-container">
              {this.props.shoppingItemsProps
                .filter((item) => item.category === 'Supplements')
                .map((item) => (
                  <Item item={item} selectedItems ={this.state.selectedItems} handleQuantityChange={this.handleQuantityChange}/>
                ))
              }
            </div> */}
          </div>
          
          <div className="summary">
            <h3>Summary</h3>
            <div className="promo-container">
              <p>Do you have a promo code?</p>
              <div className="promo-button">
                <input
                  autoComplete="off"
                  placeholder="Promo"
                  name="discountValueInput"
                  type="text"
                  onChange={handleInputData}
                />

                <button onClick={(e) => this.handleDiscount(e)}>Apply</button>
              </div>
              <div className="total-price">
                <p>Subtotal: ${this.props.subTotalAmountItemsProps}</p>
                <p>
                  Shipping and Handling: ${this.props.shippingAndHandleProps}
                </p>
                <p>Discount: ${this.props.discountNumberProps}</p>
                <p>Total: ${this.props.finalTotalProps}</p>
              </div>
              <div>
                <button
                  disabled={this.props.checkoutDisabledProps}
                  // disabled = {outOfStockItems.length > 0}
                  onClick={(e) => this.handleCheckout(e)}
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default CustomerCart;
