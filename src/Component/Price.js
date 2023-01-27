import axios from "axios";
import React, { useEffect, useState } from "react";
import MultiRangeSlider from "multi-range-slider-react"
function Price() {
  const [product, setProduct] = useState([]);
  const price = product.map((item) => item.price);
  const [newprice, setNewprice] = useState(7.95);
  const [minValue, set_minValue] = useState(0);
  const [maxValue, set_maxValue] = useState(100);
  const handleInput = (e) => {
    set_minValue(e.minValue);
    set_maxValue(e.maxValue);
  };
  let maxprice = Math.max(...price);
  let minprice = Math.min(...price);
    
  function getProduct() {
    axios
    .get("https://fakestoreapi.com/products")
    .then((res) => setProduct(res.data))
    .catch((err) => console.log(err));
  }
  useEffect(() => {
    getProduct();
  }, []);
  return (
    <div>
      <MultiRangeSlider
      min={0}
			max={100}
			step={1}
			minValue={minValue}
			maxValue={maxValue}
			onInput={(e) => {
				handleInput(e);
			}}
      />
     {minValue}
     {maxValue}<br/>
      {newprice}
      <input
        type="range"
        max={maxprice}
        min={minprice}
        value={newprice}
       onChange={(e)=>setNewprice(e.target.value)}
      />
       <div className="row">
              <div className="col-md-3">
     {
      product.filter((item)=> {
        return item.price >= newprice
       
      }).map((el)=>{
        return(

          <div key={el.id} className="card" style={{width: "18rem"}}>
          <img src={el.image} className="card-img-top" alt="..."/>
          <div className="card-body">
            <h5 className="card-title">{el.title}</h5>
            <p className="card-text">{el.price}</p>
            <a href="#" className="btn btn-primary">Buy Now</a>
          </div>
        </div>   
        )
      })
     }
      </div>
       </div>
              </div>
  );
}

export default Price;
