import server from '../constant/ApiConfig';

const getDashBoardStats = (data) => {
  return server.post('merchant/dashboard', data);
};

const getWareHouseHistory = (data) => {
  return server.post('merchant/get_warehouse_history', data);
};

const getManagingProduct = (data) => {
  return server.post('merchant/manage_product', data);
};

const getMerchantOrders = (data) => {
  return server.post('merchant/get_merchant_orders', data);
};

const addOneNewProduct = (data) => {
  return server.post('merchant/add_stock_product', data);
};

const updateStatusOfOrder = (data) => {
  return server.post('merchant/update_packed_order', data);
};

const delProduct = (data) => {
  return server.post('merchant/del_password', data);
};

export default {
  getDashBoardStats,
  getWareHouseHistory,
  getManagingProduct,
  getMerchantOrders,
  addOneNewProduct,
  updateStatusOfOrder,
  delProduct,
};
