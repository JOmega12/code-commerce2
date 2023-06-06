import React from "react";


export function Item({
  item,
  selectedItems,
  handleQuantityChange,
  addToCartProps,
}) {
  const isAdded = selectedItems[item.id]?.isAdded || false;

  return (
    <div className="mini-container-items" key={item.id}>
      <div className="img-item-container">
        <img src={item.imageUrl} alt={item.title} />
      </div>
      <p>{item.title}</p>
      <p>${item.price}</p>
      <div className="quantity-items" style={{ display: "flex" }}>
        <p>Quantity:</p>
        <select
          name="quantity"
          id=""
          value={selectedItems[item.id]?.quantity || 0}
          onChange={(e) => handleQuantityChange(item, e.target.value)}
        >
          Quantity:
          {[...Array(11).keys()].map((_, index) => (
            <option value={index} key={index}>
              {index}
            </option>
          ))}
        </select>
      </div>
      <button
        onClick={(e) => addToCartProps(item, e)}
        className="addToCartButton"
      >
        Add To Cart
      </button>
      {isAdded && <div style={{ color: "red" }}>Added To Cart!</div>}
    </div>
  );
}

export default Item;
