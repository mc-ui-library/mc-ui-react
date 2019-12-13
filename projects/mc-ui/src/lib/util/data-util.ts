export class DataUtil {
  search(items: any[], keyword: string, field: string = 'name') {
    if (keyword) {
      const keywords = keyword.toLowerCase().trim().split(' ');
      items = items.filter(item => {
        const text = ('' + item[field]).toLowerCase();
        return keywords.find(k => text.indexOf(k) > -1);
      });
    }
    return items;
  }
}
