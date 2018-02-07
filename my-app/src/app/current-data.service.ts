
/**
 * Created by user on 18.07.17.
 */

import { Injectable } from '@angular/core';
import {IDate} from './date';

@Injectable()

export class CurrentDataService {

  getCurrentDate(): IDate {

    let today = new Date();
    let day = today.getUTCDate();
    let month = today.getMonth()+1;
    let year = today.getFullYear();

    today = null;

    return {
      year: year,
      month: month,
      day: day
    };
  }

}
