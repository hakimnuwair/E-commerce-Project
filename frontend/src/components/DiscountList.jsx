import React, { useEffect, useRef, useState } from "react";
import classes from "../styles/DiscountList.module.css";
import axios from "axios";
import { useRouteLoaderData } from "react-router-dom";
import CategoryAdd from "./CategoryAdd";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddDiscount from "./AddDiscount";
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export default function DiscountList() {
  const [discount, setDiscount] = useState([]);
  const authData = useRouteLoaderData('admin')
  const [discountError, setDiscountError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editDiscount, setEditDiscount] = useState(null);
  const [discountName, setDiscountNmae] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [editLoading, setEditLoading] = useState(false);
  const [editErr, setEditErr] = useState(null);
  const [discountUpdateFlag, setDiscountUpdateFlag] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);


  useEffect(()=>{
    const fetchDiscount = async () => {
        try{
            const response = await axios.get(`${BASE_URL}/api/discount/`,{
                headers : {
                    'Authorization' : "Bearer " + authData.token
                }
            })
            if(response && response.status === 200){
                console.log("response disocunts: " , response);
                setDiscount(response.data);
                setLoading(false);
                setDiscountError(null);
            }
        }catch(error){
            console.error(error);
            setDiscountError("Error loading data, Try again later.");
            setLoading(false);
        }
    }
    fetchDiscount();
  }, [discountUpdateFlag])

  const handleDiscountAdded = (flag) => {
    setDiscountUpdateFlag(flag);
  }

  const handleEditDiscount = (discount) =>{
    setEditDiscount({...discount});
  }

  const handleChange = (e) =>{
    setEditErr(null);
    const {name , value} = e.target;
    setEditDiscount(prevState => ({
      ...prevState,
      [name] : value,
    }))
  };

  const handleEditSubmit = async () => {
    console.log("edit discount: ", editDiscount)
    if(editDiscount === null || editDiscount.discountName === '' || editDiscount.discountType === '' || editDiscount.discountValue === ''
        || editDiscount.startDate === '' || editDiscount.endDate === '' || editDiscount.imageUrl === ''
        || editDiscount.imageUrl === null
    ){
      toast.error("Fill all the inputs");
      return;
    }
    setEditLoading(true);
    try{
      const response = await axios.put(`${BASE_URL}/api/discount/`,editDiscount,{
        headers : {
          Authorization : `Bearer ${authData.token}`,
        }
      })
      if(response && response.status === 200){
        setEditLoading(false);
        setDiscountUpdateFlag(Date.now());
        toast.success("Discount Edited Successfully");
        setEditDiscount(null);
      }
    }catch(error){
      console.error(error);
      setEditLoading(false);
      setEditDiscount(null);
      toast.error("something went wrong");
    }
  }

  const handleDeleteDiscount = async (deleteDiscountId) => {
    alert("DO YOU WANT TO DELETE " +deleteDiscountId )
    if(deleteDiscountId === null){
      toast.error("Discount ID not provided all the inputs");
      return;
    }
    setDeleteLoading(true);
    try{
      const response = await axios.delete(`${BASE_URL}/api/discount/${deleteDiscountId}`,{
        headers : {
          Authorization : `Bearer ${authData.token}`,
        }
      })
      if(response && response.status === 200){
        setDeleteLoading(false);
        setDiscountUpdateFlag(Date.now());
        toast.success("Discount Deleted Successfully");
      }
    }catch(error){
      console.error(error);
      setDeleteLoading(false);
      toast.error("something went wrong");
    }
  }


  return (
    <>
    <ToastContainer />
    <AddDiscount handleDiscountAdded={handleDiscountAdded} />
    <div className={classes.section}>
      <div className={classes.container}>
        {loading ? <p className="alert">Loading..</p> : discountError !== null ? (<p>{discountError}</p>) : (
          <>
          <span className={classes.caption}>Discount List</span>
          <div className="table-wrapper">
            <table className={classes.table}>
            
            <thead className={classes.tableStyle}>
              <tr>
                 <th>Discount ID</th>
                <th>Discount Name</th>
                <th>Discount Type</th>
                <th>Discount Value</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Image_Url</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className={classes.tableStyle}>
              {discount.map((discount, index) => (
                <tr key={index}>
                  <td>{discount.discountId}</td>
                  {
                  editDiscount && editDiscount.discountId === discount.discountId
                  ? (<td><input name="discountName" value={editDiscount.discountName} onChange={handleChange}></input></td>)
                  : (<td>{discount.discountName}</td>)
                  }
                  {
                  editDiscount && editDiscount.discountId === discount.discountId
                  ? (<td><input name="discountType" value={editDiscount.discountType} onChange={handleChange} placeholder="only Percentage/Fixed"></input></td>)
                  : (<td>{discount.discountType}</td>)
                  }
                  {
                  editDiscount && editDiscount.discountId === discount.discountId
                  ? (<td><input name="discountValue" value={editDiscount.discountValue} onChange={handleChange}></input></td>)
                  : (<td>{discount.discountValue}</td>)
                  }
                  {
                  editDiscount && editDiscount.discountId === discount.discountId
                  ? (<td><input type="date" name="startDate" value={editDiscount.startDate} onChange={handleChange}></input></td>)
                  : (<td>{discount.startDate}</td>)
                  }
                  {
                  editDiscount && editDiscount.discountId === discount.discountId
                  ? (<td><input type="date" name="endDate" value={editDiscount.endDate} onChange={handleChange}></input></td>)
                  : (<td>{discount.endDate}</td>)
                  }
                  {
                  editDiscount && editDiscount.discountId === discount.discountId
                  ? (<td className={classes.ellipsis}><input type="text" name="imageUrl" value={editDiscount.imageUrl} onChange={handleChange}></input></td>)
                  : (<td className={classes.ellipsis}>{discount.imageUrl}</td>)
                  }
                  {
                  editDiscount && editDiscount.discountId === discount.discountId
                  ? (<td><button className="btn btn-primary" onClick={handleEditSubmit}>{editLoading ? ("Saving...") : ("Save")}</button>
                           <button className="btn btn-primary" onClick={() => setEditDiscount(null)}>Cancel</button>
                    </td>)
                    : (<td><button className="btn btn-primary" onClick={() => handleEditDiscount(discount)}>EDIT</button>
                    <button className="btn btn-primary" onClick={() => handleDeleteDiscount(discount.discountId)}>{deleteLoading ? ("DELETING...") : ("DELETE")}</button>
                    </td>)
                  }
                </tr>
              ))}
            </tbody>
          </table>
          </div>
          </>)}
         {editErr ? (editErr) : null}
      </div>
    </div>
    </>
  );
}
