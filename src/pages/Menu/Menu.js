import React, { useEffect, useState } from 'react'
import { deleteProduct, getProducts } from '../../store/product/productSlice.js'
import { useDispatch, useSelector } from 'react-redux'
import ReactPaginate from 'react-paginate'
import { FILTER_PRODUCTS, selectFilteredProducts } from '../../store/product/filterSlice.js'
import { imageUrl } from '../../Constants.js'

const Menu = ({ setOpenFood, selectedCategory }) => {
    const dispatch = useDispatch()
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

    const tempProducts = currentItems.filter((product) => product.category.toLowerCase().includes(selectedCategory))

    let tmp = tempProducts.push(
    { _id: '', name: '', image: '657572d03710c6436b8cbaf5.webp' },
    { _id: '', name: '', image: '657572d03710c6436b8cbaf5.webp' },
    { _id: '', name: '', image: '657572d03710c6436b8cbaf5.webp' },
    { _id: '', name: '', image: '657572d03710c6436b8cbaf5.webp' },
    { _id: '', name: '', image: '657572d03710c6436b8cbaf5.webp' },
    { _id: '', name: '', image: '657572d03710c6436b8cbaf5.webp' },
    { _id: '', name: '', image: '657572d03710c6436b8cbaf5.webp' },
    { _id: '', name: '', image: '657572d03710c6436b8cbaf5.webp' },
    { _id: '', name: '', image: '657572d03710c6436b8cbaf5.webp' },
    { _id: '', name: '', image: '657572d03710c6436b8cbaf5.webp' },
    { _id: '', name: '', image: '657572d03710c6436b8cbaf5.webp' },
    )

    const tempProductslength = tempProducts.length
    let Productslength = 0
    if (tempProductslength < 12) {
        Productslength = 12 - Number(tempProductslength)
    }
    return (
        <div>
            {/* {Productslength} */}
            {/* tmp: {JSON.stringify(tmp)} */}
            <div class="grid grid-cols-4 gap-x-2  p-5 h-[750px]  rounded-xl shadow-md overflow-y-hidden">
                {tempProducts.map((food, index) => (
                    <div key={index}>
                        <div>
                            <img
                                src={
                                    food._id
                                        ? `${imageUrl}/uploads/products/${food.image}`
                                        : `${imageUrl}/uploads/products/download.png`
                                }
                                className="h-32 w-64 cursor-pointer "
                                onClick={() => setOpenFood(food._id ? food : null)}
                            />
                        </div>
                        <div className="text-center my-2 py-2 bg-gray-100">
                            {food.name} - {food.price}
                        </div>
                    </div>
                ))}
            </div>
            <div className="py-5 ">
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
    )
}

export default Menu
