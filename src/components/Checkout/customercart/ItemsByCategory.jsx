import React from "react";
import Item from "./Item";

export function ItemsByCategory({category, key, shoppingItemsProps, selectedItemsProps, handleQuantityChange, addToCartProps, isAddedProps}) {
  return (
    <div className="itemsInContainer" key={key}>
      <h3>{category}</h3>
      <div className="shirts-items-container">
        {shoppingItemsProps
          .filter((item) => item.category === category)
          .map((item, index) => (
            <Item
              item={item}
              selectedItems={selectedItemsProps}
              handleQuantityChange={handleQuantityChange}
              addToCartProps={addToCartProps}
              key={index}
              isAddedProps = {isAddedProps}
            />
          ))}
      </div>
    </div>
  );
}

export default ItemsByCategory;