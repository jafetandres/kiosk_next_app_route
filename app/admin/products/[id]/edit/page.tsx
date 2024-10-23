import Heading from "@/components/ui/Heading"
import EditProductForm from "@/components/products/EditProductForm"
import ProductForm from "@/components/products/ProductForm"
import { prisma } from "@/src/lib/prisma"
import { notFound } from "next/navigation"
import GoBackButton from "@/components/ui/GoBackButton"

async function getProdcutById(id: number) {
    const product = await prisma.product.findUnique({
        where: {
            id
        }
    })

    if (!product) {
        notFound()
    }
    return product

}
export default async function EditProductsPage({ params }: { params: { id: string } }) {

    const product = await getProdcutById(+params.id)
    return (
        <>
            <Heading>Editar Producto: {product.name}</Heading>
            <GoBackButton></GoBackButton>
            <EditProductForm>
                <ProductForm product={product}></ProductForm>
            </EditProductForm>
        </>
    )
}
