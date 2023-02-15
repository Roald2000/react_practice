import { useEffect, useState } from "react";
import swal from "sweetalert";
import useApi from "../custom/useApi";

const AddProductsInputs = ({ label, name, handleChange }) => {
    return (
        <label htmlFor="" className='flex flex-col gap-1 flex-1'>
            <span>{label}</span>
            <input className='p-1 rounded-md bg-slate-300' onChange={handleChange} type="text" name={name} id="" />
        </label>
    )
}

const AddProduct = () => {

    const [inputValue, setInputValue] = useState('');

    const handleChange = (e) => {
        setInputValue(values => ({ ...values, [e.target.name]: e.target.value }));
    }

    const [response, request] = useApi([]);
    const handleSubmit = (e) => {
        e.preventDefault();
        request('http://localhost:3307/add_product', 'POST', inputValue);
    }



    return (
        <div className='p-4'>
            <h1 className='text-xl font-bold'>Add New Product</h1>
            <br />
            <form onSubmit={handleSubmit}>
                <div className='flex flex-wrap gap-1 justify-start items-stretch'>
                    <AddProductsInputs handleChange={handleChange} label={'Item Serial'} name={'item_serial'} />
                    <AddProductsInputs handleChange={handleChange} label={'Item Name'} name={'item_name'} />
                    <AddProductsInputs handleChange={handleChange} label={'Item Price'} name={'item_price'} />
                    <AddProductsInputs handleChange={handleChange} label={'Item Description'} name={'description'} />
                </div>
                <br />
                <div className='flex justify-end items-stretch gap-2'>
                    <button onClick={() => setInputValue('')} className='p-1 rounded text-white bg-[crimson]' type='reset'>Reset</button>
                    <button className='p-1 rounded text-white bg-[royalblue]' type='submit'>Submit</button>
                </div>
            </form>
            <br />
            {response.length !== 0 && (
                <p className={`p-1  w-fit rounded-md ${response.status == true ? 'bg-blue-600 text-white' : 'bg-red-600 text-white'}`}>{response.message}</p>
            )}
        </div >
    )
}

export default AddProduct;