import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import { Layout } from './components/Layout';
import ProductPage from './components/ProductPage';
import { AMLayout } from './components/administrator/AMLayout';
import AdminPage from "./components/administrator/AdminPage";

import './custom.css';

export default class App extends Component {
    static displayName = App.name;

    getPath() {
        return window.location.href.replace(window.location.protocol + "//" + window.location.host, "");
    }
    
    render() {
        if (this.getPath() === "/administrator/AdminPage") {
            return <AMLayout><AdminPage /></AMLayout>
        //if (this.getPath() === "/manager/ManagerPage") {
        //    return <AMLayout><ManagerPage /></AMLayout>
        } else {
           return (
            <Layout>
                <Routes>
                    {AppRoutes.map((route, index) => {
                        const { element, ...rest } = route;
                        return <Route key={index} {...rest} element={element} />;
                    })}

                    <Route path="/components/ProductPage/:subcategoryId" element={<ProductPage />} />
                </Routes>
            </Layout>
        ); 
        }
        
    }
}
