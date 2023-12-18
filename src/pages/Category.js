import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import ReactPaginate from 'react-paginate'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCategory, getCategories } from '../store/category/categorySlice.js'
import { FILTER_CATEGORIES, selectFilteredCategories } from '../store/category/filterSlice.js'
import { FaTrash } from 'react-icons/fa'
import { ImPencil } from 'react-icons/im'
import Table from './Table.js'
import Search from './Search.js'

import { imageUrl } from '../Constants.js'
export default function Category() {
    const authtoken = JSON.parse(localStorage.getItem('token'))
    const [search, setSearch] = useState('')
    const dispatch = useDispatch()
    const categories = useSelector((state) => state.category.categorys)
    const filteredCategories = useSelector(selectFilteredCategories)
    // const filteredCategories =  useSelector((state) => state.filtercategory.filterCategories)

    const [currentItems, setCurrentItems] = useState([])
    const [pageCount, setPageCount] = useState(0)
    const [itemOffset, setItemOffset] = useState(0)
    const itemsPerPage = 5

    function currencyFormat(num) {
        return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    // const handlePageClick = (event) => {
    //     const newOffset = (event.selected * itemsPerPage) % categories.length
    //     setItemOffset(newOffset)
    // }

    const delCategory = async (id) => {
        // alert(id)
        await dispatch(deleteCategory(id))
        dispatch(getCategories())
        // Swal.fire("Deleted!", "Your file has been deleted.", "success");
    }
    function currencyFormat(num) {
        return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % categories.length
        setItemOffset(newOffset)
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
                delCategory(id)
            }
        })
    }

    useEffect(() => {
        // alert("refresh")

        dispatch(getCategories())
    }, [categories, search, dispatch])

    useEffect(() => {
        dispatch(FILTER_CATEGORIES({ categories, search }))
        // alert("case")
    }, [categories, search, dispatch])

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage
        setCurrentItems(filteredCategories.slice(itemOffset, endOffset))
        setPageCount(Math.ceil(filteredCategories.length / itemsPerPage))
    }, [itemOffset, itemsPerPage, filteredCategories])
    return (
        <div>
            {search}
            {/* <Search value={search} onChange={(e) => setSearch(e.target.value)} /> */}
            {/* {JSON.stringify(currentItems)} */}

            <div className=" ">
                <table className="px-1 py-2 text-sm text-left text-gray-500 bg-blue-200 w-1/8">
                    <thead className="text-xs text-gray-700 uppercase ">
                        <tr>
                            <th className="px-1 py-3 text-xl">No</th>
                            <th className="px-10 py-3 text-xl ">รูปภาพ</th>
                            <th className="px-20 py-3 max-w[50px] text-xl ">ชื่อ</th>
                            <th className="px-1 py-3 text-xl">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {currentItems &&
                            currentItems.map((p, index) => (
                                <tr className="px-2 bg-gray-100 border-b dark:bg-gray-800 dark:border-gray-700">
                                    <td className="w-10 px-1 ">{index + 1}</td>
                                    <td className="w-32 mx-auto text-xl ">
                                        <img src={`${imageUrl}/uploads/category/${p.image}`} 
                                            className='object-center h-16 w-32'
                                        />
                                    </td>
                                    <td className="w-64 mx-auto text-xl ">{p.name}</td>
                                    <td className="px-1 py-2 text-xl w-96">
                                        <Link to={'/update-category/' + p._id}>
                                            <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                                                {/* {p._id}    */}
                                                <ImPencil />
                                            </button>{' '}
                                        </Link>
                                        <button
                                            onClick={() => confirmDelete(p._id)}
                                            className="px-4 py-2 font-semibold text-red-700 bg-transparent border border-blue-500 rounded hover:bg-blue-500 hover:text-white hover:border-transparent"
                                        >
                                            <FaTrash />
                                            {/* {p._id} */}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>

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
            {/* {JSON.stringify(categories)} */}
            {/* {categories.map((cat) => (
                <>{cat.name}</>
            ))} */}
        </div>
    )
}
