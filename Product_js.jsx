import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { addCart, delCart } from "../redux/action";


import "./Product_js.css";

const Product_js = () => {
  // 🍀0310-0240 useParams,
  const { id } = useParams();

  // 🥒0310-0230, fetch api
  const [data_product, setData_product] = useState([]);

  const [loading, setLoading] = useState(false);

  // 🍀0310-0230, fetch api,
  /* 🍄
      10. product.jsx의 fetch code 복붙
      15. const {id} =useParams()
      20. api address `` 으로 바꿈, 
      30. api address: ~~~~/${id} 추가    🦄
    */
  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);

      // 🥒0310-0240
      const result = await axios(`https://fakestoreapi.com/products/${id}`);

      console.log(result.data);

      setData_product(result.data);

      setLoading(false);
    };
    fetchItems();
  }, []);



  // 🥒js0310-0440. redux 
  
  const dispatch = useDispatch();

  // const addProduct = (p_product)=>{
  //   dispatch(addCart(p_product))
  // }


  const Loading = () => {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  };

  // 🍀0310-0255, each product rendering 👉Products.jsx
  /* 🦄
        return (~~) 빼먹지말고 꼭 넣을것
       */
  const ShowProduct = () => {
    return (
      <div className="items-wrap">
        <div className="items" key={data_product.id}>
          <div className="item">
            <div className="img-parent">
              <img src={data_product.image} alt={data_product.title} />
            </div>
          </div>
          <div className="item">
            <div className="title">Name: {data_product.title}</div>
            <div className="price">$ {data_product.price}</div>

            <div className="description">Desc: {data_product.description}</div>
          </div>
        </div>

        {/* 🥒js0310-0440. redux  */}
        <button className="myBtn" onClick={()=>dispatch(addCart(data_product))} >add to cart</button>
      </div>
    );
  };

  return (
    <div className="product_js">{loading ? <Loading /> : <ShowProduct />}</div>
  );
};

export default Product_js;
