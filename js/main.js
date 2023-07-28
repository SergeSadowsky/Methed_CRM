'use strict';

const modalTitle = document.querySelector('.modal__title');
const modalForm = document.querySelector('.modal__form');
const modalCheckBox = document.querySelector('.modal__checkbox');
const modalCheckBoxText = document.querySelector('.modal__input_discount');

const overlay = document.querySelector('.overlay')
overlay.classList.remove('active');

const getOrderNum = () => {
  let result = 0;
  const table = document.querySelector('.table__body');    
  const lastRow = table.lastElementChild;
  if(lastRow){
    result = +lastRow.querySelector('.table__cell').textContent;
  };
  return result + 1;
};

const createRow = (product) => {
  const num = getOrderNum();
  const productTotal = product.price * product.count;
  
  const result = `
    <tr>
        <td class="table__cell">${num}</td>
        <td class="table__cell table__cell_left table__cell_name" data-id="${product.id}">
        <span class="table__cell-id">id: ${product.id}</span>
        ${product.title}</td>
        <td class="table__cell table__cell_left">${product.category}</td>
        <td class="table__cell">${product.units}</td>
        <td class="table__cell">${product.count}</td>
        <td class="table__cell">${product.price}</td>
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

const renderGoods = (goods) => {
  const table = document.querySelector('.table__body');
  goods.forEach(element => {
    table.insertAdjacentHTML('beforeend',createRow(element));
  });    
};

renderGoods(goods);
