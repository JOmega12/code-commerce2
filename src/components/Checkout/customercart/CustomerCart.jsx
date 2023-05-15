import React from "react";
// import InputBase from "../../InputBase/InputBase";
import "./customerCart.css";

class CustomerCart extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      //i could put this in the checkout component so that it can be transferred to the shippingInfo component, instead of storing state here so that it could show that the selected items are reflected when the quantity is changed 
      //available quantity - 1 if selected 
      selectedItems: {}
    }
  }

  handleQuantityChange = (item, e) => {
    const selectedItems = {...this.state.selectedItems};

    selectedItems[item.id] = parseInt(e.target.value);
    this.setState({selectedItems});
    this.props.updateTotalPriceProps(this.props.shoppingItemsProps.indexOf(item), e)

  }


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
    console.log(outOfStock, 'outOfStock');

    if(outOfStock.length > 0) {
      alert(`The following items(s) are out of stock: ${outOfStock.map(item => item.title).join(', ')}}`)
    } else {
      this.props.handleCheckoutProp();
    }
  };

  render() {
    const { handleInputData, shoppingItemsProps } = this.props;

    const { selectedItems } = this.state;

    const outOfStockItems = shoppingItemsProps.filter((item) => selectedItems[item.id] > item.quantityAvailable);
    console.log(outOfStockItems, 'outofstockItems')
    // console.log(this.props.shoppingItemsProps, 'shoppingProps');
    // console.log(this.props.shoppingItemsProps.map((item) => (item.imageURL)), 'shoppingPropsURl');
    return (
      // <div>hi</div>
      <div className="mainCustomerForm">
        <h3>Shopping Cart</h3>
        <form className="items-container">

          <div className="shoppingItemsContainer"
            style={{display: 'flex', flexDirection: 'column'}}
          >
            <div className="shirts-items-container">
              {this.props.shoppingItemsProps
                .filter((item) => item.category === 'Shirts')
                .map((item) => (
                <div className="mini-container-items" key={item.id}>
                  <div className="img-item-container">
                    <img src={item.imageUrl} alt={item.title} />
                  </div>
                  <p>{item.title}</p>
                  <p>${item.price}</p>
                  <div className="quantity-items"
                    style={{display:'flex'}}  
                  >
                    <p>Quantity:</p>
                    <select
                      name="quantity"
                      id=""
                      value={this.state.selectedItems[item.id] || 0}
                      onChange={(e) =>
                        this.handleQuantityChange(item, e)
                      // }>
                        
                      // onChange={(e) =>
                      //   this.props.updateTotalPriceProps(
                      //     this.props.shoppingItemsProps.indexOf(item),
                      //     e
                      //   )
                      }>
                      Quantity:
                      {[...Array(11).keys()].map((_, index) => (
                        <option value={index}>{index}</option>
                      ))}
                    </select>
                  </div>
                </div>
                ))
              }
            </div>
            <div className="shirts-items-container">
              {this.props.shoppingItemsProps
                .filter((item) => item.category === 'Shorts')
                .map((item) => (
                <div className="mini-container-items" key={item.id}>
                  <div className="img-item-container">
                    <img src={item.imageUrl} alt={item.title} />
                  </div>
                  <p>{item.title}</p>
                  <p>${item.price}</p>
                  <div className="quantity-items"
                    style={{display:'flex'}}  
                  >
                    <p>Quantity:</p>
                    <select
                      name="quantity"
                      id=""
                      value={this.state.selectedItems[item.id] || 0}
                      onChange={(e) =>
                        this.handleQuantityChange(item, e)
                      // }>
                        
                      // onChange={(e) =>
                      //   this.props.updateTotalPriceProps(
                      //     this.props.shoppingItemsProps.indexOf(item),
                      //     e
                      //   )
                      }>
                      Quantity:
                      {[...Array(11).keys()].map((_, index) => (
                        <option value={index}>{index}</option>
                      ))}
                    </select>
                  </div>
                </div>
                ))
              }
            </div>
            <div className="shirts-items-container">
              {this.props.shoppingItemsProps
                .filter((item) => item.category === 'Shoes')
                .map((item) => (
                <div className="mini-container-items" key={item.id}>
                  <div className="img-item-container">
                    <img src={item.imageUrl} alt={item.title} />
                  </div>
                  <p>{item.title}</p>
                  <p>${item.price}</p>
                  <div className="quantity-items"
                    style={{display:'flex'}}  
                  >
                    <p>Quantity:</p>
                    <select
                      name="quantity"
                      id=""
                      value={this.state.selectedItems[item.id] || 0}
                      onChange={(e) =>
                        this.handleQuantityChange(item, e)
                      // }>
                        
                      // onChange={(e) =>
                      //   this.props.updateTotalPriceProps(
                      //     this.props.shoppingItemsProps.indexOf(item),
                      //     e
                      //   )
                      }>
                      Quantity:
                      {[...Array(11).keys()].map((_, index) => (
                        <option value={index}>{index}</option>
                      ))}
                    </select>
                  </div>
                </div>
                ))
              }
            </div>
            <div className="shirts-items-container">
              {this.props.shoppingItemsProps
                .filter((item) => item.category === 'Gym Equipment')
                .map((item) => (
                <div className="mini-container-items" key={item.id}>
                  <div className="img-item-container">
                    <img src={item.imageUrl} alt={item.title} />
                  </div>
                  <p>{item.title}</p>
                  <p>${item.price}</p>
                  <div className="quantity-items"
                    style={{display:'flex'}}  
                  >
                    <p>Quantity:</p>
                    <select
                      name="quantity"
                      id=""
                      value={this.state.selectedItems[item.id] || 0}
                      onChange={(e) =>
                        this.handleQuantityChange(item, e)
                      // }>
                        
                      // onChange={(e) =>
                      //   this.props.updateTotalPriceProps(
                      //     this.props.shoppingItemsProps.indexOf(item),
                      //     e
                      //   )
                      }>
                      Quantity:
                      {[...Array(11).keys()].map((_, index) => (
                        <option value={index}>{index}</option>
                      ))}
                    </select>
                  </div>
                </div>
                ))
              }
            </div>
            <div className="shirts-items-container">
              {this.props.shoppingItemsProps
                .filter((item) => item.category === 'Supplements')
                .map((item) => (
                <div className="mini-container-items" key={item.id}>
                  <div className="img-item-container">
                    <img src={item.imageUrl} alt={item.title} />
                  </div>
                  <p>{item.title}</p>
                  <p>${item.price}</p>
                  <div className="quantity-items"
                    style={{display:'flex'}}  
                  >
                    <p>Quantity:</p>
                    <select
                      name="quantity"
                      id=""
                      value={this.state.selectedItems[item.id] || 0}
                      onChange={(e) =>
                        this.handleQuantityChange(item, e)
                      // }>
                        
                      // onChange={(e) =>
                      //   this.props.updateTotalPriceProps(
                      //     this.props.shoppingItemsProps.indexOf(item),
                      //     e
                      //   )
                      }>
                      Quantity:
                      {[...Array(11).keys()].map((_, index) => (
                        <option value={index}>{index}</option>
                      ))}
                    </select>
                  </div>
                </div>
                ))
              }
            </div>
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
