import './Category.css'
import Input from '../../components/Input.js'
import { deleteCategory, getCategories } from '../../../store/category/categorySlice.js'
import { FILTER_CATEGORIES, selectFilteredCategories } from '../../../store/category/filterSlice.js'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

function Category({ handleChange }) {
    const dispatch = useDispatch()
    const categories = useSelector((state) => state.category.categorys)
    useEffect(() => {
        // alert("refresh")

        dispatch(getCategories())
    }, [dispatch])

    return (
        <div>
            <h2 className="sidebar-title">Category</h2>
            <label className="sidebar-label-container">
                <input onChange={handleChange} type="radio" value="" name="check"  />
                <span className="checkmark"></span>All
            </label>
            {categories.map((cat) => (
                <>
                    {/* {cat._id} */}
                    <Input handleChange={handleChange} value={cat._id} title={cat.name} name="check" />
                </>
            ))}

            {/* <div>
                <label className="sidebar-label-container">
                    <input onChange={handleChange} type="radio" value="" name="test" />
                    <span className="checkmark"></span>All
                </label>
                <Input handleChange={handleChange} value="sneakers" title="Sneakers" name="test" />
                <Input handleChange={handleChange} value="flats" title="Flats" name="test" />
                <Input handleChange={handleChange} value="sandals" title="Sandals" name="test" />
                <Input handleChange={handleChange} value="heels" title="Heels" name="test" />
            </div> */}
        </div>
    )
}

export default Category
