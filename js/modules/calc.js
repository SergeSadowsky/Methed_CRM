import {nf} from './intl.js';

const getVendorCode = () =>
  Math.floor(10000000000000 + Math.random() * 90000000000000);

const formTotal = (form) => {
  let total = +form.count.value * +form.price.value;
  if (!form.discount_count.disabled) {
    total -= total * (+form.discount_count.value) / 100;
  }
  total = Number.isNaN(total) ? 0 : total;
  form.total.textContent = `${nf.format(total)}`;
};

const goodsTotal = (obj) => obj.reduce((acc, item) => {
  let sum = item.price * item.count;
  if (item.discont) sum -= sum * item.discont / 100;
  // console.log(sum);
  return acc + sum;
}, 0);

export default {
  getVendorCode,
  formTotal,
  goodsTotal,
};
