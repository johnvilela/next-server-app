'use client';

import useSWR from "swr";
import {useGlobal} from "@/contexts/globalContext";
import Image from "next/image";
import {formatMoney} from "@/utils/formatMoney";

export function ProductDetail() {
    const {selectedId, updateCart, cart} = useGlobal()
    const {data, error, isLoading} = useSWR(selectedId ? `/api/products/${selectedId}` : null)

    return (
        <div className='w-full'>
            {!selectedId &&
                <p className='text-center w-full text-xl text-gray-400 font-bold p-4'>No products selected</p>}
            {error && <p className='text-center w-full text-xl text-gray-400 font-bold p-4'>failed to load</p>}
            {isLoading && <p className='text-center w-full text-xl text-gray-400 font-bold p-4'>loading...</p>}
            {data && (
                <div className='flex gap-4'>
                    <figure className='block w-[320px] h-[320px] object-contain border-2 border-gray-300 p-2'>
                        <Image src={data.image} alt={data.title} width={320} height={320}
                               className='object-contain h-[300px]'/>
                    </figure>
                    <div className='w-1/2'>
                        <h2 className='text-2xl font-bold'>{data.title}</h2>
                        <p className='text-sm mb-4'>Rate: {data.rating.rate} ({data.rating.count})</p>
                        <p className='mb-4'>{data.description}</p>
                        <p className='mb-8'>
                            {'Price: '}
                            <b
                                className='text-2xl font-bold'>
                                {formatMoney(data.price)}
                            </b>
                        </p>
                        <button
                            type='button'
                            className='w-full rounded-md p-4 bg-blue-600 font-bold text-white duration-200 hover:brightness-75'
                            onClick={() => updateCart([...cart, data])}
                        >
                            Add to cart
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}