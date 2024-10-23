import Heading from '@/components/ui/Heading'
import AddProductForm from '@/components/products/AddProductForm'
import ProductForm from '@/components/products/ProductForm'
import React from 'react'

export default function CreateProductPage() {
    return (
        <>
            <Heading>Nuevo producto</Heading>
            <AddProductForm><ProductForm></ProductForm></AddProductForm>
        </>
    )
}
