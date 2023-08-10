const addGoods = (goods, product) => {
  goods.push({
    'id': product.id,
    'title': product.title,
    'price': product.price,
    'description': product.description,
    'category': product.category,
    'discont': product.discount ? product.discount_count : false,
    'count': product.count,
    'units': product.units,
    'images': {
      'small': 'img/smrtxiaomi11t-m.jpg',
      'big': 'img/smrtxiaomi11t-b.jpg',
    },
  });
};

const deleteGoodsById = (goods, id) => {
  const index = goods.findIndex(el => el['id'] === +id);
  if (index !== -1) goods.splice(index, 1);
};

export default {
  addGoods,
  deleteGoodsById,
};
