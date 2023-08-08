'use strict';

const nf = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
    roundingIncrement: 5,
});

const modalTitle = document.querySelector('.modal__title');
const modalForm = document.querySelector('.modal__form');
const modalOverlay = document.querySelector('.overlay__modal');
const modalCheckBox = document.querySelector('.modal__checkbox');
const modalCheckBoxText = document.querySelector('.modal__input_discount');
const totalPrice = document.querySelector('.cms__total-price');

const tableGoods = document.querySelector('.table__body');

const overlay = document.querySelector('.overlay')
overlay.classList.remove('active');

const closeModal = () => {
  overlay.classList.remove('active');
};
const openModal = () => {  
  overlay.classList.add('active');
};

const formInit = () => {
  modalForm.price.value = 0;
  modalForm.count.value = 0;
  modalForm.total.value = nf.format(0);
  const vendorCodeId = Math.floor(10000000000000 + Math.random() * 90000000000000);
  overlay.querySelector('.vendor-code__id').textContent = vendorCodeId;
  modalForm.vendorCodeId = vendorCodeId;
};

overlay.addEventListener('click', (e) => {
    const target = e.target;
    if(target === overlay || target.closest('modal__close')){
        closeModal();
    };
});

const btnAddGoods = document.querySelector('.panel__add-goods');
btnAddGoods.addEventListener('click', () => {
  formInit();
  openModal();
});

const btnModalClose = document.querySelector('.modal__close');
btnModalClose.addEventListener('click', () => {
    closeModal();
});

const getOrderNum = () => {
  let result = 0;
  const table = document.querySelector('.table__body');    
  const lastRow = table.lastElementChild;
  if(lastRow){
    result = +lastRow.querySelector('.table__cell').textContent;
  };
  return result + 1;
};

const createRow = ({id, title, category, units, count, price, discont}) => {
  const num = getOrderNum();
  const discountedPrice = discont ? (price - price * discont / 100 ) : price;
  const productTotal = discountedPrice * count;
  console.log(id, title, category, discountedPrice, count, productTotal);
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

const addGoods = (product) => {
  goods.push({
    "id": product.id,
    "title": product.title,
    "price": product.price,
    "description": product.description,
    "category": product.category,
    "discont": product.discount ? product.discount_count : false,
    "count": product.count,
    "units": product.units,
    "images": {
      "small": "img/smrtxiaomi11t-m.jpg",
      "big": "img/smrtxiaomi11t-b.jpg"
    }
  });
};

const deleteGoodsById = (goods, id) => {
  const index = goods.findIndex(el => el['id'] === +id);
  if (index !== -1) goods.splice(index, 1);
};

const numberingRows = (table) => {
    let i = 0
    const rows = table.querySelectorAll('tr');
    rows.forEach(row => {
        const td = row.querySelector('.table__cell');
        td.textContent = ++i;
    });
}

const formControl = (form) => {
  const totalCalc = () => {
    let total = +form.count.value * +form.price.value;
    if (!form.discount_count.disabled) total -= total * (+form.discount_count.value) / 100;
    total = Number.isNaN(total) ? 0 : total;
    form.total.textContent = `${nf.format(total)}`;
  }

  form.discount.addEventListener('change', e => {
    form.discount_count.disabled = !e.currentTarget.checked;
  });

  form.count.addEventListener('change', e => {
    totalCalc();
  });

  form.price.addEventListener('change', e => {
    totalCalc();
  });

  form.discount_count.addEventListener('change', e => {
    totalCalc();
  });
  
  form.addEventListener('submit', e => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const product = Object.fromEntries(formData);
    product.title = product.name;
    product.id = e.target.vendorCodeId;

    addProduct(product, tableGoods);
    addGoods(product);
    showTotalPrice(goods);

    form.reset();
    closeModal();
  });
};

const addProduct = (product, table) => {  
  table.insertAdjacentHTML('beforeend',createRow(product));
};

const calcGoodsTotal = (obj) => {
  return obj.reduce((acc, item) => {
    let sum = item.price * item.count;
    if(item.discont) sum -= sum * item.discont / 100; 
    console.log(sum);
    return acc + sum;
  }, 0);
};

const showTotalPrice = (goods) => {
  totalPrice.textContent = nf.format(calcGoodsTotal(goods));
};

const renderGoods = (goods) => {
  // const table = document.querySelector('.table__body');
  goods.forEach(element => {
    tableGoods.insertAdjacentHTML('beforeend',createRow(element));
    //addProduct(element, tableGoods);
  });
  showTotalPrice(goods);
  tableGoods.addEventListener('click', e => {
    const target = e.target;
    if(target === target.closest('.table__btn_del')){
        const tr = target.closest('tr');
        const id = tr.querySelector('.table__cell_name').dataset.id;
        deleteGoodsById(goods, id);
        tr.remove();
        numberingRows(tableGoods);
        // goods.forEach(el => console.log(el));
    }
  });

  formControl(modalForm);    
};

renderGoods(goods);
