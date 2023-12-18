import { Fragment, useRef, useState } from 'react'
import { imageUrl } from '../../Constants.js'
const FoodDialogContainer = ({ openFood, setOpenFood }) => {
    const [open, setOpen] = useState(true)
    const cancelButtonRef = useRef(null)
    function close() {
        setOpenFood()
    }

    return (
        <div>
            <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

                <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                            <div>
                                <div>
                                    <img
                                        src={`${imageUrl}/uploads/products/${openFood.image}`}
                                        className="h-32 w-64 cursor-pointer "
                                    />
                                </div>
                            </div>
                            <div> {openFood.name} </div>
                            <div>{openFood.price}</div>
                            <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                <button
                                    type="button"
                                    class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                >
                                    Deactivate
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
