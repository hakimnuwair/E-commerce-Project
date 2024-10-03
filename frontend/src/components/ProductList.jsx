import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {  useRouteLoaderData } from 'react-router-dom';
import "../styles/ProductList.css"
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { ClassNames } from '@emotion/react';
const BASE_URL = process.env.REACT_APP_API_BASE_URL;




const Test = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editProduct, setEditProduct] = useState(null);
    const [message, setMessage] = useState('');
    const [applyDiscount, setApplyDiscount] = useState(null);
    const authData = useRouteLoaderData('admin');
    const [discountId, setDiscountId] = useState('');
    const [applyDiscountLoading, setApplyDiscountLoading] = useState(false);
    const [applyDiscountError, setApplyDiscountError] = useState(null);
    const [productChangeFlag, setProductChangeFlag] = useState('');
    const [changeDiscount, setChangeDiscount] = useState(null);
    const [discountChangeLoading, setDiscountChangeLoading] = useState(false);
    const [changedDiscountId, setChangedDiscountId] = useState(null);
    const [discountChangeFlag, setDiscountChangeFlag] = useState(null);
    const [deleteDiscountLoading, setDeleteDiscountLoading] = useState(false);
    const [deleteDiscountFlag, setDeleteDiscountFlag] = useState(null);


    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/products/');
                setProducts(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [productChangeFlag, discountChangeFlag, deleteDiscountFlag]);

    const handleDelete = async (productId, productName) => {
        if (!window.confirm(`Are you sure you want to delete "${productName}"?`)) {
            return;
        }
        try {
            const response = await axios.delete(`http://localhost:8080/api/products/${productId}`,{
                headers : {
                    'Authorization' : 'Bearer ' + authData.token
                }
            }
               
            );
            setProducts(products.filter(product => product.productId !== productId));
            toast.success("Product deleted successfully")
            // setMessage('Product deleted successfully.');
        } catch (error) {
            console.error('Error deleting product:', error);
            toast.error("Error deleting product")
            // setMessage('Error deleting product.');
        }
    };

    const handleUpdate = async (productId, updatedProductData) => {     
        try {
            const response = await axios.put(`http://localhost:8080/api/products/${productId}`, updatedProductData,{
                headers : {
                    'Authorization' : 'Bearer ' + authData.token    
                }
            });
            console.log('Product updated:', response.data);
            // Update products state after update
            setProducts(products.map(product => product.productId === productId ? { ...product, ...updatedProductData } : product));
            setEditProduct(null); // Clear edit mode
            toast.success("Product updated successfully",{
                position: "top-center"
            })
        } catch (error) {
            console.error('Error updating product:', error);
            toast.error("Error updating product")
        }
    };

    const handleEdit = (product) => {
        setEditProduct({ ...product });
    };

    const handleCancelEdit = () => {
        setEditProduct(null);
    };

    const handleChange = (e) => {
        console.log("changes: ",e.target.name);
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;

        setEditProduct(prevState => ({
            ...prevState,
            [name]: newValue
        }));
    };

    const handleDiscountChange = (e) =>{
        setDiscountId(e.target.value);
    }

    const handleApplyDiscount = (productId) => {
        setApplyDiscount(productId)
    }

    const handleCancelDiscount = () => {
        setApplyDiscount(null);
        setDiscountId('');
    }


    const handleSubmitDiscount = async (productId) => {
        console.log("base_url: ",BASE_URL)
        if (/^\d*$/.test(discountId)) {
            const productDiscountId = {
                productId : productId,
                discountId : discountId
            }
            setApplyDiscountError(null);
            setApplyDiscountLoading(true);
            console.log("productdiscountId: ", productDiscountId)
            try{
                const response = await axios.post(`${BASE_URL}/api/product-discount/`,productDiscountId,{
                    headers : {
                        Authorization : "Bearer " + authData.token
                    }
                });
                if(response && response.status === 200){
                    setProductChangeFlag(Date.now());
                    toast.success("Discount applied successfully",{
                        position : "top-center"
                    })
                    setDiscountId('')
                    setApplyDiscount(null);
                    setApplyDiscountLoading(false);
                    setApplyDiscountError(null);
                }else if(response.status === 404){
                    setDiscountId('')
                    setApplyDiscountLoading(false);
                    toast.error(response.data,{
                        position : "top-center"
                    });
                }
            }catch(error){
                setDiscountId('')
                console.error(error);
                setApplyDiscountLoading(false);
                toast.error("Something went wrong, try again later",{
                    position : 'top-center'
                });
            }
        } else {
            toast.error("Enter valid discount_id",{
                position: "top-center"
            })
        }
    }

    const handleChangeDiscount = async (productId) => {
        setChangeDiscount(productId);
    }

    const handleChangeDiscountId = async (e) => {
        setChangedDiscountId(e.target.value);
    }

    const handleCancelChangeDiscount = (para) =>{
        setChangeDiscount(null);
        setChangedDiscountId('');
    }

    const handleSubmitChangeDiscount = async (productId) =>{
        if (/^\d*$/.test(changedDiscountId)) {
            const productDiscountId = {
                productId : productId,
                discountId : changedDiscountId
            }
        try{
            setDiscountChangeLoading(true);
            const response = await axios.put(`${BASE_URL}/api/product-discount/`,productDiscountId,{
                headers : {
                    Authorization : `Bearer ${authData.token}`
                }
            })
            if(response && response.status === 200){
                setDiscountChangeFlag(Date.now());
                setDiscountChangeLoading(false);
                toast.success("Discount changed successfully",{
                    position : "top-center"
                })
                setChangeDiscount(null);
                setChangedDiscountId('');
            }else{
                setDiscountChangeLoading(false);
                toast.error("Internal Server Error",{
                    position : "top-center"
                })
                setChangedDiscountId('');
            }
        }catch(error){
            setDiscountChangeLoading(false);
            console.error(error);
            toast.error("Something went wrong", {
                position : "top-center"
            })
            setChangedDiscountId('');
        }
    }else if(changedDiscountId === 'none'){
        setDeleteDiscountLoading(true);
        try{
            const response = await axios.delete(`${BASE_URL}/api/product-discount/${productId}`,{
                headers : {
                    Authorization : `Bearer ${authData.token}`
                }
            });
            if(response && response.status === 200){
                toast.success("Discount removed successfully",{
                    position : "top-center"
                });
                setDeleteDiscountLoading(false);
                setChangedDiscountId('');
                setChangeDiscount(null);
                setDeleteDiscountFlag(Date.now());
            }else if(response.status === 404){
                setDeleteDiscountLoading(false);
                toast.error(Response.data,{
                    position : "top-center"
                })
                setChangedDiscountId('');
            }
        }catch(error){
            console.error(error);
            setDeleteDiscountLoading(false);
            toast.error("Something went wrong",{
                position : "top-center"
            });
            setChangedDiscountId('');
        }

    }else{
        toast.error("Enter valid discountId",{
            position : "top-center"
        })
    }
}

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error fetching products: {error.message}</div>;

    return (
        <>
        <ToastContainer />
        <div className="admin-product-list">
            <span className='caption'>Product List</span>
            <div className="table-wrapper">
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Product Name</th>
                            <th>URL Slug</th>
                            <th>Category ID</th>
                            <th>Category Name</th>
                            <th>Description</th>
                            <th>Base Price</th>
                            <th>Stock Quantity</th>
                            <th>Image URL</th>
                            <th>Discount</th>
                            <th>Featured</th>
                            <th>Status</th>
                            <th>Discounted Price</th>
                            {applyDiscount ? (<th>Apply Discount</th>) 
                            : changeDiscount ? (<th>Change Discount</th>)
                            : null
                            } 
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products && products.map(product => (
                            <tr key={product.productId}>
                                <td>{product.productId}</td>
                                <td>{editProduct && editProduct.productId === product.productId ? (
                                    <input type="text" name="productName" value={editProduct.productName} onChange={handleChange} />
                                ) : (
                                    product.productName
                                )}</td>
                                <td>{editProduct && editProduct.productId === product.productId ? (
                                    <input type="text" name="urlSlug" value={editProduct.urlSlug} onChange={handleChange} />
                                ) : (
                                    product.urlSlug
                                )}</td>
                                <td>{editProduct && editProduct.productId === product.productId ? (
                                    <input type="number" name="categoryId" value={editProduct.categoryId} onChange={handleChange} />
                                ) : (
                                    product.categoryId
                                )}</td>
                                <td>
                                    {product.categoryName}
                                </td>
                                <td>{editProduct && editProduct.productId === product.productId ? (
                                    <textarea name="description" value={editProduct.description} onChange={handleChange} />
                                ) : (
                                    product.description
                                )}</td>
                                <td>{editProduct && editProduct.productId === product.productId ? (
                                    <input type="number" step="0.01" name="price" value={editProduct.price} onChange={handleChange} />
                                ) : (
                                    product.price
                                )}</td>
                                <td>{editProduct && editProduct.productId === product.productId ? (
                                    <input type="number" name="stockQuantity" value={editProduct.stockQuantity} onChange={handleChange} />
                                ) : (
                                    product.stockQuantity
                                )}</td>
                                <td className="ellipsis">{editProduct && editProduct.productId === product.productId ? (
                                    <input type="text" name="imageUrl" value={editProduct.imageUrl} onChange={handleChange} />
                                ) : (
                                    product.imageUrl
                                )}</td>
                                <td>
                                    {product.discountType === 'Percentage' ? (`${product.discountPercentage}%`) :
                                    product.discountType === 'Fixed' ? (`${product.discountValue}Rs`) : "none"}
                                </td>
                                <td>{editProduct && editProduct.productId === product.productId ? (
                                    <input type="checkbox" name="featured" checked={editProduct.featured} onChange={handleChange} />
                                ) : (
                                    product.featured ? 'Yes' : 'No'
                                )}</td>
                                <td>{editProduct && editProduct.productId === product.productId ? (
                                    <select name="status" value={editProduct.status} onChange={handleChange}>
                                        <option value="active">active</option>
                                        <option value="inactive">inactive</option>
                                    </select>
                                ) : (
                                    product.status
                                )}</td>
                                <td>
                                    {product.discountType !== null ? (product.discountedPrice) 
                                    : "Same as base" }
                                </td>
                                
                                {applyDiscount !== null &&  applyDiscount === product.productId ?   (<td><input type='text' name='discountId' value={discountId} placeholder='Enter Discount_id' onChange={handleDiscountChange}></input></td>)
                                : applyDiscount !== null  ? <td>-</td> 
                                : changeDiscount !== null && changeDiscount === product.productId ? (<td><input type='text' placeholder='Enter discountId or none(delete)' value={changedDiscountId} onChange={handleChangeDiscountId}></input></td>) 
                                : changeDiscount !== null ? <td>-</td> : null
                                }
                                <td>
                                    {applyDiscount !== null && applyDiscount === product.productId ? (
                                        <div>
                                        <button onClick={() => handleSubmitDiscount(product.productId)}>{loading ? ("Loading..") : ("Apply")}</button>
                                        <button onClick={() => handleCancelDiscount(null)}>Cancel</button>
                                        </div>
                                    ) : 
                                    changeDiscount !== null && changeDiscount === product.productId ? (
                                        <div>
                                        <button onClick={() => handleSubmitChangeDiscount(product.productId)}>{discountChangeLoading ? ("Loading..") : ("Change")}</button>
                                        <button onClick={() => handleCancelChangeDiscount(null)}>Cancel</button>
                                        </div>
                                    )  :  
                                    editProduct && editProduct.productId === product.productId ? (
                                        <div>
                                            <button onClick={() => handleUpdate(editProduct.productId, editProduct)}>Save</button>
                                            <button onClick={handleCancelEdit}>Cancel</button>
                                        </div>
                                    ) : (
                                        <div className='action-btns-box'>
                                            <button onClick={() => handleEdit(product)}>Edit Product</button>
                                            {product.discountType !== null ? (<button onClick={() => handleChangeDiscount(product.productId)}>Change Discount</button>) : (<button onClick={() => handleApplyDiscount(product.productId)}>Apply Discount</button>)}
                                            <button onClick={() => handleDelete(product.productId,product.productName)}>Delete Product</button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {message && <div className="message">{message}</div>}
        </div>
        </>
    );
};

export default Test;
