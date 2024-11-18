import './SalesList.css';
import React, { useEffect, useState } from 'react';
import { Card,Modal } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SalesList() {
  const [sales, setSales] = useState([]);
  const navegate = useNavigate();
  const [deleteSaleId, setDeleteSaleId] = useState(null);
  const [open, setOpen] = useState(false);
  const showModal = sale_id => {
    setDeleteSaleId(sale_id);
    setOpen(true);
  };
  const hideModal = () => {
    setDeleteSaleId(null);
    setOpen(false);
  };

  const onDelete = async sale_id => {
    const response = await axios.delete(
      `http://localhost:7000/delete/sale/${sale_id}`
    );
    setOpen(false);
  };

  const getSales = async () => {
    const response = await axios.get('http://localhost:7000/sales');
    setSales(response.data);
  };
  useEffect(() => {
    getSales();
  }, [sales]);

  return (
    <div className="card-list">
      {sales.map(item => (
        <Card className="card" key={item.sale_id}>
          <div className="cardhead"
          onClick={() => {
            navegate(`/get/sale/${item.sale_id}`);
          }}
          >
            <h2>{item.sale_name}</h2>
          </div>
          <div
            className="editBtn"
            onClick={() => {
              navegate(`/patch/sale/${item.sale_id}`);
            }}
          >
            <i className="fa-solid fa-pen-to-square fa-xl"></i>
          </div>

          <div
            className="deleteBtn"
            onClick={() => {
              showModal(item.sale_id);
            }}
          >
            <i className="fa-solid fa-trash-can fa-xl"></i>
          </div>
        </Card>
      ))}

      <Modal
        className="modalDiv"
        title={
          <i
            className="fa-solid fa-circle-question fa-xl"
            style={{ color: 'red' }}
          ></i>
        }
        open={open}
        onOk={() => {
          onDelete(deleteSaleId);
        }}
        onCancel={hideModal}
        okText="YES"
        cancelText="CANCEL"
        width={'400px'}
        style={{ color: 'red' }}
      >
        <p>Are you want to Delete this item</p>
      </Modal>
    </div>
  );
}

export default SalesList;
