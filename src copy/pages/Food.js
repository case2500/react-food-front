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
import Order from './Order/Order.js'
import Sidebar from './Sidebar/Sidebar.js'
import { saveOrder } from '../store/order/orderSlice.js'

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
    const [selectedCategory, setSelectedCategory] = useState(null)

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % products.length
        setItemOffset(newOffset)
    }

    const getPro = () => {
        dispatch(getProducts())
       
        // window.location.reload(false);
    }
    // ----------- Radio Filtering -----------
    const handleChange = (event) => {
        // alert('handleChange event=>' + event.target.value)
        setSelectedCategory(event.target.value)
    }
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(orders))
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

    const addOrderdatabase = async (formData) => {
        // alert("items="+JSON.stringify(items))
        dispatch(saveOrder({ formData }))
           
    }

    const newOrder = orders.orders
    // const items = JSON.parse(localStorage.getItem('cart'))

    return (
        <div class="container mx-auto px-2   h-screen overflow-y-hidden ">
            {/* <Navbar /> */}
            <div class=" mx-auto px-4 ">
                <div class="flex mx-auto bg-white  ">
                    <div>
                        <Sidebar handleChange={handleChange} />
                    </div>
                    <div class="w-2/3  h-12 p-5 ">
                                         <FoodDialog {...openFood} {...orders} />
                        <Menu {...openFood} selectedCategory={selectedCategory} />
                    </div>
                    <div class="w-2/6 bg-gray-50 my-8  h-[750px] ">
                        <div className="bg-gray-600 text-white text-right py-2 px-5 text-4xl"> {subtotal}</div>
                        <div className="text-center py-1">
                            <button
                                className="bg-blue-600 text-white text-center py-1 px-16 text-xl"
                                onClick={() => addOrderdatabase({ newOrder, subtotal })}
                            >
                                บันทึก
                            </button>
                            <button className="bg-red-600 px-16 text-white text-center py-1  text-xl">ยกเลิก</button>{' '}
                        </div>
                        <Order {...orders} {...openFood} />
                    </div>
                    {subtotal}
                </div>
            </div>
        </div>
    )
}

export default Food
