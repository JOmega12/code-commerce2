import React from "react";
import { expressShipping } from "../../constants/constants";
import ProgressBar from "../../ProgressBar/ProgressBar";
import PaymentInfo from "../paymentInfo/PaymentInfo";
import "../shippingInfo/shippingInfo.css";

class ShippingInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shippingInfoDisabled: false,
    };
  }

  //next button for credit card
  handleCheckoutShippingInfo = (e) => {
    e.preventDefault();

    if (this.props.handleCheckoutShippingInfo()) {
      this.setState({ shippingInfoDisabled: true });
    }
  };

  backToShippingInfoButton = () => {
    this.setState({ shippingInfoDisabled: false });
  };

  render() {
    const { shippingInfoDataInputProps } = this.props;
    const addressTitleValue = shippingInfoDataInputProps.map(
      (item) => item.addressTitle
    );
    const nameValue = shippingInfoDataInputProps.map((item) => item.name);
    const addressValue = shippingInfoDataInputProps.map((item) => item.address);
    const zipCodeValue = shippingInfoDataInputProps.map((item) => item.zipCode);
    const phoneNumberValue = shippingInfoDataInputProps.map(
      (item) => item.phoneNumber
    );
    const telephoneValue = shippingInfoDataInputProps.map(
      (item) => item.telephone
    );

    const address = [
      {
        placeHolder: "Address Title",
        name: "addressTitle",
        value: addressTitleValue,
      },
      { placeHolder: "Name", name: "name", value: nameValue },
      { placeHolder: "Address", name: "address", value: addressValue },
    ];

    const zipCode = [
      { placeHolder: "Country", name: "country" },
      { placeHolder: "City", name: "city" },
      { placeHolder: "State", name: "state" },
    ];

    const phone = [
      {
        placeHolder: "Phone Number",
        name: "phoneNumber",
        value: phoneNumberValue,
      },
      { placeHolder: "Telephone", name: "telephone", value: telephoneValue },
    ];

    const radio = [
      {
        placeHolder: "Standard Shipping",
        description: "Delivery in 4-6 Business Days - Free",
        shippingDetails: "",
        onClick: this.props.handleShippingFastFalse,
        checked: !this.props.shippingFastStateProps,
        name: expressShipping.regularShipping,
      },
      {
        placeHolder: "Express Shipping",
        description: "Delivery in 1-3 Business Days - $5",
        shippingDetails: "View Shipping Details",
        onClick: this.props.handleShippingFastTrue,
        checked: this.props.shippingFastStateProps,
      },
    ];

    const country = ["United States", "United Kingdom", "Canada"];

    const states = ["California", "Texas", "New York"];

    const citys = ["Los Angeles", "Houston", "New York"];

    return (
      <div>
        {this.props.shippingInfoDisabledProps ? (
          <PaymentInfo
            shoppingItemsProps={this.props.shoppingItemsProps}
            subTotalAmountItemsProps={this.props.subTotalAmountItemsProps}
            shippingAndHandleProps={this.props.shippingAndHandleProps}
            discountNumberProps={this.props.discountNumberProps}
            finalTotalProps={this.props.finalTotalProps}
            backToShippingInfoProps={this.props.backToShippingInfoProps}
            shippingInfoDataInputProps={this.props.shippingInfoDataInputProps}
            shippingFastProps={this.props.shippingFastStateProps}
          />
        ) : (
          <div className="mainShippingForm">
            <div className="shippingInfoContainer">
              <div className="shipping-box-container">
                <div className="loadingBar">
                  <ProgressBar percentage={50} />
                </div>
                <h3>Shipping Information</h3>
                <div className="shippingInfoContainerBox">
                  {address.map((item, index) => (
                    <div className="inputShippingInfoContainer" key={index}>
                      <span className="label">{item.placeHolder}</span>
                      <input
                        style={{ width: "50%", height: "25px" }}
                        name={item.name}
                        onChange={this.props.handleInputData}
                        onBlur={this.props.onBlurFunc}
                      />
                      {this.props.errorMState[item.name] && (
                        <span className="errorMSI">
                          {this.props.errorMState[item.name]}
                        </span>
                      )}
                    </div>
                  ))}
                  <div className="other-shipping-info">
                    <div className="zipCodeShipping">
                      <div>
                        <span>Zip Code: </span>
                        <input
                          style={{ width: "50px", height: "25px" }}
                          name="zipCode"
                          value={zipCodeValue}
                          onChange={this.props.handleInputData}
                          onBlur={this.props.onBlurFunc}
                        />
                      </div>
                      {this.props.errorMState["zipCode"] && (
                        <span className="errorMSI">
                          {this.props.errorMState["zipCode"]}
                        </span>
                      )}
                    </div>

                    {zipCode.map((item, index) => (
                      <div className="zipCodeOtherItems" key={index}>
                        <p>{item.placeHolder}: </p>
                        <select
                          name={item.name}
                          id=""
                          onChange={this.props.handleInputData}
                          defaultValue={item.value}
                        >
                          {item.name === "country" &&
                            country.map((val) => (
                              <option key={val} value={val}>
                                {val}
                              </option>
                            ))}
                          {item.name === "state" &&
                            states.map((val) => (
                              <option key={val} value={val}>
                                {val}
                              </option>
                            ))}
                          {item.name === "city" &&
                            citys.map((val) => (
                              <option value={val} key={val}>
                                {val}
                              </option>
                            ))}
                        </select>
                      </div>
                    ))}
                  </div>

                  {phone.map((item, index) => (
                    <div className="phone-number-shipping" key={index}>
                      <span className="label">{item.placeHolder}</span>
                      <input
                        type="number"
                        style={{ width: "150px", height: "25px" }}
                        name={item.name}
                        onChange={this.props.handleInputData}
                        onBlur={this.props.onBlurFunc}
                      />
                      {this.props.errorMState[item.name] && (
                        <span className="errorMSI">
                          {this.props.errorMState[item.name]}
                        </span>
                      )}
                    </div>
                  ))}
                  <hr />
                  <div className="shipping-method-container">
                    {radio.map((item, index) => (
                      <div className="radio-shipping" key={index}>
                        <input
                          type="radio"
                          name={item.name}
                          value=""
                          // onChange={this.props.handleInputData}
                          onClick={item.onClick}
                          checked={item.checked}
                        />
                        <p>{item.placeHolder}</p>
                        <p>{item.description}</p>
                        <p>{item.shippingDetails}</p>
                      </div>
                    ))}
                  </div>

                  <div>
                    <button
                      className="back-to-cart"
                      onClick={this.props.handleBackToCartProps}
                    >
                      Back To Cart
                    </button>
                  </div>
                </div>
              </div>
              <div className="summary">
                <h3>Summary</h3>

                {this.props.shoppingItemsProps.map((item, index) => {
                  if (item.quantity > 0) {
                    return (
                      <div className="itemsFromCart" key={index}>
                        <div className="individualItemL">
                          <img src={item.imageUrl} alt="" />
                        </div>
                        <div className="individualItemR">
                          <h5>{item.name}</h5>
                          <div className="description-items">
                            <p>Price: ${item.price}</p>
                            <p>Quantity: {item.quantity}</p>
                            <p>Total: ${item.totalPrice}</p>
                          </div>
                        </div>
                      </div>
                    );
                  } else {
                    return null;
                  }
                })}

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
                    className="checkout-next"
                    disabled={this.props.checkoutDisabledProps}
                    onClick={(e) => this.props.handleCheckoutShippingInfo(e)}
                  >
                    CHECKOUT
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default ShippingInfo;
