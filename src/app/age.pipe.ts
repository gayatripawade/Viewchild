import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'age'
})
export class AgePipe implements PipeTransform {

  transform(value:any): any {
  
  
   let date=new Date (value)
   let birthYear = date.getFullYear();
   let today = new Date();
   let age = today.getFullYear() - birthYear;
   return age;
  }


}
