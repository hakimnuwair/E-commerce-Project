import React from "react";
import "../styles/ScrollButtons.css";
import { useState, useEffect } from "react";
import axios from "axios";
import classes from "../styles/Categories.module.css";
import CategoryItem from "./CategoryItem";
import { Link } from "react-router-dom";
import AllCategories from "./AllCategories";
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export default function Categories() {
  const [categories, setCategories] = useState(null);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [errCategories, setErrCategories] = useState(null);
  const [allCategories, setAllCategories] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoadingCategories(true);
      try {
        const response = await axios.get(`${BASE_URL}/api/category/`);
        if (response.status === 200) {
          setCategories(response.data);
          setLoadingCategories(false);
        } else {
          setErrCategories("Internal Server Error");
          setLoadingCategories(false);
        }
      } catch (error) {
        setErrCategories("Error loading data, try again later");
        setLoadingCategories(false);
      }
    };
    fetchCategories();
  }, []);

  return (
    <>
      <div className={classes.section}>
        <div className={classes.container}>
          <div className={classes.headline}>
            <div className={classes.headerTitle}>Categories</div>
            {categories && categories.length > 4 && (
              (
                <Link onClick={()=>{setAllCategories((prevState) => (!prevState))}}>
                {allCategories ?
                (<>
                <span style={{ marginRight: "8px" }}>Less</span>
                <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 48 48"
                fill="none"
              >
                <circle
                  cx="24"
                  cy="24"
                  r="22"
                  stroke="#007bff"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  d="M28 16l-8 8 8 8"
                  stroke="#007bff"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
                </>)
                :
                (
                  <>
                <span style={{ marginRight: "8px" }}>More Categories</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 48 48"
                  fill="none"
                >
                  <circle
                    cx="24"
                    cy="24"
                    r="22"
                    stroke="#007bff"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    d="M20 16l8 8-8 8"
                    stroke="#007bff"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                </>)
                }
                </Link>      
               )
            )}{" "}
          </div>
          <div
            className={`${
              categories && categories.length < 4
                ? classes.gridLess4
                : classes.categoryGrid
            } `}
          >
            {loadingCategories ? (
              <p>Loading...</p>
            ) : errCategories ? (
              <p>{errCategories}</p>
            ) : (
              <>
                {allCategories ? 
                (categories.map((category) => (
                  <CategoryItem
                    key={category.categoryId}
                    className={classes.categoryGridItem}
                    category={category}
                    />
                ))) 
                : (categories.slice(0, 4).map((category) => (
                  <CategoryItem
                    key={category.categoryId}
                    className={classes.categoryGridItem}
                    category={category}
                  />
                )))}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
