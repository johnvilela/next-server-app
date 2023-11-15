import {CartList} from "@/components/CartList";
import Link from "next/link";
import {cookies} from "next/headers";

export default function CartPage() {
    const cartString = cookies().get('cart')?.value;
    const cart = cartString ? JSON.parse(cartString) : [];

    return (
        <>
        <nav className='w-full p-4 bg-gray-300 flex gap-2'>
            <Link href='/'>
                Go back
            </Link>
        </nav>
        <div>
            <CartList initialCart={cart}/>
        </div>
        </>
    )
}