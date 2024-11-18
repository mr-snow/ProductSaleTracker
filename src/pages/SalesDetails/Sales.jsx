import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Sales.css';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function SalesDetails() {
  const [saleData, setSaleData] = useState({});
  const [salesData, setSalesData] = useState([]);

  const [products, setProducts] = useState([]);
  const [resultArray, setReusltArray] = useState([]);

  const { sale_id } = useParams();

  const onGetSale = async () => {
    const response = await axios.get(`http://localhost:7000/sale/${sale_id}`);
    const Data = response.data.find(item => item.sale_id == sale_id);
    setSaleData(Data);
  };

  const onGetSales = async () => {
    const response = await axios.get(`http://localhost:7000/sales`);
    setSalesData(response.data);
  };

  const getProducts = async () => {
    const response = await axios.get('http://localhost:7000/');
    setProducts(response.data);
  };

  const setResult = () => {
    const productArray = products;
    const salesArray = salesData;
    const saleName = saleData.sale_name;
    const result = [];
    for (let i = 0; i < salesArray.length; i++) {
      if (salesArray[i].sale_name === saleName) {
        for (let j = 0; j < productArray.length; j++) {
          if (salesArray[i].product_id === productArray[j].id) {
            result.push({
              product_name: productArray[j].product_name,
              sold_unit: salesArray[i].sold_unit,
              date: salesArray[i].date,
            });
          }
        }
      }
    }
    setReusltArray(result);
  };



  useEffect(() => {
    setResult();
  }, [salesData]);

  useEffect(() => {
    if (sale_id) {
      onGetSale();
    }
    onGetSales();
  }, []);

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <div className="template">
        <div className="descBox">
          <div className="inner1Box">
            <h1>sale page</h1>
            <table style={{ width: '200px', textAlign: 'left' }}>
              <tr>
                <td>Sale Id</td>
                <td>{saleData.sale_id}</td>
              </tr>
              <tr>
                <td>Sale Name</td>
                <td>{saleData.sale_name}</td>
              </tr>
            </table>
          </div>
        </div>
        <div className="graphBox">
          <div className="inner2Box">
            <div className="barBox">

              <Bar
                data={{
                  labels: resultArray.map(item => item.product_name),
                  datasets: [
                    {label: 'Sold Unit',
                      data: resultArray.map(item => item.sold_unit),
                      backgroundColor: 'green', dates: resultArray.map(item => item.date),
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { position: 'top' },
                    title: { display: true, text: 'Products sales' },
                    tooltip: {
                      callbacks: {
                        label: function (context) {
                          const dataset = context.dataset;
                          const index = context.dataIndex;
                          const date = dataset.dates[index];
                          return ` Date: ${date}`; },
                      },},
                  },
                  scales: {
                    x: { title: { display: true, text: 'Products' } },
                    y: { title: { display: true, text: 'Sold Unit' } },
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

export default SalesDetails;
