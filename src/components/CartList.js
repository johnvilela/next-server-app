'use client';

import {useGlobal} from "@/contexts/globalContext";
import {formatMoney} from "@/utils/formatMoney";

export function CartList({initialCart}) {
    const {cart, updateCart} = useGlobal();

    const cartObj = cart.length === 0 ? initialCart : cart;

    const grouppedCart = cartObj.reduce((acc, product) => {
        const existing = acc.find(val => val.id === product.id);

        if (existing) {
            existing.quantity++;
        } else {
            acc.push({
                ...product,
                quantity: 1
            });
        }

        return acc;
    }, []);

    const cartTotal = cartObj.reduce((acc, product) => {
        return acc + product.price;
    }, 0);

    function removeOneProduct(id) {
        const sameProducts = cartObj.filter(product => product.id === id);
        const otherProducts = cartObj.filter(product => product.id !== id);

        sameProducts.pop();

        updateCart([...otherProducts, ...sameProducts]);
    }

    return (
        <ul className='max-w-xl mx-auto mt-4'>
            {
                grouppedCart.map((product) => (
                    <li key={product.id} className='flex justify-between items-center p-4 border-b border-gray-200'>
                        <p className='w-3/5'>{product.title}</p>
                        <p className='w-1/5 text-right'>{product.quantity}x - {formatMoney(product.price)}</p>
                        <button
                            type='button'
                            onClick={() => removeOneProduct(product.id)}
                            className='w-1/5 w-8 h-8 rounded-full bg-red-500 flex justify-center items-center'>
                            X
                        </button>
                    </li>
                ))
            }
            <li className='flex justify-between p-4 font-bold'>
                <p>Total</p>
                <p>{formatMoney(cartTotal)}</p>
            </li>
        </ul>
    )
}