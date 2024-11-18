import React, { useEffect } from 'react';
import './ProductAdd.css';
import { Button, Form, Input } from 'antd';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function ProductAdd() {
  const [product, setProduct] = useState({
    product_name: '',
    price: '',
    category: '',
  });

  const { id } = useParams();

  const naviage = useNavigate();

  const onSetChange = (e, key) => {
    setProduct({ ...product, [key]: e.target.value });
  };

  const onPostProduct = async () => {
    const response = await axios.post(
      'http://localhost:7000/post/product',
      product
    );
    naviage('/');
  };

  const onSubmit = () => {
    if (
      (product.product_name != '') &
      (product.category != '') &
      (product.price != '')
    ) {
      onPostProduct();
    } else {
      alert('please enter full details');
    }
  };

  const onGetProduct = async () => {
    const response = await axios.get(`http://localhost:7000/product/${id}`);
    const productData = response.data.find(item => item.id == id);
    setProduct(productData);
  };

  const onEdit = async () => {
    const response = await axios.patch(
      `http://localhost:7000/patch/product/${id}`,
      product
    );
    naviage('/');
  };

  useEffect(() => {
    if (id) {
      onGetProduct();
    }
  }, [id]);

  return (
    <>
      <div className="formDiv">
        <div className="headtag">
          <h2>
            <u> {id ? 'Edit Product' : 'Add Product'}</u>
          </h2>
        </div>

        <Form
          name="basic"
          labelCol={{
            span: 12,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 800,
            minWidth: 600,
          }}
          autoComplete="off"
        >
          <Form.Item
            label="Product Name"
            name="product_name"
            rules={[
              {
                required: true,
                message: 'Please input your product name!',
              },
            ]}
          >
            <Input
              value={product.product_name}
              onChange={e => onSetChange(e, 'product_name')}
            />
            <input
              type="text"
              value={product.product_name}
              onChange={e => onSetChange(e, 'product_name')}
              style={{ display: 'none' }}
            />
          </Form.Item>

          <Form.Item
            label="Product Category"
            name="category"
            rules={[
              {
                required: true,
                message: 'Please input your product category!',
              },
            ]}
          >
            <Input
              value={product.category}
              onChange={e => onSetChange(e, 'category')}
            />
            <input
              type="text"
              value={product.category}
              onChange={e => onSetChange(e, 'category')}
              style={{ display: 'none' }}
            />
          </Form.Item>

          <Form.Item
            label="Product Price" name="price"
            rules={[
              {required: true,message: 'Please input your price!', },
            ]}>
            <Input
              value={product.price} onChange={e => onSetChange(e, 'price')} />
            <input
              type="text"  value={product.price}
              onChange={e => onSetChange(e, 'category')}style={{ display: 'none' }}/>
          </Form.Item>
          <Form.Item label={null}>
            <Button
              type="primary" htmlType="submit" onClick={id ? onEdit : onSubmit} >
              {id ? 'Edit' : 'Add'} </Button>
          </Form.Item>
        </Form>

        
      </div>
    </>
  );
}

export default ProductAdd;
