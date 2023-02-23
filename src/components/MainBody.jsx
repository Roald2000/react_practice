import React from 'react'
import { Routes, Route, useParams } from 'react-router-dom';

import Products from './Products';
import AddProduct from './AddProducts';
import EditProduct from './EditProduct';
import BuyProduct from './BuyProduct';



const MainBody = () => {
  return (
    <main className='my-2'>
      <Routes>
        <Route path='/' element={<Products />} />
        <Route path='/buy_product' element={<BuyProduct />} />
        <Route path='/new_product' element={<AddProduct />} />
        <Route path='/edit_product/:edit_id' element={<EditProduct />} />
      </Routes>
    </main>
  )
}
export default MainBody; 
