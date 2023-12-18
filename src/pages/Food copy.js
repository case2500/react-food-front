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
import  Menu from "./Menu/Menu.js";

const Food = () => {
    const dispatch = useDispatch()
    const openFood = useOpenFood();
    //paginaate
    const [currentItems, setCurrentItems] = useState([])
    const [pageCount, setPageCount] = useState(0)
    const [itemOffset, setItemOffset] = useState(0)
    const itemsPerPage = 16
    const [search, setSearch] = useState('')

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



    return (
        <div class="container mx-auto px-2   h-screen overflow-y-hidden ">
            <Navbar />
            <FoodDialog {...openFood} />
            <div class="container mx-auto px-4 ">
                <div
                    class="flex mx-auto bg-white  "
                >
                    <div class="w-2/3  h-12 p-5 ">

                    <Menu {...openFood  } />

                   

                        <div className="py-5">
                            <main className="max-w-[1240px]  mx-auto min-h-[550px]  ">
                                <ReactPaginate
                                    nextLabel="next"
                                    onPageChange={handlePageClick}
                                    pageRangeDisplayed={3}
                                    marginPagesDisplayed={2}
                                    pageCount={pageCount}
                                    previousLabel="previous"
                                    pageClassName="page-item px-5 py-1 leading-tight  rounded-md bg-white border border-blue-600    "
                                    pageLinkClassName="page-link "
                                    previousClassName="page-item px-3 py-0   rounded-md bg-white border border-blue-600 "
                                    previousLinkClassName="page-link"
                                    nextClassName="page-item px-3 py-1  rounded-md bg-white border border-blue-600  "
                                    nextLinkClassName="page-link  "
                                    breakLabel="..."
                                    breakClassName="page-item"
                                    breakLinkClassName="page-link"
                                    containerClassName="pagination"
                                    activeClassName="active px-2 py-1 leading-tight text-white rounded-md  bg-blue-600"
                                    renderOnZeroPageCount={null}
                                    className="flex flex-row justify-center gap-2"
                                />
                            </main>
                        </div>
                    </div>
                    <div class="w-2/6 bg-gray-100 my-8  h-[750px] p-5"></div>
                </div>
            </div>
        </div>
    )
}

export default Food
