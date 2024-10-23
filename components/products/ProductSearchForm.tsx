"use client"
import { SearchSquema } from "@/src/schema"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"

export default function ProductSearchForm() {

    const router = useRouter()
    const handleSearchForm = (formData: FormData) => {
        const data = {
            search: formData.get('search')
        }

        const result = SearchSquema.safeParse(data)

        if (!result.success) {
            result.error.issues.forEach(issue => {
                console.log(issue)
                toast.error(issue.message)
            })
            return
        }
        router.push(`/admin/products/search?search=${result.data.search}`)
    }
    return (
        <form className="flex items-center" action={handleSearchForm}>

            <input
                type="text"
                placeholder="Buscar Producto"
                className="p-2 placeholder-gray-400 w-full"
                name="search"
            ></input>

            <input type="submit"
                className="bg-indigo-600 p-2 uppercase text-white cursor-pointer"
                value={'Buscar'} />
        </form>
    )
}
