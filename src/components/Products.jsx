import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useApi from "../custom/useApi";

const ProductList = ({ data, setRequest, reFetch }) => {
    const deleteProduct = (delete_id) => {
        setRequest('http://localhost:3307/delete_product/' + delete_id, 'DELETE');
        //* without this even after the delete request is initiated it doesn't refresh the list so the setTimeout function was added, took me 3 hours to figure it out, hehe, silly me
        setTimeout(() => {
            reFetch();
        }, 10);
    }
    return (
        <>
            <table className='w-full'>
                <thead>
                    <tr className='bg-orange-100 text-orange-900'>
                        <th className='text-start p-2 text-sm'>Item No.</th>
                        <th className='text-start p-2 text-sm'>Item Serial</th>
                        <th className='text-start p-2 text-sm'>Product Name</th>
                        <th className='text-start p-2 text-sm'>Description</th>
                        <th className='text-start p-2 text-sm'>Price</th>
                        <th className='text-start p-2 text-sm'>Date Added</th>
                        <th className='text-start p-2 text-sm'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.length > 0 ?
                            data.map((item, key) =>
                                <tr key={key} className='odd:bg-orange-300 even:bg-orange-100'>
                                    <td className='text-start px-2 py-1 text-sm'>{item.item_id}</td>
                                    <td className='text-start px-2 py-1 text-sm'>{item.item_serial}</td>
                                    <td className='text-start px-2 py-1 text-sm'>{item.item_name}</td>
                                    <td className='text-start px-2 py-1 text-sm w-[300px] max-w-[300px]'>{item.description}</td>
                                    <td className='text-start px-2 py-1 text-sm'>₱ {item.item_price}</td>
                                    <td className='text-start px-2 py-1 text-sm'>{item.date_added}</td>
                                    <td>
                                        <button className="mx-1 hover:underline" onClick={() => deleteProduct(item.item_id)} type="button">Delete</button>
                                        <button className="mx-1 hover:underline" type="button"><Link to={'/edit_product/' + item.item_id}>Edit</Link></button>
                                    </td>
                                </tr>
                            )
                            :
                            <tr><td colSpan={7} className='bg-[crimson] p-2 text-center text-white'>No Products Found</td></tr>
                    }
                </tbody>
            </table>
            <p className="sticky bottom-0 left-0 w-full bg-white z-10 p-1  text-end">Results : {data.length}</p>
        </>

    )
}

const FindProductForm = ({ handleChange, handleKeyPress, response, fetchData, findProduct }) => {
    return (
        <form className='flex gap-2 items-center justify-start' onSubmit={findProduct}>
            <input onKeyDown={handleKeyPress} onChange={handleChange} required className='border-2 border-orange-400 p-2 rounded-md' type="text" name="search_product" id="" placeholder='Search Products...' />
            <button className='p-1 rounded-md bg-orange-400 text-white' type='submit'>Search</button>
            {/* //? [reason->answer] of this */}
            {response.length == 0 && <button type="button" onClick={fetchData} className='p-1 rounded-sm bg-slate-300'>Load Products</button>}
        </form>
    )
}

const Products = () => {

    const [inputValue, setInputValue] = useState('');

    const handleChange = (e) => {
        setInputValue(values => ({ ...values, [e.target.name]: e.target.value }));
    }

    // ? Doesnt accepts any enter spaces within the input
    // * idk why added this, i even added the require attribute to the input, since without the server returns an error as it does not accept an empty input (e.g 'spaces') since it only accepts everything in JSON format, because the payload inputValue is what im passing to the server because there is nothing in there, could be server code issues (index.js)
    const handleKeyPress = (e) => {
        e.key === " " && e.preventDefault();
    }

    const [response, request] = useApi([]);
    //? Fetch data when in the products page route
    useEffect(() => { fetchData(); }, []); //* can comment this out because [reason]
    const fetchData = () => {
        request('http://localhost:3307/load_products', 'GET', []);
    }
    const findProduct = (e) => {
        e.preventDefault();
        //? If the response returned from the findProduct function returns an empty array length by 0 it then loads the entire list when fetched again
        response.length == 0 ? fetchData() :
            // ? else it fetches the specified item/product from the table/list
            request('http://localhost:3307/item/' + inputValue.search_product, 'GET', []);
    }

    return (
        <div className='p-4'>
            <h1 className='text-xl font-bold'>Products</h1>
            <FindProductForm handleChange={handleChange} handleKeyPress={handleKeyPress} response={response} fetchData={fetchData} findProduct={findProduct} />
            <hr className='my-2 border border-orange-600' />
            <div className='h-[420px] max-h-[428px] overflow-y-scroll pr-2'>
                <ProductList data={response} setRequest={request} reFetch={fetchData} />
            </div>
        </div>
    )
}

export default Products; 