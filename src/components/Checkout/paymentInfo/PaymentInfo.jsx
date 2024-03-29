import React from "react";
import {
  CARDICON,
  cardInformation,
  expressShipping,
  OTHERCARDS,
} from "../../constants/constants";
import ProgressBar from "../../ProgressBar/ProgressBar";
import {
  cardNumberValidation,
  onlyTextValidation,
  securityCodeValidation,
} from "../../validations/validation";

import "../paymentInfo/paymentInfo.css";
import Confirmation from "../confirmation/Confirmation";

class PaymentInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardData: cardInformation,
      maxLength: OTHERCARDS.length,
      cardType: null,
      error: {},
      isFinalCheckout: false,
    };
  }

  findDebitCardType = (cardNumber) => {
    const regexPattern = {
      MASTERCARD: /^(?:5[1-5][0-9]{14})$/,
      VISA: /^4[0-9]{2,}$/,
      AMERICAN_EXPRESS: /^3[47][0-9]{5,}$/,
      DISCOVER: /^6(?:011|5[0-9]{2})[0-9]{3,}$/,
    };

    for (const card in regexPattern) {
      if (cardNumber.replace(/[^\d]/g, "").match(regexPattern[card]))
        return card;
    }
  };

  handleInputData = (e) => {
    if (e.target.name === "cardNumber") {
      let mask = e.target.value.split(" ").join("");
      if (mask.length) {
        mask = mask.match(new RegExp(".{1,4}", "g")).join(" ");
        this.setState((prevState) => ({
          cardData: {
            ...prevState.cardData,
            [e.target.name]: mask,
          },
        }));
      } else {
        this.setState((prevState) => ({
          cardData: {
            ...prevState.cardData,
            [e.target.name]: "",
          },
        }));
      }
    } else {
      this.setState((prevState) => ({
        cardData: {
          ...prevState.cardData,
          [e.target.name]: e.target.value,
        },
      }));
    }
    this.handleValidations(e.target.name, e.target.value);
  };

  handleValidations = (name, value) => {
    let errorText;

    switch (name) {
      case "cardHolderName":
        if (!value) {
          errorText = "Name is Required";
        } else {
          errorText = onlyTextValidation(value);
          this.setState((prevState) => ({
            error: { ...prevState.error, cardHolderName: errorText },
          }));
        }
        break;
      case "cardNumber":
        if (!value) {
          errorText = "Card Number is Required";
        } else {
          errorText = cardNumberValidation(value);
          this.setState((prevState) => ({
            cardType: this.findDebitCardType(value),
            error: {
              ...prevState.error,
              cardNumber: errorText,
            },
          }));
        }
        break;
      case "cvv":
        if (!value) {
          errorText = "CVV is Required";
        } else {
          errorText = securityCodeValidation(3, value);
          this.setState((prevState) => ({
            error: { ...prevState.error, cvv: errorText },
          }));
        }
        break;
      default:
        errorText = undefined;
        break;
    }

    this.setState((prevState) => ({
      error: {
        ...prevState.error,
        [name]: errorText,
      },
    }));
  };

  handleBlur = (e) => {
    this.handleValidations(e.target.name, e.target.value);
  };

  checkErrorBeforeFinal = () => {
    let errorValue = {};
    let isError = false;

    Object.keys(this.state.cardData).forEach((val) => {
      if (!this.state.cardData[val].length) {
        if (val === "cardHolderName") {
          errorValue = {
            ...errorValue,
            [`${val}`]: "Name is Required",
          };
          isError = true;
        } else if (val === "cardNumber") {
          errorValue = {
            ...errorValue,
            [`${val}`]: "Card is Required",
          };
          isError = true;
        } else if (val === "cvv") {
          errorValue = {
            ...errorValue,
            [`${val}`]: "CVV is Required",
          };
          isError = true;
        } else {
          errorValue = {
            ...errorValue,
            [`${val}`]: "Required",
          };
          isError = true;
        }
      }
    });

    this.setState({
      error: errorValue,
    });
    return isError;
  };

  finalCheckout = (e) => {
    e.preventDefault();

    const errorMessage = this.checkErrorBeforeFinal();

    if (!errorMessage) {
      this.setState({
        cardData: cardInformation,
        isFinalCheckout: true,
      });
    }
  };

  render() {
    const cardInput = [
      { label: "Cardholder Name", type: "text", name: "cardHolderName" },
      { label: "Card Number", type: "text", name: "cardNumber" },
    ];

    const expInput = [
      { label: "Month", name: "monthExp" },
      { label: "Year", name: "yearExp" },
    ];

    const monthDropdown = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "July",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ];

    const yearDropdown = [2023, 2024, 2025];

    const cardImage = this.state.cardType
      ? CARDICON[this.state.cardType]
      : null;

    return (
      <div>
        {this.state.isFinalCheckout ? (
          <Confirmation
            shoppingItemsProps={this.props.shoppingItemsProps}
            subTotalAmountItemsProps={this.props.subTotalAmountItemsProps}
            shippingAndHandleProps={this.props.shippingAndHandleProps}
            discountNumberProps={this.props.discountNumberProps}
            finalTotalProps={this.props.finalTotalProps}
            backToShippingInfoProps={this.backToShippingInfoButton}
            shippingInfoDataInputProps={this.props.shippingInfoDataInputProps}
            shippingFastProps={this.props.shippingFastProps}
            cardDataInfoProps={this.state.cardData}
            cardTypeProps={this.state.cardType}
          />
        ) : (
          <div className="mainPaymentForm">
            <div className="paymentInfoContainer">
              <div className="payment-box-container">
                <div className="loadingBar">
                  <ProgressBar percentage={75} />
                </div>
                <h3>Payment Information</h3>
                <div className="paymentInfoContainerBox">
                  {cardInput.map((item) => (
                    <div className="inputPaymentInfoContainer">
                      <div className="labelContainerPI">
                        <span class="labelPayment">{item.label}</span>
                        <input
                          style={{ width: "70%", height: "25px" }}
                          type={item.type}
                          name={item.name}
                          value={
                            this.state.cardData &&
                            this.state.cardData[item.name]
                          }
                          onChange={this.handleInputData}
                          maxLength={this.state.maxLength}
                        />
                        {item.name === "cardNumber" && cardImage && (
                          <img
                            style={{
                              border: "black, 2px solid",
                              width: "35px",
                              height: "25px",
                            }}
                            src={cardImage}
                            alt="card icon"
                          />
                        )}
                      </div>
                      {this.state.error[item.name] && (
                        <span className="errorMSI-PI">
                          {this.state.error[item.name]}
                        </span>
                      )}
                    </div>
                  ))}

                  <div className="other-payment-info">
                    <span>Exp. Date</span>
                    <div className="expDateItemsContainer">
                      {expInput.map((item) => (
                        <div className="expDateItems">
                          <select
                            name={item.name}
                            id=""
                            defaultValue={item.value}
                            onChange={this.handleInputData}
                          >
                            {item.name === "monthExp" &&
                              monthDropdown.map((val) => (
                                <option key={val} value={val}>
                                  {val}
                                </option>
                              ))}
                            {item.name === "yearExp" &&
                              yearDropdown.map((val) => (
                                <option key={val} value={val}>
                                  {val}
                                </option>
                              ))}
                          </select>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="inputPaymentInfoContainer">
                    <div className="labelContainerPI">
                      <span class="labelPayment cvvInput">CVV</span>
                      <input
                        style={{ width: "20%", height: "25px" }}
                        type="text"
                        name="cvv"
                        autoComplete="off"
                        value={
                          this.state.cardData && this.state.cardData["cvv"]
                        }
                        onChange={this.handleInputData}
                      />
                    </div>
                    {this.state.error["cvv"] && (
                      <span className="errorMSI-PI">
                        {this.state.error["cvv"]}
                      </span>
                    )}
                  </div>

                  <button
                    className="checkout-next2"
                    onClick={(e) => this.finalCheckout(e)}
                  >
                    PAY ${this.props.finalTotalProps}
                  </button>
                </div>

                <div>
                  <button
                    className="backToContainerShip"
                    onClick={this.props.backToShippingInfoProps}
                  >
                    Back To Address
                  </button>
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
                <hr />
                <div className="shipmentAddress">
                  <h3>Shipment Address</h3>
                  <p>{this.props.shippingInfoDataInputProps[0].addressTitle}</p>
                  <p>{this.props.shippingInfoDataInputProps[0].name}</p>
                  <p>{this.props.shippingInfoDataInputProps[0].address}</p>
                </div>
                <hr />
                <div className="shipmentMethod">
                  <h3>Shipment Method</h3>
                  {this.props.shippingFastProps ? (
                    <div className="expressShipping-PI">
                      <h4>{expressShipping[1].placeHolder}</h4>
                      <p>{expressShipping[1].description}</p>
                    </div>
                  ) : (
                    <div className="expressShipping-PI">
                      <h4>{expressShipping[0].placeHolder}</h4>
                      <p>{expressShipping[0].description}</p>
                    </div>
                  )}
                </div>
                <div>
                  <button
                    className="checkout-next"
                    onClick={(e) => this.finalCheckout(e)}
                  >
                    PAY ${this.props.finalTotalProps}
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

export default PaymentInfo;
