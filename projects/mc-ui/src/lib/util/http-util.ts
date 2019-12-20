
export class HttpUtil {

  // http(type: string, url: string, params: any, options: any) {
  //   let http;
  //   options = options || {};
  //   options.headers = this.createHeaders();
  //   switch (type) {
  //     case 'get':
  //       http = this._http.get(url, options);
  //       break;
  //     case 'post':
  //       http = this._http.post(url, params, options);
  //       break;
  //     case 'put':
  //       http = this._http.put(url, params, options);
  //       break;
  //     case 'delete':
  //       options.body = params;
  //       http = this._http.delete(url, options);
  //       break;
  //   }
  //   return http;
  // }

  // createHeaders() {
  //   const csrftoken = this.getCookie('csrftoken');
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'X-CSRFToken': csrftoken
  //   });
  //   return headers;
  // }

  getCookie(key: string) {
    return this.getQueryStringValue(document.cookie, key);
  }

  getQueryStringKeyValues(queryString: string) {
    const values = queryString.split(';');
    let keyValues: any = {};
    if (queryString) {
      keyValues = values.reduce((o: any, d: any) => {
        const vals = d.split('=');
        if (vals.length > 1) {
          o[vals[0].trim()] = vals[1];
        }
        return o;
      }, {});
    }
    return keyValues;
  }

  getUrlParams(str: string, removeDomain = true) {
    const arr = str.split(';');
    let url: any = arr.shift();
    if (removeDomain) {
      url = url.indexOf('#') > -1 ? url.split('#')[1] : url;
    }
    const keyValues = this.getQueryStringKeyValues(str);
    return {
      url,
      params: keyValues
    };
  }

  getQueryStringValue(queryString: string, key: string) {
    const values = this.getQueryStringKeyValues(queryString);
    return values[key] || '';
  }
}
