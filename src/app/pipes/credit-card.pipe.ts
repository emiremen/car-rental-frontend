import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'creditCard'
})
export class CreditCardPipe implements PipeTransform {

  transform(value: string, filterCardNumber: string): string {
    return filterCardNumber ? value.replace(/\d(?=\d{4})/g, "*") :value
  }

}
