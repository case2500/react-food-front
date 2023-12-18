import React, { useEffect, useState ,useHistory,} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import CategoryForm from "./CategoryForm";

import {
  getCategory,
  selectCategory,
  getCategories,
  updateCategory,
} from "../store/category/categorySlice.js";
import { imageUrl } from '../Constants.js'

const UpdateCategory = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
//   const navigate = useNavigate();
const authtoken = JSON.parse(localStorage.getItem('token'))
  const history = useNavigate()

  const categoryEdit = useSelector(selectCategory);
  const [category, setCategory] = useState(categoryEdit);
  const [categoryImage, setCategoryImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    dispatch(getCategory(id));
  }, [dispatch, id]);

  useEffect(() => {
    setCategory(categoryEdit);
    setImagePreview(
      categoryEdit && categoryEdit.image
        ? `${imageUrl}/uploads/category/${categoryEdit.image}`
        : null
    );
  }, [categoryEdit]);
//   <img src={`${imageUrl}/uploads/category/${p.image}`} />
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
    formData.append("_id", category?._id);
    formData.append("name", category?.name);
    if (categoryImage) {
      formData.append("image", categoryImage);
    }
    // console.log(...formData);
    // alert("nav")
    await dispatch(updateCategory({authtoken, formData }))// await dispatch(getCategories());
    history('/category')



  };

  return (
    <div className="flex flex-row w-4/5 ">
      {/* {JSON.stringify(category)} */}
      <div className="w-4/5 ">
        <CategoryForm
          category={category}
          categoryImage={categoryImage}
          imagePreview={imagePreview}
          handleInputChange={handleInputChange}
          handleImageChange={handleImageChange}
          saveCategory={saveCategory}
        />
      </div>
    </div>
  );
};

export default UpdateCategory;
