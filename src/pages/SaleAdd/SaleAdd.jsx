import React, { useEffect } from 'react';
import './SaleAdd.css';
import { Button, Form, Input, Select } from 'antd';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function SaleAdd() {
  const [sale, setSale] = useState({
    product_id: '',
    sale_name: '',
    sold_unit: '',
    date: '',
  });
  const [pID, setPID] = useState([]);

  const onArrID = () => {
    const arrID = [];
    for (let i = 0; i < pID.length; i++) {
      arrID.push({ value: pID[i].id, label: pID[i].product_name });
    }
    return arrID;
  };

  const { sale_id } = useParams();

  const naviage = useNavigate();

  const onSetChange = (e, key) => {
    setSale({ ...sale, [key]: e.target.value });
  };

  const onPostSale = async () => {
    const response = await axios.post('http://localhost:7000/post/sale', sale);
    naviage('/sales');
  };

  const onSubmit = () => {
    if (
      (sale.product_id != '') &
      (sale.sale_name != '') &
      (sale.date != '') &
      (sale.sold_unit != '')
    ) {
      onPostSale();
    } else {
      alert('please enter full details');
    }
  };

  const onGetSale = async () => {
    const response = await axios.get(`http://localhost:7000/sale/${sale_id}`);
    const saleData = response.data.find(item => item.sale_id == sale_id);
    setSale(saleData);
  };

  const onEdit = async () => {
    const response = await axios.patch(
      `http://localhost:7000/patch/sale/${sale_id}`,
      sale
    );
    naviage('/sales');
  };

  const getProduct = async () => {
    const response = await axios.get('http://localhost:7000/');
    setPID(response.data);
  };

  useEffect(() => {
    getProduct();
  }, []);

  useEffect(() => {
    if (sale_id) {
      onGetSale();
    }
  }, [sale_id]);

  return (
    <>
      <div className="formDiv">
        <div className="headtag">
          <h2>
            <u> {sale_id ? 'Edit Sale' : 'Add Sale'}</u>
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
            name="product_id"
            rules={[
              {
                required: true,
                message: 'Please input your product id!',
              },
            ]}
          >
            <Select
              Value={sale.product_id}
              style={{
                width: 200,
              }}
              value={sale_id ? sale.product_id : undefined}
              placeholder={!sale_id ? 'Select a product' : undefined}
              options={onArrID()}
              onChange={value => setSale({ ...sale, product_id: value })}
            />
            {sale_id ? (
              <Form className="item" value={sale.product_id}></Form>
            ) : null}
          </Form.Item>

          <Form.Item
            label="Sale Name"
            name="sale_name"
            rules={[
              {
                required: true,
                message: 'Please input your sale name!',
              },
            ]}
          >
            <Input
              value={sale.sale_name}
              onChange={e => onSetChange(e, 'sale_name')}
            />
            <input
              type="text"
              value={sale.sale_name}
              onChange={e => onSetChange(e, 'sale_name')}
              style={{ display: 'none' }}
            />
          </Form.Item>

          <Form.Item
            label="Sold Unit"
            name="sold_unit"
            rules={[
              { required: true, message: 'Please input your sold unit!' },
            ]}
          >
            <Input
              value={sale.sold_unit}
              onChange={e => onSetChange(e, 'sold_unit')}
            />
            <input
              type="text"
              value={sale.sold_unit}
              onChange={e => onSetChange(e, 'sold_unit')}
              style={{ display: 'none' }}
            />
          </Form.Item>

          <Form.Item
            label="Sold Date"
            name="date"
            rules={[{ required: true, message: 'Please input your date!' }]}
          >
            <Input value={sale.date} onChange={e => onSetChange(e, 'date')} />
            <input
              type="text"
              value={sale.date}
              onChange={e => onSetChange(e, 'date')}
              style={{ display: 'none' }}
            />
          </Form.Item>

          <Form.Item label={null}>
            <Button
              type="primary"
              htmlType="submit"
              onClick={sale_id ? onEdit : onSubmit}
            >
              {sale_id ? 'Edit' : 'Add'}{' '}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}

export default SaleAdd;
