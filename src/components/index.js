import { setupMessageComponent } from './Message';
import { setupModalComponent } from './Modal';
import {setupPaginationComponent} from "./Pagination";
import {setupSliderComponent} from "./Slider";

// 注册全局组件
export function setupGlobComponents(app) {
  setupMessageComponent(app);
  setupModalComponent(app);
  setupPaginationComponent(app);
  setupSliderComponent(app);
}
