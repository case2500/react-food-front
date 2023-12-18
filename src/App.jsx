import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/shared/Layout'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Products from './pages/Products'
// import Order from './pages/Order.js'
import Settings from './pages/Settings.js'
import PrivateRoutes from './utils/PrivateRoutes.js'
import Login from './pages/Login.js'
import AddProduct from './pages/AddProduct.js'
import UpdateProduct from './pages/UpdateProduct.js'
import Category from './pages/Category.js'
import AddCategory  from './pages/AddCategory.js'
import UpdateCategory from './pages/UpdateCategory.js'
 import Food from './pages/Food.js'
import {


    Navigate,
} from "react-router-dom";
function App() {
    return (
        <Router>
            <Routes>
                <Route element={<PrivateRoutes />}>
                    <Route path="/" element={<Layout />}>
                    <Route
                        path="*"
                        element={<Navigate to="/" />}
                    />
                  
                        <Route index element={<Dashboard />} />
                        <Route path='category' element={<Category />}/>
                        <Route path='add-category' element={<AddCategory />}/>
                        <Route path='update-category/:id' element={<UpdateCategory/>}/>
                        <Route path="products" element={<Products />} />
                        <Route path="add-product" element={<AddProduct />} />
                        <Route path="update-product/:id" element={<UpdateProduct/>} />
                        {/* <Route path="orders" element={<Order />} /> */}
                        <Route path="settings" element={<Settings />} />
                    </Route>
                </Route>
                <Route path='food' element={<Food />} />
                <Route element={<Login />} path="/login" />
                <Route path="/register" element={<Register />} />
            </Routes>
        </Router>
    )
}

export default App
