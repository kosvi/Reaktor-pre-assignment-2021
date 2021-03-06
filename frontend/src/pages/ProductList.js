import React, { useEffect, useState } from 'react';
import { Pages } from "../config/Pages";
import DatabaseAccessApi from "../classes/DatabaseAccessApi";
import Loading from "../components/Loading";


export default function ProductList(props) {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            if (Pages.includes(props.category)) {
                // ok, valid category
                try {
                    const productList = await DatabaseAccessApi.getProducts(props.category);
                    if (productList != null) {
                        setProducts(productList);
                        setLoading(false);
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        }
        fetchProducts();
    }, [props.category])

    const listColors = (colors) => {
        var colorText = "";
        for (let i = 0; i < colors.length; i++) {
            if (i > 0) {
                colorText += ", " + colors[i];
            } else {
                colorText += colors[i];
            }
        }
        return colorText;
    }

    if (loading) {
        return (
            <Loading message="Loading data" />
        )
    }

    return (
        <div>
            <h1>{props.category}</h1>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Color</th>
                        <th>Price</th>
                        <th>Manufacturer</th>
                        <th>Availability</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map((product) => (
                            <tr key={product.id}>
                                <td>{product.name}</td>
                                <td>{listColors(product.color)}</td>
                                <td>{product.price}</td>
                                <td>{product.manufacturer}</td>
                                <td>{product.availability}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div >
    )
}