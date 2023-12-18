import React from "react";
import { FaTrash } from "react-icons/fa";
import { ImPencil } from "react-icons/im";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import {
  deleteCategory,
  getCategories,
} from "../store/category/categorySlice.js";
import { useDispatch, useSelector } from "react-redux";

const Category = ({ categorys }) => {
  const dispatch = useDispatch();

  // ลบรายการcategoryสินค้า
  const delCategory = async (id) => {
    // await dispatch(deleteCategory(id));
    // await dispatch(getCategories());
  };
  const confirmDelete = (id) => {
    Swal.fire({
      title: "คุณต้องการลบ?",
      // text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ต้องการลบ!" + id,
    }).then((result) => {
      if (result.isConfirmed) {
        delCategory(id);
        Swal.fire("ลบรายการ!", "ลบรายการสำเร็จ" + id);
      }
    });
  };

  return (
   
      <div className="px-1 py-2 bg-blue-200">
        <table className="text-sm text-left text-gray-500 w-1/8 px-96">
          <thead className="text-xs text-gray-700 uppercase bg-blue-200 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-1 py-3 text-xl">No</th>
              <th className="px-10 py-3 text-xl ">รูปภาพ</th>
              <th className="px-20 py-3 max-w[50px] text-xl ">ชื่อ</th>
              <th className="px-5 py-3 text-xl">Action</th>
            </tr>
          </thead>
          <tbody>
            {/* {categorys.map((p, index) => (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="w-10 px-1 py-2 text-xl">{index + 1}</td>
                <td className="w-32 px-10 mx-auto text-xl ">
                  <img src={p.image.filePath} className="max-h-[80px] p-2 " />
                </td>
                <td className="w-64 px-10 mx-auto text-xl ">{p.name}</td>
                <td className="px-1 py-2 text-xl w-96">
                  <Link to={"/update-category/" + p._id}>
                    <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                      <ImPencil />
                    </button>
                  </Link>
                  <button
                    onClick={() => confirmDelete(p._id)}
                    className="px-4 py-2 font-semibold text-red-700 bg-transparent border border-blue-500 rounded hover:bg-blue-500 hover:text-white hover:border-transparent"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))} */}
          </tbody>
        </table>
      </div>
  
  );
};

export default Category;
