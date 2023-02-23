import { useEffect, useState } from "react";
import swal from "sweetalert";
import useApi from "../custom/useApi";

const AddProductsInputs = ({ label, name, handleChange }) => {
    return (
        <label htmlFor="" className='flex flex-col gap-1 flex-1'>
            <span className="text-xl font-semibold">{label}</span>
            <input className='p-2 rounded-md bg-white' onChange={handleChange} type="text" name={name} id="" />
        </label>
    )
}

const AddProductsForm = ({ handleChange, handleSubmit, response }) => {
    return (
        <form onSubmit={handleSubmit} className=''>
            <div className='flex flex-col flex-wrap gap-1 justify-start items-stretch'>
                <AddProductsInputs handleChange={handleChange} label={'Item Serial'} name={'item_serial'} />
                <AddProductsInputs handleChange={handleChange} label={'Item Name'} name={'item_name'} />
                <AddProductsInputs handleChange={handleChange} label={'Item Price'} name={'item_price'} />
                <AddProductsInputs handleChange={handleChange} label={'Item Description'} name={'description'} />
            </div>
            <hr className="my-2 border-none" />
            <div className='flex justify-start items-center gap-2'>
                <button className='p-2 rounded-md bg-blue-700 text-white' type='submit'>Submit</button>
                <button onClick={() => setInputValue('')} className='p-2 rounded-md text-white bg-[crimson]' type='reset'>Reset</button>
            </div>
            <hr className="my-2 border-none" />
            {response.length !== 0 && (
                <p className={`p-1  w-fit rounded-md ${response.status == true ? 'bg-[orange] text-white' : 'bg-red-600 text-white'}`}>{response.message}</p>
            )}
        </form>
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
        <div className='p-3 bg-blue-200 rounded-md'>
            <h1 className='text-2xl font-bold'>Add New Product</h1>
            <hr className="my-2 border-none" />
            <AddProductsForm handleChange={handleChange} handleSubmit={handleSubmit} response={response} />
        </div >
    )
}

export default AddProduct;