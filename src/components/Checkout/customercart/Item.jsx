import React from "react";

//how can i put the groupBy function then iterate through the Item component to give me the end result?

//also fix the p tag in the homepage
export function Item({ item, selectedItems, handleQuantityChange }) {

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
          value={selectedItems[item.id] || 0}
          onChange={(e) => handleQuantityChange(item, e)}
        >
          Quantity:
          {[...Array(11).keys()].map((_, index) => (
            <option value={index}>{index}</option>
          ))}
        </select>
      </div>
    </div>
  );
}


export default Item;
