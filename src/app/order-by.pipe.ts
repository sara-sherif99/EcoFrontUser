import { Pipe, PipeTransform } from '@angular/core';
import { orderBy } from 'lodash';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform(value: any[], order:any , column:any): any[] {
    if (!value || order === '' || !order) { return value; }
    if (!column || column === '') { 
      if(order==='asc'){return value.sort()}
      else{return value.sort().reverse();}
    }
    if (value.length <= 1) { return value; }
    return orderBy(value, [column], [order]);
  }

}
