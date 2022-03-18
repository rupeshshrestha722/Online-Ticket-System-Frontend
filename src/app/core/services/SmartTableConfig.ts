import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SmartTableConfig {
  defaultSettings = {
    actions: {
      position: 'right',
      add: false,
      edit: false,
      delete: false,
      custom: [
        {
          name: 'book',
          title: '<i class="eva eva-archive-outline"></i>'
        },
      ],
      customPayment: [
        {
          name: 'payment',
          title: '<i class="eva eva-alert-triangle-outline"></i>'
        },
      ]
    },

    isMultiSelectVisible: false,
    pager: {
      perPage: 10
    },
    filter: {
      inputClass: 'input-full-width size-medium shape-semi-round'
    }
  };


  getConfig(config: object) {
    return Object.assign({}, this.defaultSettings, config);
  }
}
