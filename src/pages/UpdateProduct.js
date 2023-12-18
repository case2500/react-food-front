import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { createProduct, updateProduct } from '../store/product/productSlice.js'
import axios from 'axios'
//  import { URL } from "../../../URL.js";
const initialstate = {
    name: '',
    category: '',
    price: '',
    // phone: "",
    quantity: 1,
    discount: 0,
    brand: '',
    stock: 1,
    status: 1,
    categories: [],
    description: '',
    images: '',
    image: ''
}

function AddProduct() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const history = useNavigate()

    const [loading, setLoading] = useState(false)
    const [categorys, setCategorys] = useState([])
    const imageTypeRegex = /image\/(png|jpg|jpeg)/gm
    const [images, setImages] = useState('')
    // const [name, setName] = useState("");
    // const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState('')
    // const [brand, setBrand] = useState("");

    const [category, setCategory] = useState('')
    const [values, setFieldValue] = useState('')

    const [product, setProduct] = useState('')
    const [productvalues, setValues] = useState([])

    const authtoken = JSON.parse(localStorage.getItem('token'))

    const saveProduct = async () => {
        const formData = new FormData()
        formData.append('_id', id)
        formData.append('name', name)
        formData.append('price', price)
        formData.append('stock', stock)
        formData.append('brand', brand)
        formData.append('supplier_id', supplier_id)
        formData.append('status', status)
        formData.append('discount', discount)
        // formData.append("category", category);
        formData.append('description', description)
        formData.append('image', images)
        // alert(JSON.stringify('save') + JSON.stringify(name + price))
         dispatch(updateProduct({authtoken, formData }))
        history('/')
    }

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value })
    }

    const showPreviewImage = (values) => {
        if (values) {
            return <img src={values} style={{ height: 100, marginTop: 16 }} />
        } else if (values.image) {
            return (
                <img
                    // src={`${imageUrl}/images/${values.image}`}
                    style={{ height: 100 }}
                />
            )
        }
    }

    const getproduct = async (id) => {
        try {
            const response = await axios.get(`http://localhost:4000/api/products/product/` + id)
            //  alert(JSON.stringify(response.data[0]));
            setProduct(response.data[0])
        } catch (error) {
            alert(error)
        }
    }

    useEffect(() => {
        getproduct(id)
    }, [dispatch])
    const { name, price, stock, description, discount, brand, supplier_id, status } = product
    return (
        <>
            <div className="w-[1024px]">
                <div className="  row mt-3">
                    <div className="col-3">
                        <div className="p-6.5">
                            {/* {JSON.stringify(product)} */}
                            <input
                                type="text"
                                name="name"
                                value={product?.name}
                                onChange={handleChange}
                                placeholder="ชื่อ"
                                className="w-full bg-gray-200 rounded border-[1.5px]  py-3 px-5 text-xl  "
                            />
                        </div>
                    </div>
                    <div className="mb-4.5 px-5 mt-4">
                        <label className="block text-xl text-gray-300 ">ราคา</label>
                        <input
                                                 type="number"
                            name="price"
                            value={product?.price}
                            onChange={handleChange}
                            className="w-32 bg-gray-200 text-xl rounded text-right border-[1.5px] py-1  "
                        />{' '}
                        บาท
                    </div>
                    <div className="mb-4.5 px-5 mt-4">
                        <label className="block text-xl text-gray-300  ">stock</label>
                        <input
                            type="text"
                            name="stock"
                            value={product?.stock}
                            onChange={handleChange}
                            className="w-32  rounded text-xl border-[1.5px]  text-right py-1 px-5 bg-gray-200 "
                        />
                    </div>
                    <div className="mb-4.5 px-5 mt-4">
                        <label className="block text-xl text-gray-300 ">แบรนด์</label>
                        <input
                            type="text"
                            name="brand"
                            value={product?.brand}
                            onChange={handleChange}
                            className="w-64  rounded text-xl border-[1.5px]  py-1 px-5 bg-gray-200 "
                        />
                    </div>
                    <div className="mb-4.5 px-5 mt-4">
                        <label className="block text-xl text-gray-300 ">Supply ID</label>
                        <input
                            type="text"
                            name="supplier_id"
                            value={product?.supplier_id}
                            onChange={handleChange}
                            className="w-64  rounded text-xl border-[1.5px]  py-1 px-5 bg-gray-200  "
                        />
                    </div>
                    <div className="mb-4.5 px-5 mt-4">
                        <label className="block text-xl text-gray-300 ">Status</label>
                        <input
                            type="text"
                            name="status"
                            value={product?.status}
                            onChange={handleChange}
                            className="w-64  rounded text-xl border-[1.5px]  py-1 px-5 bg-gray-200  "
                        />
                    </div>
                    <div className="mb-4.5 px-5 mt-4">
                        <label className="block text-xl text-gray-300 ">ลดราคา</label>
                        <input
                            type="text"
                            name="discount"
                            value={product?.discount}
                            onChange={handleChange}
                            className="w-64  rounded text-xl border-[1.5px]  py-1 px-5 bg-gray-200  "
                        />
                    </div>
                    <div>{showPreviewImage(values)}</div>
                    img: {JSON.stringify(images)}
                    <img src={`http://localhost:4000/uploads/products/` + product.image} className="flex items-center h-24 " />
                    {/* เลือกรูป */}
                    <div className="mt-5 ml-5 text-xl text-gray-300">
                        <form>
                            <label htmlFor="file">เลือกรูป</label>
                        </form>
                    </div>
                    <form>
                        <input
                            type="file"
                            onChange={(e) => {
                                e.preventDefault()
                                // alert(JSON.stringify(e))
                                setImages(e.target.files[0]) // for upload
                                setFieldValue(URL.createObjectURL(e.target.files[0])) // for preview image
                            }}
                            name="image"
                            multiple
                            accept="image/*"
                            id="files"
                            style={{ padding: '20px 0' }}
                        />
                    </form>
                    <div className="px-5 mt-4 mb-6">
                        <label className="block text-xl text-gray-300 ">รายละเอียด</label>
                        <textarea
                            rows={6}
                            placeholder="คำอธิบาย"
                            className="w-full text-xl rounded border-[1.5px] border-stroke bg-gray-200 py-3 px-5 font-medium   "
                            type="text"
                            name="description"
                            value={product?.description}
                            onChange={handleChange}
                        />
                    </div>
                    <button
                        className="flex justify-center w-32 p-3 mx-5 my-2 text-xl font-medium text-white bg-green-600 rounded"
                        onClick={() => saveProduct()}
                    >
                        บันทึก
                    </button>
                </div>
            </div>
        </>
    )
}

export default AddProduct
