import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'filterPrice'
})
export class FilterPricePipe implements PipeTransform {

  transform(value: any, min:any,max:any) {
    var filtered=value.filter((el:any)=>{return (el.priceAfterSale >= min && el.priceAfterSale <= max)});
    return filtered ;
  }

}
