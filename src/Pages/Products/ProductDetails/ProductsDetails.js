import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import './ProductDetails.css';


function ProductsDetails() {

    const selector = useSelector(state => state);
    const { id } = useParams();
    const navigate = useNavigate();

    const [imagesArray, setimagesArray] = useState([]);
    const [productDetailsObject, setProductDetailsObject] = useState({});

    useEffect(() => {
        const productDetailsObject = selector.productReducer?.products?.find(items => items.id === id);
        setProductDetailsObject(productDetailsObject);
        setimagesArray(JSON.parse(productDetailsObject?.data?.imagesArray));

        return () => setimagesArray([]);
    }, []);

    return (
        <>
            <button className='btn btn-dark m-2' onClick={() => navigate(-1)}> &#8592; Back</button>
            <div className='product_details_container'>
                {
                    <>
                        <div>
                            <h4>{productDetailsObject?.data?.productName}</h4>
                            <p><span>Model Name</span> : {productDetailsObject?.data?.modelName}</p>
                            <p><span>Company Name</span> : {productDetailsObject?.data?.companyDetails.companyName}</p>
                            <p><span>Price</span> : &#8377; {productDetailsObject?.data?.price}</p>
                            <p><span>Images</span> : </p>
                        </div>
                        <div>
                            {
                                imagesArray.length ? imagesArray.map(image =>
                                    <div className="details_image" key={image.name}>
                                        <p>{image.name.substring(0, 20)}...</p>
                                    </div>
                                ) : <p>No images to show !</p>
                            }
                        </div>
                    </>
                }
            </div>
        </>
    );
}

export default ProductsDetails;
