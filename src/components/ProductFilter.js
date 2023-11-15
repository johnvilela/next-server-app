'use client';

import {useGlobal} from "@/contexts/globalContext";

export function ProductFilter({categories}) {
    const {setSelectedCategory, selectedCategory, setNameFilter} = useGlobal();

    const filterActiveCss = (category) => category === selectedCategory ? 'bg-blue-800 text-white' : 'bg-gray-300';

    return (
        <div className='mb-4 border-b border-gray-200 pb-4'>
            <div className='mb-4'>
                <input
                    placeholder='Search for product...'
                    className='border border-gray-300 w-full p-2 rounded'
                    onBlur={(e) => setNameFilter(e.target.value)}
                />
            </div>
            <ul className='flex gap-2 overflow-x-auto'>
                <li className='w-fit'>
                    <button
                        className={`whitespace-nowrap p-2 rounded duration-200 hover:brightness-75 ${filterActiveCss('')}`}
                        type='button'
                        onClick={() => setSelectedCategory('')}
                    >
                        ALL
                    </button>
                </li>
                {
                    categories.map(category => (
                        <li key={category} className='w-fit'>
                            <button
                                className={`whitespace-nowrap p-2 rounded duration-200 hover:brightness-75 ${filterActiveCss(category)}`}
                                type='button'
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                            >
                                {category}
                            </button>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}