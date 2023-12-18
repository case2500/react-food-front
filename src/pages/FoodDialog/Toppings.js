
import React from "react";



export function Toppings({ toppings, checkTopping }) {
  return (
    <div className="grid grid-cols-2 px-5 my-2">
    
      {toppings.map((topping, i) => (
        <div className="flex">
          <input
            type="checkbox"
            checked={topping.checked}
            onClick={() => {
              checkTopping(i);
            }}
          />
          {topping.name}
        </div>
      ))}
    </div>
  );
}
