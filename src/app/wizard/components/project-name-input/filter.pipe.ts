import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'suggest',
  pure: false
})
export class SuggestFilterPipe implements PipeTransform {
  transform(items: any[], filter: string): any {
      if (!items || !filter) {
          return items;
      }
      return items.filter(item => item.indexOf(filter) !== -1);
  }
}