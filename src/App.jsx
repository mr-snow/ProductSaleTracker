import React from 'react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Routes, Route, NavLink } from 'react-router-dom';
import Home from './pages/Home/Home';
import SalesList from './pages/SalesList/SalesList';
import './App.css';
import ProductAdd from './pages/ProductAdd/ProductAdd';
import SaleAdd from './pages/SaleAdd/SaleAdd';
import ProductDetails from './pages/ProductDetials/ProductDetails';
import SalesDetails from './pages/SalesDetails/Sales';

const { Header, Content, Footer } = Layout;

const App = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <h1 className="demo-logo">ProductSaletracker</h1>

        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          style={{
            flex: 1,
            minWidth: 0,
            fontSize: '17px',
            marginLeft: '50px',
          }}
        >
          <Menu.Item key="1">
            <NavLink to="/" element={<SalesList />}>
              Products
            </NavLink>
          </Menu.Item>
          <Menu.Item key="2">
            <NavLink to="/sales" element={<SalesList />}>
              Sale
            </NavLink>
          </Menu.Item>
          <Menu.Item key="3">
            <NavLink to="/post/product" element={<ProductAdd />}>
              Add Product
            </NavLink>
          </Menu.Item>
          <Menu.Item key="4">
            <NavLink to="/post/sale" element={<SaleAdd />}>
              Add Sale
            </NavLink>
          </Menu.Item>
        </Menu>
      </Header>

      <Content
        style={{
          padding: '0 48px',
        }}
      >
        <div
          style={{
            background: colorBgContainer,
            minHeight: 420,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sales" element={<SalesList />} />
            <Route path="/post/product" element={<ProductAdd />} />
            <Route path="/post/sale" element={<SaleAdd />} />

            <Route path="/patch/product/:id" element={<ProductAdd />} />
            <Route path="/patch/sale/:sale_id" element={<SaleAdd />} />
            <Route path="/get/product/:id" element={<ProductDetails />} />
            <Route path="/get/sale/:sale_id" element={<SalesDetails />} />
          </Routes>
        </div>
      </Content>

      <Footer style={{ textAlign: 'center' }}>
        productSale ©{new Date().getFullYear()} Created by productSale@gmail
      </Footer>
    </Layout>
  );
};
export default App;
