import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from '../components/Dashboard/Dashboard';
import ListCollections from '../components/Pages/Collections/ListCollections';
import { LoginManager } from '../components/Pages/LoginManager/LoginManager';
import { Login } from '../components/Pages/Login/Login';
import ListProducts from '../components/Pages/Products/ListProducts';
import ListUsers from '../components/Pages/Users/ListUsers';
import CreateProducts from '../components/Pages/Products/CreateProducts';
import { Home } from '../components/Pages/Home/Home';
import { Register } from '../components/Pages/Register/Register';
import ProductDetail from '../components/Pages/ProductDetail/ProductDetail';
import Checkout from '../components/Pages/Checkout/Checkout';
import Filter from '../components/Pages/Users/Filter';
import UserDetail from '../components/Pages/Users/UserDetailComponent';
import ListManufacturer from '../components/Pages/Manufacturer/ListManufacturer';
import ListCategories from '../components/Pages/Categories/ListCategories';
import ProductsUser from '../components/ListProductsUser/ProductsUser';
import Cart from '../components/Cart/Cart';
import ListBySearch from '../components/ListProductsUser/ListBySearch';

function MainRouter() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/admin' element={<LoginManager />} />
        <Route path='/login' element={<Login />} />
        <Route path='/product/:id' element={<ProductDetail />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/register' element={<Register />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/list-products' element={<Dashboard listProducts={<ListProducts />} />} />
        <Route path='/create-products' element={<Dashboard createProducts={<CreateProducts />} />} />
        <Route path='/list-collections' element={<Dashboard listCollections={<ListCollections />} />} />
        <Route path='/list-users' element={<Dashboard listUsers={<ListUsers />} />} />
        <Route path='/list-manufacturers' element={<Dashboard listManufacturers={<ListManufacturer />} />} />
        <Route path='/list-categories' element={<Dashboard listCategories={<ListCategories />} />} />
        <Route path='/userDetail' element={<UserDetail />} />
        <Route path='/products-user/:id' element={<ProductsUser />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/search/:name' element={<ListBySearch />} />
      </Routes>
    </Router>
  );
}

export default MainRouter;
