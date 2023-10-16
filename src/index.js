import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import Dashboard from './component/Dashboard';
import Login from './component/Login';
import ProductManagement from './component/ProductManagement';
import reportWebVitals from './reportWebVitals';
import WarehouseHistory from './component/WarehouseHistory';
import PurchaseOrder from './component/PurchaseOrder';
import ErrorPage from './component/ErrorPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
    erroeElement: <ErrorPage />,
  },
  {
    path: '/Home/Dashboard',
    element: <Dashboard />,
    erroeElement: <ErrorPage />,
  },
  {
    path: '/Home/ProductManagement',
    element: <ProductManagement />,
    erroeElement: <ErrorPage />,
  },
  {
    path: '/Home/WarehouseHistory',
    element: <WarehouseHistory />,
    erroeElement: <ErrorPage />,
  },
  {
    path: '/Home/PurchaseOrder',
    element: <PurchaseOrder />,
    erroeElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
