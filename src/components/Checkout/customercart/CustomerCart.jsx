import React from "react";
import "./customerCart.css";
import { ItemsByCategory } from "./ItemsByCategory";

class CustomerCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItems: {},
      isCart: false,
    };
  }

  handleQuantityChange = (item, quantity) => {
    const selectedItems = { ...this.state.selectedItems };
    selectedItems[item.id] = parseInt(quantity);
    selectedItems[item.id] = { quantity: parseInt(quantity), isAdded: false };
    this.setState({ selectedItems });
  };

  addToCart = (item, e) => {
    e.preventDefault();
    const { selectedItems } = this.state;
    selectedItems[item.id].isAdded = true;

    this.props.updateTotalPriceProps(item.id, selectedItems[item.id].quantity);
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

    const outOfStock = shoppingItemsProps.filter(
      (item) => selectedItems[item.id] > item.quantityAvailable
    );

    if (outOfStock.length > 0) {
      alert(
        `The following items(s) are out of stock: ${outOfStock
          .map((item) => item.title)
          .join(", ")}}`
      );
    } else {
      this.props.handleCheckoutProp();
    }
  };

  render() {
    const { handleInputData } = this.props;

    const categoryItems = [
      "Shirts",
      "Shoes",
      "Shorts",
      "Gym Equipment",
      "Supplements",
    ];

    return (
      <div className="mainCustomerForm">
        <h3>Shopping Cart</h3>
        <form className="items-container">
          <div
            className="shoppingItemsContainer"
            style={{ display: "flex", flexDirection: "column" }}
          >
            {categoryItems.map((category, index) => (
              <ItemsByCategory
                key={index}
                category={category}
                shoppingItemsProps={this.props.shoppingItemsProps}
                selectedItemsProps={this.state.selectedItems}
                handleQuantityChange={this.handleQuantityChange}
                addToCartProps={this.addToCart}
              />
            ))}
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
