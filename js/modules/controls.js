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
    if (target === target.closest('.table__btn_pic')) {
      const xPos = Math.floor((screen.width - 800) / 2);
      const yPos = Math.floor((screen.height - 600) / 2);

      window.open(target.dataset.pic,
          '',
          `left=${xPos},top=${yPos},location=no,width=800,height=600,resizable=no,scrollbars=no,toolbar=no,status=no`);

      // const features = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
      //   left=${xPos},top=${yPos},width=800,height=600`;
      // const handle = open(target.dataset.pic, 'picwindow', features);
    }
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

  form.image.addEventListener('change', e => {
    const target = e.target;
    if (target.files.length > 0) {
      const imagePreview = form.querySelector('#modal__image__preview');
      const errorText = form.querySelector('#modal__error');
      const src = URL.createObjectURL(target.files[0]);
      console.log('size: ', target.files[0].size);
      if (target.files[0].size > 1048576) {
        errorText.textContent = 'Изображение не должно превышать размер 1 Мб';
        imagePreview.style.display = 'none';
        errorText.style.display = 'block';
      } else {
        imagePreview.style.display = 'block';
        errorText.style.display = 'none';
        imagePreview.src = src;
      }
    }
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
