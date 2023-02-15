import React from 'react'
import { useParams } from 'react-router-dom'

const EditProduct = () => {
    const params = useParams();
    return (
        <div className='p-4'>
            <h1 className='text-2xl font-bold'>Edit Product {`-> No. ${params.edit_id}`}</h1>

        </div>
    )
}

export default EditProduct