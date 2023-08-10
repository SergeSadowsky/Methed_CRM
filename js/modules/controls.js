import calc from './calc.js';
import * as rn from './render.js';
import serviceData from './serviceData.js';


const initEvents = (goods) => {
  const overlay = document.querySelector('.overlay');
  overlay.classList.remove('active');
  overlay.addEventListener('click', (e) => {
    const target = e.target;
    if (target === overlay || target.closest('modal__close')) {
      rn.closeModal();
    }
  });

  const btnAddGoods = document.querySelector('.panel__add-goods');
  btnAddGoods.addEventListener('click', () => {
    rn.formInit();
    rn.openModal();
  });

  const btnModalClose = document.querySelector('.modal__close');
  btnModalClose.addEventListener('click', () => {
    rn.closeModal();
  });

  const tableGoods = document.querySelector('.table__body');
  tableGoods.addEventListener('click', e => {
    const target = e.target;
    if (target === target.closest('.table__btn_del')) {
      const tr = target.closest('tr');
      const id = tr.querySelector('.table__cell_name').dataset.id;
      serviceData.deleteGoodsById(goods, id);
      rn.showTotalPrice(goods);
      rn.removeProduct(tr);
      rn.numberingRows(tableGoods);
      // goods.forEach(el => console.log(el));
    }
  });
};

const formControl = (goods) => {
  const form = document.querySelector('.modal__form');

  form.discount.addEventListener('change', e => {
    form.discount_count.disabled = !e.currentTarget.checked;
  });

  form.count.addEventListener('change', e => {
    calc.formTotal(form);
  });

  form.price.addEventListener('change', e => {
    calc.formTotal(form);
  });

  form.discount_count.addEventListener('change', e => {
    calc.formTotal(form);
  });

  const tableGoods = document.querySelector('.table__body');
  form.addEventListener('submit', e => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const product = Object.fromEntries(formData);
    product.title = product.name;
    product.id = e.target.vendorCodeId;

    serviceData.addGoods(goods, product);
    rn.addProduct(tableGoods, product);
    rn.showTotalPrice(goods);

    form.reset();
    rn.closeModal();
  });
};

export {
  initEvents,
  formControl,
};
