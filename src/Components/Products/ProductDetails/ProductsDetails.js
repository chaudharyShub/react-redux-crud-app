import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import './ProductDetails.css';

function ProductsDetails() {

    const selector = useSelector(state => state);
    const { id } = useParams();

    const productDetailsObject = selector.productReducer.products.find(items => items.uniqueId === id);

    return (
        <div className='product_details_container'>
            {
                <>
                    <div>
                        <h4>{productDetailsObject.productName}</h4>
                        <p><span>Model Name</span> : {productDetailsObject.modelName}</p>
                        <p><span>Company Name</span> : {productDetailsObject.companyDetails.companyName}</p>
                        <p><span>Price</span> : &#8377; {productDetailsObject.price}</p>
                        <p><span>Images</span> : </p>
                    </div>
                    <div>
                        {
                            productDetailsObject.imagesArray?.map(image =>
                                <div className="details_image" key={image.name}>
                                    <p>{image.name.substring(0, 20)}...</p>
                                </div>)
                        }
                    </div>
                </>
            }
        </div>
    );
}

export default ProductsDetails;
