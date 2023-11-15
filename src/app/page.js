import {ProductList} from "@/components/ProductList";
import {ProductFilter} from "@/components/ProductFilter";
import {ProductDetail} from "@/components/ProductDetail";
import {CartButton} from "@/components/CartButton";
import {cookies} from "next/headers";

async function getProducts() {
    const res = await fetch('https://fakestoreapi.com/products')

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

export default async function Home() {
    const products = await getProducts();
    const cartString = cookies().get('cart')?.value;
    const cart = cartString ? JSON.parse(cartString) : [];

    return (
        <>
            <nav className='w-full p-4 bg-gray-300 flex justify-between'>
                <h1>STORE</h1>

                <CartButton initialCart={cart}/>
            </nav>
            <main className='mb-8 p-4 gap-4 relative grid grid-cols-3'>
                <div className='col-span-2 relative'>
                    <ProductDetail/>
                </div>
                <div>
                    <ProductFilter categories={[...new Set(products.map(p => p.category))]}/>

                    <ProductList products={products}/>
                </div>
            </main>
        </>
    )
}
