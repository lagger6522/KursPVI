import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import { Layout } from './components/Layout';
import SearchResultPage from './components/SearchResultPage';
import ProductPage from './components/ProductPage';
import OrderFormPage from './components/user/OrderFormPage';
import MyOrdersPage from './components/user/MyOrdersPage';
import ProductDetailsPage from './components/ProductDetailsPage';
import { ALayout } from './components/administrator/ALayout';
import { MLayout } from './components/manager/MLayout';
import AdminPage from "./components/administrator/AdminPage";
import ManagerPage from "./components/manager/ManagerPage";

import './custom.css';

export default class App extends Component {
    static displayName = App.name;

    getPath() {
        return window.location.href.replace(window.location.protocol + "//" + window.location.host, "");
    }

    render() {
        if (this.getPath() === "/administrator/AdminPage")
            return <ALayout><AdminPage /></ALayout>
        if (this.getPath() === "/manager/ManagerPage") {
            return <MLayout><ManagerPage /></MLayout>
        } else {
            return (
                <Layout>
                    <Routes>
                        {AppRoutes.map((route, index) => {
                            const { element, ...rest } = route;
                            return <Route key={index} {...rest} element={element} />;
                        })}
                        <Route path="/my-orders" element={<MyOrdersPage />} />
                        <Route path="/order-form" element={<OrderFormPage />} />
                        <Route path="/search-results" element={<SearchResultPage />} />
                        <Route path="/products/:subcategoryId" element={<ProductPage />} />
                        <Route path="/product-details/:productId" element={<ProductDetailsPage />} /> {/* Новый маршрут */}
                    </Routes>
                </Layout>
            );
        }
    }
}
