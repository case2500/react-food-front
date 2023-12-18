import React from "react";


const CategoryForm = ({
  category,
  categoryImage,
  imagePreview,
  handleInputChange,
  handleImageChange,
  saveCategory,
}) => {
  return (
    <div className="container w-full mx-16 ">
      <h1 className="text-xl">แก้ไขหมวดหมู่</h1>
      <div className="flex">
    {/* id:  {category?._id} */}
        <form onSubmit={saveCategory}>
          <label>ชื่อหมวดหมู่:</label>
          <input
            type="text"
            placeholder="ชื่อหมวดหมู่"
            name="name"
            className="flex p-1 mb-2 border border-gray-400 w-96"
            value={category?.name}
            onChange={handleInputChange}
          />

          <div className="">
            <div className="mt-5">ชนิดของรูปภาพ: jpg, jpeg, png</div>
            <input
              type="file"
              name="image"
              onChange={(e) => handleImageChange(e)}
            />

            {imagePreview != null ? (
              <div className="my-2 ">
                <img
                  src={imagePreview}
                  alt="category"
                  className="cover-fill max-w-[100px] max-h-[100px] "
                />
              </div>
            ) : (
              <p className="my-10">ไม่มีรูปภาพ</p>
            )}
          </div>

          <div className="mt-2">
            <button
              type="submit"
              className="px-5 py-2 bg-green-600 rounded-md "
            >
              บันทึก
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryForm;
