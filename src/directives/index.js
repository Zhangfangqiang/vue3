import { setupValidatorDirective } from './validator';
import { setupDropdownDirective } from './dropdown'
import { setupTitleDirective } from './title'

// 注册全局指令的回调
export function setupGlobDirectives(app) {
  setupValidatorDirective(app);
  setupDropdownDirective(app);
  setupTitleDirective(app);
}
