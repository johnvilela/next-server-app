'use client'

import {useGlobal} from "@/contexts/globalContext";
import Link from "next/link";

export function CartButton({initialCart}) {
    const {cart} = useGlobal();

    const cartObj = cart.length === 0 ? initialCart : cart;

    if (cartObj.length === 0) {
        return null;
    }

    return (
        <Link href='/cart' className='flex gap-2'>
            <div className='flex items-center justify-center bg-blue-800 text-white text-xs w-6 h-6 rounded-full'>
                {cartObj.length}
            </div>
            View cart
        </Link>
    )
}