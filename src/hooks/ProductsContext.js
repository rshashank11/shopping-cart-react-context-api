import axios from "axios"
import React, { useState } from "react"

export const ProductsContext = React.createContext()

const axiosInstance = axios.create({
    baseURL: "https://fakestoreapi.com"
})

export const ProductsProvider = ({children}) => {
    const [isEmpty, setIsEmpty] = useState(true)
    const [productCount, setProductCount] = useState([])
    const [cart, setCart] = useState([])
    const [searchData, setSearchData] = useState([])
    const [productsData, setProductsData] = useState([])

    function fetchData(search, option, subOption) {
        if(subOption !== null) {
            axiosInstance.get(`/${search}/${option}/${subOption}`)
            .then(response => response.data)
            .then(data => setProductsData(data))
            .catch(err => console.error(err.response))
        } else if(subOption === null && option === null) {
            axiosInstance.get(`/${search}`)
            .then(response => response.data)
            .then(data => setProductsData(data))
            .catch(err => console.error(err.response))
        } else if(subOption === null && option !== null) {
            axiosInstance.get(`/${search}/${option}`)
            .then(response => response.data)
            .then(data => setProductsData(data))
            .catch(err => console.error(err.response))
        }   else {
            axiosInstance.get("/products/categories")
            .then(response => response.data)
            .then(data => setSearchData(data))
            .catch(err => console.error(err.response))
        }
    }
    return (
        <ProductsContext.Provider value = {{fetchData, searchData, productsData, cart, setCart, productCount, setProductCount, isEmpty, setIsEmpty}}>
            {children}
        </ProductsContext.Provider>
    )
}

