import calc from './calc.js';
import {nf} from './intl.js';

const closeModal = () => {
  const overlay = document.querySelector('.overlay');
  overlay.classList.remove('active');
};
const openModal = () => {
  const overlay = document.querySelector('.overlay');
  overlay.classList.add('active');
};

const formInit = () => {
  const form = document.querySelector('.modal__form');
  const overlay = document.querySelector('.overlay');
  form.price.value = 0;
  form.count.value = 0;
  form.total.value = nf.format(0);
  form.vendorCodeId = calc.getVendorCode();
  overlay.querySelector('.vendor-code__id')
      .textContent = form.vendorCodeId;
};

const getOrderNum = (table) => {
  let result = 0;
  // const table = document.querySelector('.table__body');
  const lastRow = table.lastElementChild;
  if (lastRow) {
    result = +lastRow.querySelector('.table__cell').textContent;
  }
  return result + 1;
};

const createRow = (
    {id, title, category, units, count, price, discont}, num) => {
  const discountedPrice = discont ? (price - price * discont / 100) : price;
  const productTotal = discountedPrice * count;
  // console.log(id, title, category, discountedPrice, count, productTotal);
  const result = `
    <tr>
        <td class="table__cell">${num}</td>
        <td class="table__cell table__cell_left table__cell_name" data-id="${id}">
        <span class="table__cell-id">id: ${id}</span>
        ${title}</td>
        <td class="table__cell table__cell_left">${category}</td>
        <td class="table__cell">${units}</td>
        <td class="table__cell">${count}</td>
        <td class="table__cell">${discountedPrice}</td>
        <td class="table__cell">${productTotal}</td>
        <td class="table__cell table__cell_btn-wrapper">
        <button class="table__btn table__btn_pic"></button>
        <button class="table__btn table__btn_edit"></button>
        <button class="table__btn table__btn_del"></button>
        </td>
    </tr>
    `;
  return result;
};

const addProduct = (table, product) => {
  table.insertAdjacentHTML('beforeend', createRow(product, getOrderNum(table)));
};

const removeProduct = (tr) => {
  tr.remove();
};

const showTotalPrice = (goods) => {
  const totalPrice = document.querySelector('.cms__total-price');
  totalPrice.textContent = nf.format(calc.goodsTotal(goods));
};

const renderGoods = (goods) => {
  const tableGoods = document.querySelector('.table__body');
  goods.forEach(element => {
    tableGoods.insertAdjacentHTML('beforeend',
        createRow(element, getOrderNum(tableGoods)));
  });
  showTotalPrice(goods);
};

const numberingRows = (table) => {
  let i = 0;
  const rows = table.querySelectorAll('tr');
  rows.forEach(row => {
    const td = row.querySelector('.table__cell');
    td.textContent = ++i;
  });
};

export {
  closeModal,
  openModal,
  formInit,
  addProduct,
  removeProduct,
  showTotalPrice,
  renderGoods,
  numberingRows,
};
