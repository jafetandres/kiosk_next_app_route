import Heading from '@/components/ui/Heading'
import ProductTable from '@/components/products/ProductsTable'
import { prisma } from '@/src/lib/prisma'
import React from 'react'
import ProductSearchForm from '@/components/products/ProductSearchForm';

async function searchProducts(searchTerms: string) {
    const products = await prisma.product.findMany({
        where: {
            name: {
                contains: searchTerms,
                mode: 'insensitive'
            }
        }, include: {
            category: true
        }
    })
    return products

}
export default async function SearchPage({ searchParams }: { searchParams: { search: string } }) {

    const products = await searchProducts(searchParams.search)
    return (
        <>
            <Heading>Resultados de busqueda: {searchParams.search}</Heading>
            <div className="flex flex-col lg:flex-row lg:justify-end gap-5">
                <ProductSearchForm></ProductSearchForm>
            </div>
            {products.length ? (
                <ProductTable
                    products={products}
                ></ProductTable>
            ) : <p className='text-center text-lg'>No hay resultados</p>}

        </>

    )
}
