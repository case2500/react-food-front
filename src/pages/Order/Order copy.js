import React from 'react'

const Order = ({ orders, setOrders, setOpenFood }) => {
    const deleteItem = (index) => {
        const newOrders = [...orders]
        newOrders.splice(index, 1)
        setOrders(newOrders)
    }

    return (
        <>
            {orders.map((order, index) => (
                <div>
                    {/* ordrs:  {JSON.stringify(orders)} */}
                    <table className="w-96  table-fixed ">
                        <tr>
                            <td>#{index + 1}</td>
                            <td className="w-32">{order.name} </td>
                            <td className="w-16 tex-centert">{order.price}</td>
                            <td className="items-center">X</td>
                            <td>{order.quantity}</td>
                            <td className="w-16 tex-centert">{order.quantity * order.price}</td>
                            <td>
                                <div
                                    style={{ cursor: 'pointer' }}
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        deleteItem(index)
                                    }}
                                >
                                    🗑
                                </div>
                            </td>
                            <td
                                onClick={() => {
                                    setOpenFood({ ...order, index })
                                }}
                            >
                                edit
                            </td>
                        </tr>
                        <tr>
                        <td className='mx-auto  w-96'>

                            <div className="text-xs flex flex-row ">
                                {order.toppings
                                    .filter((t) => t.checked)
                                    .map((topping) => (
                                        <div className="flex flex-row">{topping.name + ','} </div>
                                    ))}
                            </div>
                        </td>
                        </tr>
                    </table>
                </div>
            ))}
        </>
    )
}

export default Order
