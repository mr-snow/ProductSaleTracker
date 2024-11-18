import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './productstyle.css';

import {Chart as ChartJS,CategoryScale,LinearScale,
  BarElement,Title,Tooltip,Legend,} from 'chart.js';
import { Bar } from 'react-chartjs-2';
ChartJS.register(CategoryScale,LinearScale,
  BarElement,Title,Tooltip,Legend);



function ProductDetails() {
  const [product, setProduct] = useState({
    product_name: '',
    price: '',
    category: '',
  });
  const [sales, setSales] = useState([]);
  const [resultObject, setResultObject] = useState([]);

  const { id } = useParams();

  const onGetProduct = async () => {
    const response = await axios.get(`http://localhost:7000/product/${id}`);
    const productData = response.data.find(item => item.id == id);
    setProduct(productData);
  };

  const getSales = async () => {
    const response = await axios.get('http://localhost:7000/sales');
    setSales(response.data);
  };

  const setSaleObject = () => {
    const saleArray = sales;
    const saleObject = [];
    for (let i = 0; i < saleArray.length; i++) {
      if (saleArray[i].product_id == product.id) {
        saleObject.push({
          date: saleArray[i].date,
          unit: saleArray[i].sold_unit,
        });
      }
    }
    console.log(saleObject);
    setResultObject(saleObject);
  };

  useEffect(() => {
    setSaleObject();
  }, [sales]);

  useEffect(() => {
    if (id) {
      onGetProduct();
    }
  }, []);

  useEffect(() => {
    getSales();
  }, []);

  return (
    <>
      <div className="template">
        <div className="descBox">
          <div className="inner1Box">
            <h1>product_page</h1>
            <table style={{ width: '200px', textAlign: 'left' }}>
              <tr>
                <td>Product Id</td>
                <td>{product.id}</td>
              </tr>
              <tr>
                <td>Product Name</td>
                <td>{product.product_name}</td>
              </tr>

              <tr>
                <td>Porduct Category</td>
                <td>{product.category}</td>
              </tr>
              <tr>
                <td>Product Price</td>
                <td>{product.price}</td>
              </tr>
            </table>
          </div>
        </div>
        <div className="graphBox">
          <div className="inner2Box">
            <div className="barBox">
              <Bar
                data={{
                  // labels: resultObject.map(sale => sale.date),
                  labels: resultObject
                    .sort((a, b) => new Date(a.date) - new Date(b.date))
                    .map(sale => sale.date),
                  datasets: [
                    {
                      label: 'sales',
                      // data: resultObject.map(sale => sale.unit),
                      data: resultObject
                        .sort((a, b) => new Date(a.date) - new Date(b.date)) 
                        .map(sale => sale.unit), backgroundColor: 'red',
                    },
                  ],
                }}
                options={{  responsive: true,
                  plugins: {
                    legend: {position: 'top'},
                    title: { display: true,text: 'Sales',},
                  },
                  scales: {
                    x: {title: {display: true,text: 'Date', }, },
                    y: {title: {display: true,text: 'Sold Unit',},},
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetails;
