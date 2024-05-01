
import React, { useState, useEffect } from 'react';
import axios from "axios";
import './App.css';
import InfiniteScroll from 'react-infinite-scroll-component'
import './style.css'

export default function DataCollection() {
    const [data, setData] = useState([]);
    const [offset,setOffset] =useState(1)
    const [searchTerm, setSearchTerm] =useState("")
    //text input event - value is set in the variable
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        //clear before data for new search
        setData([])
        setOffset(1)
    }
        //initial data fetch - first load
        useEffect(() => {
            const fetchData = async () => {
                try {
                    if(!searchTerm)
                    {
                    const res = await fetch(`http://localhost:3000/products?_page=${offset}&_limit=4`)
                    const data = await res.json()
                    setData(pre => [...pre, ...data])
                    }
                    else {
                        const res = await fetch(`http://localhost:3000/products?q=${searchTerm}&_page=${offset}&_limit=4`)
                        const data = await res.json()
                        //appends to existing
                        setData(pre => [...pre, ...data])
                        //setData(data)
                    }

                } catch(error) {
                    console.log(error)
                }
            }
        fetchData()
        }, [offset,searchTerm])

        //end of page - to fetch  next page data
        useEffect(() => {
            const handScroll = (e) => {
             const scrollHeight = e.target.documentElement.scrollHeight
             const currentHeight = e.target.documentElement.scrollTop + window.innerHeight
             if ( currentHeight + 1 >= scrollHeight) {
                setOffset(offset + 1)
             }
            }

            window.addEventListener("scroll",handScroll)
            return() => window.removeEventListener("scroll",handScroll)

        },[offset])

        return (

            <div className="templateContainer">
                    <div className="searchInput_Container">
                    <form>
                        <input id = "searchInput" type = "text" placeholder="Search" onChange={handleSearch}/>
                    </form>
            </div>

            <div className="App">
                    <div className='product-list'>
                        {data && data.map(product => (
                                <div className='product-item' key={product.id}>
                                <p className='product-price'> </p>

                                    <img className='img'
                                     src={product.image}
                                     alt="img" />

                                    <div className='product-info'>
                                    <h4 className='product-name'>{product.name}</h4>
                                    <p className='product-price'>${product.price}</p>
                                    <p className='product-desc'>{product.description}</p>
                                    </div>
                                </div>
                            ))}
                    </div>
            </div>
            </div>
        );
}