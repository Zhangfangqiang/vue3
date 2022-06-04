import moment from './moment'

export function setupGlobFilters(app) {
  app.config.globalProperties.$filters = {
    moment: moment
  }
}
