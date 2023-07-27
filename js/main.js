'use strict';

const overlay = document.querySelector('.overlay')
overlay.classList.remove('active');
console.log(overlay);

const createRow = (product, num) => {
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
  return result
};

const renderGoods = (goods) => {
    let rows = "";
    const table = document.querySelector('.table__body');
    const lastRow = table.lastElementChild;
    let lastNum = 0;
    if(lastRow){
        console.log(lastRow);
        lastNum = +lastRow.querySelector('.table__cell').textContent;
    }
    goods.forEach(element => {
        lastNum ++;
        rows += createRow(element, lastNum);
    });
    table.insertAdjacentHTML('beforeend',rows);
}

renderGoods(goods);