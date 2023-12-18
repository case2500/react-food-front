import React from 'react'

const QuantityInput = ({ quantity, setQuantity }) => {
    return (
        <div>
            <div class="mx-20 w-32">Quantity:</div>

            <div class="flex  w-32 px-5">
                <div className=" px-2 py-2">
                    {' '}
                    <button
                        className=" px-5  bg-red-600"
                        onClick={() => {
                            if(quantity > 1){
                              setQuantity(Number(quantity) - 1)   
                            }
                           
                        }}
                        // disabled={quantity === 1}
                    >
                        -
                    </button>
                </div>
                <div className="mx-auto px-5 py-2"> {quantity}</div>
                <div className=" px-2 py-2">
                    {' '}
                    <button
                        className="px-5 bg-green-600"
                        onClick={() => {
                            if(quantity > 0){
                              setQuantity(Number(quantity) + 1)   
                            }
                           
                        }}
                        // disabled={quantity === 1}
                    >
                        +
                    </button>
                </div>
            </div>
        </div>
    )
}

export default QuantityInput
