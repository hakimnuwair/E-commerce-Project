import React, { useEffect, useRef, useState } from "react";
import classes from "../styles/CategoryList.module.css";
import axios from "axios";
import { useRouteLoaderData } from "react-router-dom";
import CategoryAdd from "./CategoryAdd";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export default function CategoryList() {
  const [category, setCategory] = useState([]);
  const authData = useRouteLoaderData('admin')
  const [userError, setUserError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editCategory, setEditCategory] = useState(null);
  const [categoryName, setCategoryName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [editLoading, setEditLoading] = useState(false);
  const [editErr, setEditErr] = useState(null);
  const [productUpdateFlag, setProductUpdateFlag] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);


  useEffect(()=>{
    const fetchCategory = async () => {
        try{
            const response = await axios.get(`${BASE_URL}/api/category/`,{
                headers : {
                    'Authorization' : "Bearer " + authData.token
                }
            })
            if(response && response.status === 200){
                setCategory(response.data);
                setLoading(false);
                setUserError(null);
            }
        }catch(error){
            console.error(error);
            setUserError("Error loading data, Try again later.");
            setLoading(false);
        }
    }
    fetchCategory();
  }, [productUpdateFlag])

  const handleCategoryAdded = (flag) => {
    setProductUpdateFlag(flag);
  }

  const handleEditCategory = (category) =>{
    setEditCategory({...category});
  }

  const handleChange = (e) =>{
    setEditErr(null);
    const {name , value} = e.target;
    setEditCategory(prevState => ({
      ...prevState,
      [name] : value,
    }))
  };

  const handleEditSubmit = async () => {
    if(editCategory === null || editCategory.categoryName === '' || editCategory.categoryImageUrl === ''){
      toast.error("Fill all the inputs");
      return;
    }
    setEditLoading(true);
    try{
      const response = await axios.put(`${BASE_URL}/api/category/`,editCategory,{
        headers : {
          Authorization : `Bearer ${authData.token}`,
        }
      })
      if(response && response.status === 200){
        setEditLoading(false);
        setProductUpdateFlag(Date.now());
        toast.success("Category Edited Successfully");
        setEditCategory(null);
      }
    }catch(error){
      console.error(error);
      setEditLoading(false);
      setEditCategory(null);
      toast.error("something went wrong");
    }
  }

  const handleDeleteCategory = async (deleteCategoryId) => {
    alert("DO YOU WANT TO DELETE " + deleteCategoryId )
    if(deleteCategoryId === null){
      toast.error("Category ID not provided all the inputs");
      return;
    }
    setDeleteLoading(true);
    try{
      const response = await axios.delete(`${BASE_URL}/api/category/${deleteCategoryId}`,{
        headers : {
          Authorization : `Bearer ${authData.token}`,
        }
      })
      if(response && response.status === 200){
        setDeleteLoading(false);
        setProductUpdateFlag(Date.now());
        toast.success("Category Deleted Successfully");
      }
    }catch(error){
      console.error(error);
      setDeleteLoading(false);
      toast.error("something went wrong");
    }
  }


  return (
    <>
    <CategoryAdd handleCategoryAdded={handleCategoryAdded}/>
    <ToastContainer />
    <div className={classes.section}>
      <div className={classes.container}>
        <caption className={classes.caption}>Category List</caption>
        {loading ? <p className="alert">Loading..</p> : userError !== null ? (<p>{userError}</p>) : (
          <div className={classes.tableWrapper}>
            <table className={classes.table}>
            <thead className={classes.tableStyle}>
              <tr>
                 <th>Category ID</th>
                <th>Category Name</th>
                <th>Image_Url</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className={classes.tableStyle}>
              {category.map((category, index) => (
                <tr key={index}>
                  <td>{category.categoryId}</td>
                  {
                  editCategory && editCategory.categoryId === category.categoryId
                  ? (<td><input name="categoryName" value={editCategory.categoryName} onChange={handleChange}></input></td>)
                  : (<td>{category.categoryName}</td>)
                  }
                  {
                  editCategory && editCategory.categoryId === category.categoryId
                  ? (<td><input name="imageUrl" value={editCategory.imageUrl} onChange={handleChange}></input></td>)
                  : (<td className={classes.ellipsis}>{category.imageUrl}</td>)
                  }
                  {
                    editCategory && editCategory.categoryId === category.categoryId
                      ? (<td><button className="btn btn-primary" onClick={handleEditSubmit}>{editLoading ? ("Saving...") : ("Save")}</button>
                           <button className="btn btn-primary" onClick={() => setEditCategory(null)}>Cancel</button>
                    </td>)
                    : (<td className={classes.btns}><button className="btn btn-primary" onClick={() => handleEditCategory(category)}>EDIT</button>
                    <button className="btn btn-primary" onClick={() => handleDeleteCategory(category.categoryId)}>{deleteLoading ? ("DELETING...") : ("DELETE")}</button>
                    </td>)
                  }
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        )}
         {editErr ? (editErr) : null}
      </div>
    </div>
    </>
  );
}
