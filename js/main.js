import {goods} from './goods.js';
import {initEvents, formControl} from './modules/controls.js';
import {renderGoods} from './modules/render.js';

// const {renderGoods} = render;

window.myCRM = (function() {
  const init = (goods) => {
    console.log(goods.length);

    renderGoods(goods);
    initEvents(goods);
    formControl(goods);
  };

  return {init};
})();

window.myCRM.init(goods);

