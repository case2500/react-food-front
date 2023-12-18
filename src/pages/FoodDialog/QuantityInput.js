import React from 'react'

const QuantityInput = ({ quantity, setQuantity }) => {
    return (
        <div>
        
            <div className="flex flex-row mx-2 w-32">
            
                <button 
                    className="px-3 w-16 py-1 bg-red-200"
                    onClick={() => {
                        quantity.setValue(quantity.value - 1)
                    }}
                    disabled={quantity.value === 1}
                >
                    -
                </button>
                <div className="px-3 w-8 py-1">{quantity.value}</div>
                <button
                 className="px-3 w-16 py-1 bg-green-200"
                    onClick={() => {
                        quantity.setValue(quantity.value + 1)
                    }}
                >
                    +
                </button>
            </div>
        </div>
    )
}

export default QuantityInput
