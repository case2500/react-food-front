import React, { useEffect, useState } from 'react'
//import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import ReactPaginate from 'react-paginate'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProduct, getProducts } from '../store/product/productSlice.js'
import { FILTER_PRODUCTS, selectFilteredProducts } from '../store/product/filterSlice.js'
import Table from './Table.js'
import Search from './Search.js'
import axios from 'axios'
export default function Products() {
    const authtoken = JSON.parse(localStorage.getItem('token'))
    const [search, setSearch] = useState('')
    const dispatch = useDispatch()
    //get products
    const { products } = useSelector((state) => state.product)
    const filteredProducts = useSelector(selectFilteredProducts)
    //paginaate
    const [currentItems, setCurrentItems] = useState([])
    const [pageCount, setPageCount] = useState(0)
    const [itemOffset, setItemOffset] = useState(0)
    const itemsPerPage = 5

    const [refresh, setRefresh] = useState(false)

    function currencyFormat(num) {
        return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % products.length
        setItemOffset(newOffset)
    }

    const delProduct = async (authtoken, id) => {
        await dispatch(deleteProduct({ authtoken, id }))
        await dispatch(getProducts())
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success')
    }

    const confirmDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                delProduct(authtoken, id)
            }
        })
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
        <div>
            {search}
            <Search value={search} onChange={(e) => setSearch(e.target.value)} />
            {/* {JSON.stringify(products)} */}
            <Table currentItems={currentItems} confirmDelete={confirmDelete} currencyFormat={currencyFormat} />
            <main className="max-w-[1240px]  mx-auto max-h-[550px] mt-5">
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
    )
}
