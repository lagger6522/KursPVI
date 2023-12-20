import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import { Layout } from './components/Layout';
import ProductPage from './components/ProductPage';
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

                    <Route path="/components/ProductPage/:subcategoryId" element={<ProductPage />} />
                </Routes>
            </Layout>
        ); 
        }
        
    }
}
