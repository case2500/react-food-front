import { Fragment, useRef, useState } from 'react'
import { imageUrl } from '../../Constants.js'
import { useQuantity } from '../Hooks/useQuantity.js'
import QuantityInput from './QuantityInput.js'
import { useToppings } from '../Hooks/useToppings.js'
import { Toppings } from './Toppings.js'
import React, { useEffect } from 'react'

const FoodDialogContainer = ({ openFood, setOpenFood, orders, setOrders }) => {
    const [open, setOpen] = useState(true)
    const cancelButtonRef = useRef(null)

    const isEditing = openFood.index > -1
    const quantity = useQuantity(openFood && openFood.quantity)
    const toppings = useToppings(openFood.toppings)
   
    const order = {
        ...openFood,
        quantity: quantity.value,
        toppings: toppings.toppings
        // choice: choiceRadio.value
    }

    function addToOrder() {
        // alert(JSON.stringify(order))
         setOrders([...orders, order])   
         localStorage.setItem('cart', JSON.stringify([...orders, order]))
         close()
           }

//   useEffect(() => {
//     localStorage.setItem('cart', JSON.stringify(orders))
// }, [orders])


    function editOrder() {
        const newOrders = [...orders]
        newOrders[openFood.index] = order
        setOrders(newOrders)
        localStorage.setItem('cart', JSON.stringify([...newOrders]))
        close()
    }

    function close() {
  
        setOpenFood()
    }

    return (
        <div>
            {/* {JSON.stringify(openFood)} */}
            <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                <div class="fixed inset-0 z-10 w-screen overflow-y-auto 0 ">
                    <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center  sm:p-0 ">
                        <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                            <div class="flex flex-nowrap mx-auto justify-center bg-gray-100 shadow-xl">
                                {/* {JSON.stringify(orders)} */}

                                <div>
                                    <img
                                        src={`${imageUrl}/uploads/products/${openFood.image}`}
                                        className="h-48 w-full p-2  cursor-pointer "
                                    />
                                </div>
                            </div>
                            {/* order:{JSON.stringify(openFood.quantity)} */}
                            <div class="flex flex-nowrap mx-auto justify-center  ">
                                {openFood.name}-{openFood.price}{' '}
                            </div>
                            <div class="flex flex-nowrap mx-auto justify-center text-md text-gray-500">Qantity</div>
                            <div class="flex flex-nowrap mx-auto justify-center ">
                                <div>
                                    {' '}
                                    <QuantityInput quantity={quantity} />{' '}
                                </div>
                            </div>

                            {
                                <div class="bg-gray-100 ">
                                    {/* <h3> Would you like toppings? </h3> */}
                                    <Toppings {...toppings} />
                                </div>
                            }

                            <div class=" px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                <button
                                    type="button"
                                    onClick={isEditing ? editOrder : addToOrder}
                                    class="inline-flex w-full justify-center rounded-md bg-red-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                >
                                    Save
                                </button>
                                <button
                                    type="button"
                                    class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                    onClick={() => setOpenFood()}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function FoodDialog(props) {
    if (!props.openFood) return null
    return <FoodDialogContainer {...props} />
}
