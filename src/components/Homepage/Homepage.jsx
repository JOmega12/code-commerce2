import React from "react";
import "./homepage.css";

class Homepage extends React.Component {
  constructor() {
    super();
    this.state = {
      itemsData: [],
    };
  }

  handleProductsContainerClick = () => {
    this.props.handleHomepageStateF();
  };

  render() {
    const { productInfo } = this.props;
    return (
      <React.Fragment>
        <nav className="topPageContainer">
          <div className="topPage">
            <div className="fitness-labelContainer">
              <h3 className="fitnessLabel">Fitness Inc</h3>
            </div>
            <div className="other-labels">
              <div>Home</div>
              <div onClick={this.handleProductsContainerClick}>
                SignIn/SignUp
              </div>
              <div onClick={this.handleProductsContainerClick}>Cart</div>
            </div>
          </div>
        </nav>
        <div className="container-wrapper">
          <div className="productsContainer">
            <div
              className="shirtsContainer"
              onClick={this.handleProductsContainerClick}
            >
              {/* How to not show the description? p tag? */}
              <h3>Shirts</h3>
              <div className="itemsContainer">
                {productInfo.map((item) => (
                  <div key={item.id}>
                    {item.category.find((cat) => cat.name === "Shirts") && (
                      <div className="item-map-container">
                        <div className="img-container">
                          <img src={item.imageUrl} alt={item.title} />
                        </div>
                        <p>{item.title}</p>
                        <p>
                          {item.price}
                          <i className="fa-solid fa-cart-shopping"></i>
                        </p>
                        <p>{item.availableQuant} items</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div
              className="shortsContainer"
              onClick={this.handleProductsContainerClick}
            >
              <h3>Shorts</h3>
              <div className="itemsContainer">
                {productInfo.map((item) => (
                  <div key={item.id}>
                    {item.category.find((cat) => cat.name === "Shorts") && (
                      <div className="item-map-container">
                        <div className="img-container">
                          <img src={item.imageUrl} alt={item.title} />
                        </div>
                        <p>{item.title}</p>
                        <p>
                          {item.price}
                          <i className="fa-solid fa-cart-shopping"></i>
                        </p>
                        <p>{item.availableQuant} items</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div
              className="shoesContainer"
              onClick={this.handleProductsContainerClick}
            >
              <h3>Shoes</h3>
              <div className="itemsContainer">
                {productInfo.map((item) => (
                  <div key={item.id}>
                    {item.category.find((cat) => cat.name === "Shoes") && (
                      <div className="item-map-container">
                        <div className="img-container">
                          <img src={item.imageUrl} alt={item.title} />
                        </div>
                        <p>{item.title}</p>
                        <p>
                          {item.price}
                          <i className="fa-solid fa-cart-shopping"></i>
                        </p>
                        <p>{item.availableQuant} items</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div
              className="gymContainer"
              onClick={this.handleProductsContainerClick}
            >
              <h3>Gym</h3>
              <div className="itemsContainer">
                {productInfo.map((item) => (
                  <div key={item.id}>
                    {item.category.find((cat) => cat.name === "Shorts") && (
                      <div className="item-map-container">
                        <div className="img-container">
                          <img src={item.imageUrl} alt={item.title} />
                        </div>
                        <p>{item.title}</p>
                        <p>
                          {item.price}
                          <i className="fa-solid fa-cart-shopping"></i>
                        </p>
                        <p>{item.availableQuant} items</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div
              className="supplementsContainer"
              onClick={this.handleProductsContainerClick}
            >
              <h3>Supplements</h3>
              <div className="itemsContainer">
                {productInfo.map((item) => (
                  <div key={item.id}>
                    {item.category.find(
                      (cat) => cat.name === "Supplements"
                    ) && (
                      <div className="item-map-container">
                        <div className="img-container">
                          <img src={item.imageUrl} alt={item.title} />
                        </div>
                        <p>{item.title}</p>
                        <p>
                          {item.price}
                          <i className="fa-solid fa-cart-shopping"></i>
                        </p>
                        <p>{item.availableQuant} items</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Homepage;
