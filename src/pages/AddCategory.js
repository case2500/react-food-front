import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Category from "./Category.js";
import CategoryForm from "./CategoryForm.js";
import {
  createCategory,
  getCategories,
} from "../store/category/categorySlice.js";

const initialState = {
  name: "",
  image: "",
};

const AddCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [category, setCategory] = useState(initialState);
  const [categoryImage, setCategoryImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
 
// list รายการ category redux
  const { categorys } = useSelector((state) => state.category);
  const { name, image } = category;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategory({ ...category, [name]: value });
  };

  const handleImageChange = (e) => {
    setCategoryImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const saveCategory = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", categoryImage);
    await dispatch(createCategory(formData));
    window.location.reload();
  };

  // useEffect(() => {
  //   dispatch(getCategories());
  // }, [dispatch]);

  return (
    <div className="flex flex-row mx-auto bg-slate-100">
  
      <div>
        <CategoryForm
          category={category}
          categoryImage={categoryImage}
          imagePreview={imagePreview}
          handleInputChange={handleInputChange}
          handleImageChange={handleImageChange}
          saveCategory={saveCategory}
        />
      </div>
      <div >
        <Category categorys={categorys} />
      </div>
    </div>
  );
};

export default AddCategory;
