import { list } from 'postcss';
import { useState } from 'react'
import useApi from '../custom/useApi';


const BuyProduct = () => {

    const [inputValue, setInputValue] = useState('');
    const handleChange = (e) => {
        setInputValue(values => ({ ...values, [e.target.name]: e.target.value }));
    }
    const handleKeyPress = (e) => {
        e.key === " " && e.preventDefault();
    }

    const [order_info, addOrder] = useApi([]);
    const submitOrder = (e) => {
        e.preventDefault();
        addOrder('http://localhost:3307/add_order', 'POST', inputValue)
    }

    const [listItems, setListItems] = useApi([]);
    const fetchOrderItems = () => {
        inputValue.customer_name !== '' &&
            setListItems('http://localhost:3307/customer_orders/' + inputValue.customer_name, 'GET', []);
    }

    return (
        <div className='p-3'>
            <h1 className='text-2xl font-bold'>Buy Products</h1>
            <div>
                <h2 className='text-xl font-semibold'>Customer Details</h2>
                <form onSubmit={submitOrder} className='flex gap-2 items-center justify-start'>
                    <input type="text" onKeyDown={handleKeyPress} onChange={handleChange} name="customer_name" id="" required className='p-2 rounded-md border-2 border-slate-300' placeholder='Customer' />
                    <input type="text" onKeyDown={handleKeyPress} onChange={handleChange} name="item_serial" id="" required className='p-2 rounded-md border-2 border-slate-300' placeholder='Item Serial No.' />
                    <button type='submit' className='p-2 rounded-md border-2 border-blue-600 text-blue-600'>Add Order</button>
                    <button type='reset' className='p-2 rounded-md border-2 border-red-600 text-red-600'>Reset</button>
                    <button type='button' onClick={fetchOrderItems} className=''>Fetch</button>
                </form>
                <hr className='my-2 border border-black' />
                {order_info.length !== 0 && <p className={`p-2 font-semibold rounded-md ${order_info.status == true ? 'border-2 border-blue-600 text-blue-600' : 'border-2 border-red-600 text-red-600'}`}>{order_info.message}</p>}
                <hr className='my-2 border border-black' />
                <div>
                    <table className='w-full'>
                        <thead>
                            <tr>
                                <th>No.</th>
                                {/* <th>Serial</th> */}
                                <th>Item</th>
                                <th>Price</th>
                                <th>Qty</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                listItems.length !== 0 ?
                                    listItems.map((item, key) =>
                                        <tr key={key}>
                                            <td>{item.item_name}</td>
                                            <td>{item.total_qty_item_price}</td>
                                        </tr>
                                    )
                                    :
                                    <tr><td colSpan={5}>Add Orders to Customer</td></tr>
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div >
    )
}

export default BuyProduct