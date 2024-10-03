import React, { useState } from "react"
import classes from "../styles/AddDiscount.module.css"
import { Form, useRouteLoaderData } from "react-router-dom";
import axios from "axios";
import DiscountList from "./DiscountList";
const BASE_URL = process.env.REACT_APP_API_BASE_URL;




export default function AddDiscount({handleDiscountAdded}){
    const authData = useRouteLoaderData('admin');
    const [discountType, setDiscountType] = useState('');
    const [discountName, setDiscountName] = useState('');
    const [discountValue, setDiscountValue] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [file, setFile] = useState(null);
    const [successMsg, setSuccessMsg] = useState(null);
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState(null);

    const handleChange = (e) => {
        setSuccessMsg(null);
        setErr(null);
        const {name , value} = e.target;
        if(name === "discountType"){
            setDiscountType(value);
        }else if(name === "discountName"){
            setDiscountName(value);
        }else if(name === "discountValue"){
            setDiscountValue(value)
        }else if(name === "startDate"){
            setStartDate(value)
        }else if(name === "endDate"){
            setEndDate(value);
        }
    }

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
      };

    const handleSubmit = async (e) =>{        
        e.preventDefault();
        setLoading(true);
        const discount = {
            discountName : discountName,
            discountType : discountType,
            discountValue : discountValue,
            startDate : startDate,
            endDate : endDate,
            file : file
        }
        try{
            const response = await axios.post(`${BASE_URL}/api/discount/`,discount,{
                headers : {
                    "Content-Type": "multipart/form-data",
                    Authorization : "Bearer " + authData.token
                }
            });
            if(response && response.status === 200){
                setSuccessMsg(response.data);
                handleDiscountAdded(Date.now());
                setLoading(false)
                setErr(null)
            }else{
                setLoading(false);
                setErr("Error uploading discount, try again later")
            }
        }catch(error){
            console.error(error);
            setErr("Something went wrong, try again later");
            setLoading(false);
        }
    }

    return(<>
        <div className={classes.section}>
            <div className={classes.container}>
                <Form className={classes.gridContainer3} onSubmit={handleSubmit}>
                    <label>Discount Name</label>
                    <input type="text" name="discountName" value={discountName} onChange={handleChange} required></input>
                    <label>Discount Type</label>
                    <select name="discountType" value={discountType}  onChange={handleChange} required>
                        <option value="" disabled>Select Discount Type</option>
                        <option value="Percentage">Percentage</option>
                        <option value="Fixed">Fixed</option>
                    </select>
                        <label htmlFor="">Discount Value</label>
                        <input type="text"  name="discountValue" value={discountValue} onChange={handleChange} required></input>
                        <label htmlFor="">Start Date</label>
                        <input type="date" name="startDate" value={startDate} onChange={handleChange} required></input>
                        <label htmlFor="">End Date</label>
                        <input type="date" name="endDate" value={endDate} onChange={handleChange} required></input>
                        <label>Upload Image</label>
                        <div className="">
                            <input type="file" id="file" required onChange={handleFileChange}></input>
                        </div>
                        <label>Submit</label>
                        <div className="" style={{display: "flex", flexDirection: "column"}}>
                        <button className="btn btn-primary">{loading ? (<span>Submitting..</span>) : (<span>Submit</span>)}</button>
                        </div>
                </Form>
                <div className={classes.notify}>
                {err !== null ? (<span style={{color: "red"}}>{err}</span>) : successMsg !== null ? (<span style={{color: "green"}}>{successMsg}</span>) : null}
                </div>
            </div>
        </div>
    </>);
}