'use client';

import {createContext, useContext, useState} from "react";
import {SWRConfig} from "swr";
import {getCookie, setCookie} from "cookies-next";

const GlobalContext = createContext({});

const GlobalProvider = ({children}) => {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedId, setSelectedId] = useState(null);
    const [nameFilter, setNameFilter] = useState('');
    const [cart, setCart] = useState(() => {
        const val = getCookie('cart');

        if(!val) {
            return [];
        }

        return JSON.parse(decodeURIComponent(val));
    })

    const updateCart = (newCart) => {
        setCart(newCart);

        setCookie('cart', JSON.stringify(
            newCart
        ));
    }

    return (
        <GlobalContext.Provider
            value={{
                selectedCategory,
                setSelectedCategory,
                selectedId,
                setSelectedId,
                nameFilter,
                setNameFilter,
                cart,
                updateCart
            }}
        >
            <SWRConfig
                value={{
                    fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
                }}
            >
                {children}
            </SWRConfig>
        </GlobalContext.Provider>
    );
};

function useGlobal() {
    const context = useContext(GlobalContext);

    if (!context) {
        throw new Error('useGlobal must be used within an GlobalProvider');
    }

    return context;
}

export {GlobalProvider, useGlobal};