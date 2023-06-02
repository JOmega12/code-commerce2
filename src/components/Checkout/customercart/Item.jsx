import React from "react";

//how can i put the groupBy function then iterate through the Item component to give me the end result?

//also fix the p tag in the homepage

//add the add to cart button but that would require to update the totalPrice from checkout, so now the bug is in the checkout component, customercart and the item component
//need to see the console logs to see where the problem is happening and to fix it

//the add to cart button problem was in the update totalprice, handle quantity change and add to cart function button 
export function Item({ item, selectedItems, handleQuantityChange, addToCartProps}) {

  return (
    // <div 
    //   className="mini-container-items"
    //   key={item.id}
    //   // onClick={}
    // >
    //   <div className="img-item-container">
    //     <img src={item.imageUrl} alt={item.title} />
    //   </div>
    //   <p>{item.title}</p>
    //   <p>${item.price}</p>
    //   <div className="quantity-items" style={{ display: "flex" }}>
    //     <p>Quantity:</p>
    //     <select
    //       name="quantity"
    //       id=""
    //       value={selectedItems[item.id] || 0}
    //       onChange={(e) => handleQuantityChange(item, e)}
    //     >
    //       Quantity:
    //       {[...Array(11).keys()].map((_, index) => (
    //         <option value={index}>{index}</option>
    //       ))}
    //     </select>
    //   </div>
    // </div>

    <div 
    className="mini-container-items"
    key={item.id}
    // onClick={}
    >
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
        onChange={(e) => handleQuantityChange(item, e.target.value)}
      >
        Quantity:
        {[...Array(11).keys()].map((_, index) => (
          <option value={index} key={index}>{index}</option>
        ))}
      </select>
    </div>
    <button onClick={(e)=> addToCartProps(item, e)}>
      Add To Cart
    </button>
  </div>
  );
}


export default Item;
