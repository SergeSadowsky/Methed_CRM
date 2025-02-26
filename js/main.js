import {goods} from './goods.js';
import {initEvents, formControl} from './modules/controls.js';
import {renderGoods} from './modules/render.js';

window.myCRM = (function() {
  const init = (goods) => {
    renderGoods(goods);
    initEvents(goods);
    formControl(goods);
  };

  return {init};
})();

window.myCRM.init(goods);

