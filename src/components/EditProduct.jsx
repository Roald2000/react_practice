import React, { useRef, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import useApi from '../custom/useApi';

const EditProduct = () => {
    const params = useParams();
    const navi = useNavigate();

    const item_serial = useRef(null);
    const item_name = useRef(null);
    const item_price = useRef(null);
    const description = useRef(null);

    const [response, request] = useApi([]);
    const handleSubmitUpdate = (e) => {
        e.preventDefault();
        let values = {
            item_serial: item_serial.current.value,
            item_name: item_name.current.value,
            item_price: item_price.current.value,
            description: description.current.value
        }
        request('http://localhost:3307/update_item/' + params.edit_id, 'PUT', values);
        console.log(response);
    }

    const [itemDetail, setItem] = useApi([]);
    function LoadItemDetail() {
        setItem('http://localhost:3307/find_item/' + params.edit_id, 'GET', []);
    }

    useEffect(() => {
        LoadItemDetail();
    }, []);



    return (
        <form onSubmit={handleSubmitUpdate} className="bg-orange-300 rounded-md p-3 flex flex-col flex-wrap gap-2">
            <h1 className='text-2xl font-bold'>Edit Product {`-> No. ${params.edit_id}`}</h1>
            <hr className="my-2 border-none" />
            {
                itemDetail.map((item) =>
                    <div key={item.item_id}>
                        <label htmlFor="" className='flex flex-col gap-2 rounded-md '>
                            <span className='text-xl font-semibold'>Item Serial</span>
                            <input defaultValue={item.item_serial} className='p-2 bg-slate-100 rounded-sm' type="text" ref={item_serial} id="" />
                        </label>
                        <label htmlFor="" className='flex flex-col gap-2 rounded-md '>
                            <span className='text-xl font-semibold'>Item Name</span>
                            <input defaultValue={item.item_name} className='p-2 bg-slate-100 rounded-sm' type="text" ref={item_name} id="" />
                        </label>
                        <label htmlFor="" className='flex flex-col gap-2 rounded-md '>
                            <span className='text-xl font-semibold'>Item Price</span>
                            <input defaultValue={item.item_price} className='p-2 bg-slate-100 rounded-sm' type="text" ref={item_price} id="" />
                        </label>
                        <label htmlFor="" className='flex flex-col gap-2 rounded-md '>
                            <span className='text-xl font-semibold'>Item Description</span>
                            <input defaultValue={item.description} className='p-2 bg-slate-100 rounded-sm' type="text" ref={description} id="" />
                        </label>
                    </div>
                )
            }
            <div className='flex justify-start items-center gap-2'>
                <button className='rounded-md text-white bg-blue-600 p-2' type='submit'>Update</button>
                <button className='rounded-md text-white bg-red-600 p-2' type='button'><Link to={'/'}>Cancel</Link></button>
            </div>
            <p className={`rounded-md ${response.length !== 0 && 'p-1 bg-blue-600'} text-white`}>{response.message}</p>
        </form>
    )
}

export default EditProduct