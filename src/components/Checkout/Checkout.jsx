import React from "react";
import CustomerCart from "./customercart/CustomerCart";
// import PaymentInfo from './paymentInfo/PaymentInfo';
import ShippingInfo from "./shippingInfo/ShippingInfo";
import "./checkout.css";
import {
  // shoppingItems,
  discountVal,
  shippingInfoData,
  shippingInfoDataInput,
} from "../constants/constants";
import {
  addressValidation,
  onlyTextValidation,
  phoneNumberValidation,
  securityCodeValidation,
  zipCodeValidation,
} from "../validations/validation";

class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // shoppingItems: shoppingItems,
      // selectedItem: [],
      shoppingItems: props.productInfo.map((item) => ({
        id: item.id,
        category: item.category[0].name,
        imageUrl: item.imageUrl,
        title: item.title,
        price: item.price,
        description: item.description,
        quantityAvailable: item.availableQuant,
        quantity: 0,
        totalPrice: 0,
      })),
      shoppingEmpty: "",
      subTotal: 0,
      checkoutDisabled: false,
      shipPlusHandle: 0,
      discountValueInput: "",
      discount: 0,
      finalTotal: 0,
      //shippingInfoState
      shippingInfoDisabled: false,
      shippingInfoData: shippingInfoData,
      shippingInfoDataInput: shippingInfoDataInput,
      shippingFast: false,
      error: {},
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.productInfo !== this.props.productInfo) {
      this.setState({
        shoppingItems: this.props.productInfo.map((item) => ({
          id: item.id,
          category: item.category[0].name,
          imageUrl: item.imageUrl,
          title: item.title,
          price: item.price,
          description: item.description,
          quantityAvailable: item.availableQuant,
          quantity: 0,
          totalPrice: 0,
        })),
      });
    }
  }

  // onChange function for customerCart
  handleInputData = (e) => {
    this.setState((prevState) => ({
      shippingInfoDataInput: prevState.shippingInfoDataInput.map((item) => {
        if (item.hasOwnProperty(e.target.name)) {
          return { ...item, [e.target.name]: e.target.value };
        }
        return item;
      }),

      //why does this snippet break the code
      // shippingInfoDataInput: {
      //    ...prevState.shippingInfoDataInput,
      //    [e.target.name] : e.target.value,
      // },
      [e.target.name]: e.target.value,
    }));
    this.handleValidations(e.target.name, e.target.value);
  };

  // handleSelectItem = (item) => {
  //   const selectedItems = this.state.selectedItems.slice();
  //   const index = selectedItems.findIndex((i) => i.id === item.id);
  //   if (index === -1) {
  //     selectedItems.push(item);
  //   } else {
  //     selectedItems.splice(index, 1);
  //   }
  //   this.setState({ selectedItems });
  // };


  updateTotalPrice = (index, e) => {

    // let preDiscount = 0;
    const shoppingStuff = [...this.state.shoppingItems];
    console.log(shoppingStuff[index].price, 'shoppingStuffPrice');
    shoppingStuff[index].totalPrice = parseFloat(shoppingStuff[index].price) * parseFloat(e.target.value);
    shoppingStuff[index].quantity = parseInt(e.target.value);

    console.log(shoppingStuff[index].quantity, 'i');

    let preTotal = shoppingStuff.reduce(
      (acc, item) => acc + parseFloat(item.totalPrice),
      0
    );

    this.setState({
      shoppingItems: shoppingStuff,
      subTotal: preTotal,
      discount: 0,
      finalTotal: preTotal,
    });
  };

  handleDiscountButton = () => {
    let subTotal = this.state.subTotal;
    // let sH = this.state.shipPlusHandle;
    let discountValWord = this.state.discountValueInput;
    let discount = 0;
    // let semiTotal = subTotal + sH;
    let totalTotal = 0;

    const discountValue = discountVal.find((item) => {
      return item.word === discountValWord;
    });

    if (discountValue) {
      totalTotal += subTotal - subTotal * discountValue.number;
      discount += subTotal * discountValue.number;

      this.setState({
        finalTotal: totalTotal,
        discount: discount,
      });
    } else {
      this.setState({
        finalTotal: totalTotal,
        discount: discount,
      });
    }
  };

  handleCheckout = () => {
    if (this.state.finalTotal > 0) {
      this.setState({ checkoutDisabled: true });
    }
  };

  //shippingInfo container code
  addShippingInfoToState = (obj) => {
    const newArr = [...this.state.shippingInfoDataInput];
    newArr.push(obj);
    this.setState((prevState) => ({
      ...prevState,
      shippingInfoData: newArr,
    }));
  };

  //this breaks the code
  // handleShippingFast = (val, bool) => {
  //    let currentSHTotal = val;
  //    let subtractFromTotal = val === 0
  //       ? this.state.finalTotal - 5
  //       : this.state.finalTotal + currentSHTotal
  //    this.setState({
  //       shippingFast: bool,
  //       shipPlusHandle: currentSHTotal,
  //       finalTotal: subtractFromTotal,
  //    })
  // }

  handleShippingFastFalse = () => {
    let currentSHTotal = 0;
    let subtractFromTotal = this.state.finalTotal - 5;

    this.setState({
      shippingFast: false,
      shipPlusHandle: currentSHTotal,
      finalTotal: subtractFromTotal,
    });
  };

  handleShippingFastTrue = () => {
    let currentSHTotal = 5;
    let addToTotalAmount = this.state.finalTotal + currentSHTotal;
    console.log(addToTotalAmount);

    this.setState({
      shippingFast: true,
      shipPlusHandle: currentSHTotal,
      finalTotal: addToTotalAmount,
    });
  };

  handleBackToCart = () => {
    this.setState({ checkoutDisabled: false });
  };

  handleValidations = (name, value) => {
    let errorText;

    switch (name) {
      case "addressTitle":
        if (!value) {
          errorText = "Address Title required";
        } else {
          errorText = onlyTextValidation(value);
        }
        //find addressTitle type
        //set the state of error message
        break;
      case "name":
        if (!value) {
          errorText = "Name required";
        } else {
          errorText = onlyTextValidation(value);
        }
        break;
      case "address":
        // errorText= onlyTextValidation(value);
        if (!value) {
          errorText = "Address required";
        } else {
          errorText = addressValidation(value);
        }
        break;
      case "zipCode":
        if (!value) {
          errorText = "Zipcode required";
        } else {
          errorText = zipCodeValidation(value);
        }
        break;
      case "phoneNumber":
        if (!value) {
          errorText = "Phone Number required";
        } else {
          errorText = phoneNumberValidation(value);
        }
        break;
      case "telephone":
        if (!value) {
          errorText = "Telephone number required";
        } else {
          errorText = phoneNumberValidation(value);
        }
        break;
      case "cardHolderName":
        errorText = phoneNumberValidation(value);
        break;
      case "cardNumber":
        errorText = phoneNumberValidation(value);
        break;
      case "cvv":
        errorText = securityCodeValidation(value);
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

  //validate the inputs in credit card
  checkErrorBeforeCreditCard = () => {
    let errorValue = {};

    let isError = false;

    this.state.shippingInfoDataInput.forEach((item) => {
      if (!item.name) {
        errorValue = {
          ...errorValue,
          name: "Name is required",
        };
        isError = true;
      }
      if (!item.address) {
        errorValue = {
          ...errorValue,
          address: "Address required",
        };
        isError = true;
      }
      if (!item.addressTitle) {
        errorValue = {
          ...errorValue,
          addressTitle: "Address Title required",
        };
        isError = true;
      }
      if (!item.zipCode) {
        errorValue = {
          ...errorValue,
          zipCode: "ZipCode required",
        };
        isError = true;
      }
      if (!item.phoneNumber) {
        errorValue = {
          ...errorValue,
          phoneNumber: "Phone Number required",
        };
        isError = true;
      }
      if (!item.telephone) {
        errorValue = {
          ...errorValue,
          telephone: "Telephone required",
        };
        isError = true;
      }
    });

    this.setState({
      error: errorValue,
    });
    return isError;
  };

  //next button for credit card
  handleCheckoutShippingInfo = (e) => {
    e.preventDefault();

    const errorMessage = this.checkErrorBeforeCreditCard();

    if (!errorMessage) {
      this.setState((prevState) => ({
        shippingInfoData: {
          ...prevState.shippingInfoDataInput,
        },
        // shippingInfoDataInput: shippingInfoDataInput
        shippingInfoDisabled: true,
      }));
    }
  };

  backToShippingInfoButton = () => {
    this.setState({ shippingInfoDisabled: false });
  };

  render() {
    console.log(this.state.shoppingItems, 'shippingItemsCheckout')

    return (
      <div>
        {this.state.checkoutDisabled ? (
          <ShippingInfo
            //state data for component
            homepageState = {this.props.homepageState}
            shippingInfoDisabledProps={this.state.shippingInfoDisabled}
            backToShippingInfoProps={this.backToShippingInfoButton}
            shippingInfoDataProps={this.state.shippingInfoData}
            shippingInfoDataInputProps={this.state.shippingInfoDataInput}
            shippingFastStateProps={this.state.shippingFast}
            errorMState={this.state.error}
            //functions for component
            handleInputData={this.handleInputData}
            // handleInputDataShippingInfo = {this.handleInputDataShippingInfo}
            handleShippingFastFalse={this.handleShippingFastFalse}
            handleShippingFastTrue={this.handleShippingFastTrue}
            // handleShippingFast = {this.handleShippingFast}

            handleBackToCartProps={this.handleBackToCart}
            onBlurFunc={this.handleBlur}
            handleCheckoutShippingInfo={this.handleCheckoutShippingInfo}
            //summary functions and numbers for component
            shoppingItemsProps={this.state.shoppingItems}
            subTotalAmountItemsProps={this.state.subTotal}
            shippingAndHandleProps={this.state.shipPlusHandle}
            discountNumberProps={this.state.discount}
            finalTotalProps={this.state.finalTotal}
          />
        ) : (
          <CustomerCart
            homepageState = {this.props.homepageState}
            shoppingItemsProps={this.state.shoppingItems}
            subTotalAmountItemsProps={this.state.subTotal}
            checkoutDisabledProps={this.state.checkoutDisabled}
            shippingAndHandleProps={this.state.shipPlusHandle}
            // discountValueProps = {this.state.discountValueInput}
            discountNumberProps={this.state.discount}
            finalTotalProps={this.state.finalTotal}
            handleInputData={this.handleInputData}
            updateTotalPriceProps={this.updateTotalPrice}
            discountButtonProps={this.handleDiscountButton}
            handleCheckoutProp={this.handleCheckout}
          />
        )}
      </div>
    );
  }
}

export default Checkout;
