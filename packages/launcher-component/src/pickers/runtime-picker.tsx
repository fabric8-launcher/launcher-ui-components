import { InputProps } from '../core/types';
import ItemPicker from '../core/item-picker/item-picker';
import * as React from 'react';

export interface RuntimePickerValue {
  id: string;
}

export interface RuntimeItem {
  id: string;
  name: string;
  description?: string;
  icon?: string;
}

interface RuntimePickerProps extends InputProps<RuntimePickerValue | undefined> {
  items: RuntimeItem[];
  canSelectNone?: boolean;
}

const noneItem: RuntimeItem = {
  id: '',
  name: 'None',
  // tslint:disable-next-line:max-line-length
  icon: "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.0' width='1280.000000pt' height='1280.000000pt' viewBox='0 0 1280.000000 1280.000000' preserveAspectRatio='xMidYMid meet'%3e %3cg transform='translate(0.000000%2c1280.000000) scale(0.100000%2c-0.100000)' fill='black' stroke='none'%3e %3cpath d='M6100 12794 c-1196 -69 -2268 -421 -3230 -1059 -1532 -1015 -2544 -2616 -2805 -4436 -48 -336 -58 -497 -58 -899 0 -402 10 -563 58 -899 261 -1820 1273 -3421 2805 -4436 894 -593 1884 -938 2985 -1042 251 -24 839 -24 1090 0 1101 104 2091 449 2985 1042 1532 1015 2544 2616 2805 4436 48 336 58 497 58 899 0 402 -10 563 -58 899 -261 1820 -1273 3421 -2805 4436 -890 591 -1895 942 -2975 1040 -161 15 -713 27 -855 19z m812 -1318 c335 -38 612 -92 906 -177 1056 -306 1980 -941 2648 -1820 516 -680 852 -1479 978 -2330 44 -295 51 -399 51 -749 0 -350 -7 -454 -51 -749 -110 -738 -372 -1426 -781 -2050 -95 -146 -299 -421 -311 -421 -9 0 -7172 7163 -7172 7172 0 10 260 204 380 285 499 333 1040 571 1625 717 280 69 534 108 925 140 109 9 673 -4 802 -18z m-875 -5438 c1971 -1971 3583 -3586 3583 -3590 0 -10 -260 -204 -380 -285 -636 -424 -1338 -695 -2091 -807 -295 -44 -399 -51 -749 -51 -350 0 -454 7 -749 51 -1324 197 -2505 896 -3317 1965 -516 680 -852 1479 -978 2330 -44 295 -51 399 -51 749 0 350 7 454 51 749 110 738 372 1426 781 2050 95 146 299 421 311 421 4 0 1619 -1612 3589 -3582z'/%3e %3c/g%3e %3c/svg%3e"
};

export const defaultRuntimePickerValue = undefined;

export function RuntimePicker(props: RuntimePickerProps) {
  const canSelectNone = props.canSelectNone !== false;
  const onChange = (id) => {
    if(canSelectNone && id === noneItem.id) {
      props.onChange(undefined);
      return;
    }
    props.onChange({id});
  };
  const value = props.value && props.value.id || (canSelectNone ? '' : undefined);
  return (
    <ItemPicker
      value={value}
      onChange={onChange}
      items={canSelectNone ? props.items.concat(noneItem) : props.items}
      group="runtime"
    />
  );

}
