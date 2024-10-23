"use client"
import LatestOrderItem from '@/components/order/LatestOrderItem'
import Logo from '@/components/ui/Logo'
import { OrderWithProducts } from '@/src/types'
import React from 'react'
import useSWR from 'swr'

export default function OrdersPage() {
    const url = '/orders/api'

    const fetcher = () => fetch(url).then(res => res.json()).then(data => data)
    const { data, isLoading } = useSWR<OrderWithProducts[]>(url, fetcher, {
        refreshInterval: 60000,
        revalidateOnFocus: false
    })

    if (isLoading) return <p>Cargando ...</p>
    if (data)
        return (
            <>
                <h1 className='text-center mt-20 text-6xl font-black'>Ordenes listas</h1>
                <Logo></Logo>

                {data.length ? (
                    <div className='grid grid-cols-2 gap-5 max-w-5xl mx-auto mt-10'>
                        {data.map(order => (
                            <LatestOrderItem order={order} key={order.id}></LatestOrderItem>
                        ))}
                    </div>
                ) : <p>No hay ordenes listas</p>}
            </>
        )
}
