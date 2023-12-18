import React, { useEffect, useState } from 'react'
import Navbar from './Navbar/Navbar.js'
import { deleteProduct, getProducts } from '../store/product/productSlice.js'
import { useDispatch, useSelector } from 'react-redux'
import ReactPaginate from 'react-paginate'
import { imageUrl } from '../Constants.js'
import { FILTER_PRODUCTS, selectFilteredProducts } from '../store/product/filterSlice.js'
import Search from './Search.js'
import Table from './Table.js'
import FoodDialog from './FoodDialog/FoodDialog.js'
import { useOpenFood } from './Hooks/useOpenFood'
import Menu from './Menu/Menu.js'
import { useOrders } from './Hooks/useOrders.js'
import { Order } from "./Order/Order.js";

const Food = () => {
    const dispatch = useDispatch()
    const openFood = useOpenFood()
    //paginaate
    const [currentItems, setCurrentItems] = useState([])
    const [pageCount, setPageCount] = useState(0)
    const [itemOffset, setItemOffset] = useState(0)
    const itemsPerPage = 16
    const [search, setSearch] = useState('')
    const orders = useOrders()
    //get products
    const { products } = useSelector((state) => state.product)
    const filteredProducts = useSelector(selectFilteredProducts)

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % products.length
        setItemOffset(newOffset)
    }

    const getPro = () => {
        dispatch(getProducts())
        // window.location.reload(false);
    }

    useEffect(() => {
        getPro()
    }, [])

    useEffect(() => {
        dispatch(FILTER_PRODUCTS({ products, search }))
    }, [products, search, dispatch])

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage
        setCurrentItems(filteredProducts.slice(itemOffset, endOffset))
        setPageCount(Math.ceil(filteredProducts.length / itemsPerPage))
    }, [itemOffset, itemsPerPage, filteredProducts])

    const subtotal = orders.orders.reduce((total, order) => {
        return total + order.price * order.quantity
    }, 0)
    const deleteItem = index => {
        const newOrders = [...orders];
        newOrders.splice(index, 1);
        setOrders(newOrders);
      };
    
    return (
        <div class="container mx-auto px-2   h-screen overflow-y-hidden ">
            <Navbar />

            <div class=" mx-auto px-4 ">
                <div class="flex mx-auto bg-white  ">
                    <div class="w-2/3  h-12 p-5 ">
                        {/* {JSON.stringify(orders)} */}
                        <FoodDialog {...openFood} {...orders} />
                        <Menu {...openFood} />
                    </div>

                    <div class="w-2/6 bg-gray-50 my-8  h-[750px] p-5">
                        <>
                            <div className="bg-green-600 text-white text-right py-5 px-5 text-4xl"> {subtotal}</div>
                        </>


                        <Order {...orders} {...openFood} />



                        {orders.orders.map((order, index) => (
                            <>
                                <table className="w-96 table-auto">
                                    <tr>
                                        <td>#{index + 1}</td>
                                        <td className="w-32">{order.name} </td>
                                        <td className="w-16 tex-centert">{order.price}</td>
                                        <td className="items-center">X</td>
                                        <td>{order.quantity}</td>
                                        <td className="w-16 tex-centert">{order.quantity * order.price}</td>
                                   <td>        <div>{order.quantity}</div>
                <div>{order.name}</div>
                <div
                  style={{ cursor: "pointer" }}
                  onClick={e => {
                    e.stopPropagation();
                    deleteItem(index);
                  }}
                >
                  🗑
                </div></td>
                                   
                                    </tr>
                                </table>
                            </>
                        ))}
                    </div>
                    {subtotal}
                </div>
            </div>
        </div>
    )
}

export default Food
