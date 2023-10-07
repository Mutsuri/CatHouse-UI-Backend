import server from '../constant/ApiConfig';

const getDashBoardStats = (data) => {
  return server.post('merchant/dashboard', data);
};

const getWareHouseHistory = (data) => {
  return server.post('merchant/get_warehouse_history', data);
};

const getMerchantOrders = (data) => {
  return server.post('merchant/get_merchant_orders', data);
};

const addOneNewProduct = (data) => {
  return server.post('merchant/add_stock_product', data);
};

export default {
  getDashBoardStats,
  getWareHouseHistory,
  getMerchantOrders,
  addOneNewProduct,
};
