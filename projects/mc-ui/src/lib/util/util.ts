import { HttpUtil } from './http-util';
import { DomUtil } from './dom-util';
import { DataUtil } from './data-util';
// You can add utilities like validator, date, data, visualization, etc...
export class Util {

  http: HttpUtil;
  dom: DomUtil;
  data: DataUtil;

  constructor() {
    this.http = new HttpUtil();
    this.dom = new DomUtil();
    this.data = new DataUtil();
  }

  isEmpty(val) {
    return val === null || val === '' || val === undefined;
  }

  getWindowSize() {
    return {
      width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
      height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
    };
  }

  debounce(callback: any, wait: number, scope: any = this) {
    let timeout: any;
    return (...args: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => callback.apply(scope, args), wait);
    };
  }

  throttle(callback: any, wait: number, scope: any = this) {
    let timeout: any;
    return (...args: any[]) => {
      if (!timeout) {
        timeout = setTimeout(() => {
          callback.apply(scope, args);
          clearTimeout(timeout);
        }, wait);
      }
    };
  }

  getRootUrl() {
    const location = window.location;
    return location.protocol + '//' + location.hostname + ':' + location.port + '/';
  }

  getFullUrl(childPath) {
    const root = this.getRootUrl();
    if (childPath.charAt(0) === '/') {
      childPath = childPath.substr(1);
    }
    return root + childPath;
  }

  clone(o) {
    // skip the date object
    if (!o || typeof o !== 'object' || (o instanceof Date && !isNaN(o.valueOf()))) {
      return o;
    } else if (Array.isArray(o)) {
      return o.map(item => this.clone(item));
    } else {
      return Object.keys(o).reduce((obj, key) => {
        obj[key] = this.clone(o[key]);
        return obj;
      }, {});
    }
  }

}
