import React from "react";
import Authenticate from "../Authenticate/Authenticate";
// import { INIT_TEST } from '../constants/constants';
// import { emailValidation, onlyTextValidation, passwordValidation, zipCodeValidation } from '../validations/validation';
import Checkout from "../Checkout/Checkout";
import Homepage from "../Homepage/Homepage";
import "./codeCommerce.css";
import { API_KEY } from "../constants/constants";

class CodeCommerce extends React.Component {
  constructor() {
    super();

    this.state = {
      //originally is false
      isLoggedIn: false,
      isHomepage: true,
      productInfo: [],
    };
  }

  async componentDidMount() {
    try {
      const url = new URL("https://api.chec.io/v1/products/");

      const params = {
        limit: "25",
      };
      Object.keys(params).forEach((key) =>
        url.searchParams.append(key, params[key])
      );

      const headers = {
        // "X-Authorization": API_KEY,
        "X-Authorization": "pk_51601b1845104d3e1bccacdbc702bad6d7ba0a6a61067",
        Accept: "application/json",
        "Content-Type": "application/json",
      };

      const response = await fetch(url, {
        method: "GET",
        headers: headers,
      });
      //   .then(response => response.json());
      //   console.log(response, 'response')
      if (response.ok) {
        const json = await response.json();
        const productInfo = json.data.map((item) => ({
          id: item.id,
          category: item.categories,
          title: item.name,
          price: item.price.formatted,
          imageUrl: item.image.url,
          availableQuant: item.inventory.available,
          description: item.description,
        }));
        this.setState({ productInfo });
      }
    } catch (error) {
      console.log("There is error", error);
    }
  }

  handleIsLoggedInStateT = () => {
    this.setState({ isLoggedIn: true });
  };

  handleIsLoggedInStateF = () => {
    this.setState({ isLoggedIn: false });
  };

  handleHomepageStateF = () => {
    this.setState({ isHomepage: false });
  };

  render() {
    const { productInfo, isLoggedIn, isHomepage } = this.state;
    return (
      <div>
        {isHomepage ? (
          <Homepage
            productInfo={productInfo}
            handleHomepageStateF={this.handleHomepageStateF}
          />
        ) : isLoggedIn ? (
          <Checkout productInfo={productInfo} homepageState={isHomepage} />
        ) : (
          <Authenticate
            isLoggedInStateT={this.handleIsLoggedInStateT}
            isLoggedInStateF={this.isLoggedInStateF}
          />
        )}
      </div>
    );
  }
}

export default CodeCommerce;
