import React, { useEffect, useState } from 'react';
import './Home.css';
import { Card, Modal } from 'antd';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

function Home() {
  const [products, setProducts] = useState([]);
  const [deleteId, setDeleteId] = useState(null);

  const [open, setOpen] = useState(false);
  const showModal = id => {
    setDeleteId(id);
    setOpen(true);
  };
  const hideModal = () => {
    setDeleteId('');
    setOpen(false);
  };

  const onDelete = async id => {
    const response = await axios.delete(
      `http://localhost:7000/delete/product/${id}`
    );
    setOpen(false);
  };

  const getProduct = async () => {
    const response = await axios.get('http://localhost:7000/');
    setProducts(response.data);
  };

  const navegate = useNavigate();

  useEffect(() => {
    getProduct();
  }, [products]);

  return (
    <>
      <div className="card-list">
        {products.map(item => (
          <Card className="card1" key={item.id}>
            <div
              className="cardhead"
              onClick={() => {
                navegate(`/get/product/${item.id}`);
              }}
            >
              <h2>{item.product_name}</h2>
            </div>
            <div
              className="editBtn"
              onClick={() => {
                navegate(`/patch/product/${item.id}`);
              }}
            >
              <i className="fa-solid fa-pen-to-square fa-xl"></i>
            </div>

            <div
              className="deleteBtn"
              onClick={() => {
                showModal(item.id);
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
            onDelete(deleteId);
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
    </>
  );
}

export default Home;
