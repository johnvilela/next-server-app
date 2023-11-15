'use client';

import {useGlobal} from "@/contexts/globalContext";
import {formatMoney} from "@/utils/formatMoney";

export function ProductList({products}) {
    const {selectedCategory, setSelectedId, nameFilter} = useGlobal()

    return (
        <ul className='w-full'>
            {
                products
                    .filter(p => selectedCategory ? p.category === selectedCategory : true)
                    .filter(p => nameFilter ? p.title.toLowerCase().includes(nameFilter.toLowerCase()) : true)
                    .map(product => (
                    <li key={product.id}>
                        <button
                            type='button'
                            className='w-full bg-gray-300 rounded-md mb-2 p-4 flex flex-col justify-between hover:brightness-75'
                            onClick={() => setSelectedId(product.id)}
                        >
                            <p className='line-clamp-3 mb-4 font-bold text-left'>{product.title}</p>
                            <p className='text-right w-full'>{formatMoney(product.price)}</p>
                        </button>
                    </li>
                ))
            }
        </ul>
    )
}