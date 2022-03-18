import { Bus } from '@core/models';
import { tap, catchError } from 'rxjs/operators';

import { State, Selector, Action, StateContext } from '@ngxs/store';
import { BusService } from '@core/services';
import { AddBusAction, GetBusAction, SetSelectedBusAction } from '@actions/dashboard';
import { Injectable } from '@angular/core';

export class BusStateModel {
  busList: Bus.BusResponse[];
  selectedBus: any;
  submitted: boolean;
  bus: {
    model?: Bus.BusRequest;
    dirty: boolean;
    status: string;
    errors: {};
  };
}

@State<BusStateModel>({
  name: 'bus',
  defaults: {
    busList: [],
    selectedBus: null,
    submitted: false,
    bus: {
      model: {
        busNo: '',
        busModel: '',
        noOfseats: 0,
        fare:0,
        source: '',
        destination: '',
        departureDate: '',
        arrivalDate: ''
      },
      dirty: false,
      status: '',
      errors: {}
    }
  }
})
@Injectable()
export class BusState {
  constructor(private busService: BusService) {}

  /** Get Submitted Value */
  @Selector()
  static getSubmitted(state: BusStateModel) {
    return state.submitted;
  }

  /** Get Selected Bus */
  @Selector()
  static getBus(state: BusStateModel) {
    return state.selectedBus;
  }

  /** Get List of Bus */
  @Selector()
  static getBusList(state: BusStateModel) {
    return state.busList;
  }

  /** Add Bus */
  @Action(AddBusAction)
  addDepartment({ getState, patchState }: StateContext<BusStateModel>) {
    const state = getState();
    const form = state.bus.model;
    patchState({ ...state, submitted: true });

    return this.busService
      .addBus(
        form?.busNo as any,
       form?.busModel as any, 
       form?.noOfseats as any, 
       form?.fare as any, 
       form?.source as any,
        form?.destination as any, 
        form?.departureDate as any,
        form?.arrivalDate as any)
      .pipe(
        tap(res => {
          patchState({
            ...state.busList,
            submitted: false
          });
        }),
        catchError(err => {
          patchState({ submitted: false });
          throw err;
        })
      );
  }

  /** Get Bus List */
  @Action(GetBusAction)
  getFolder({ getState, patchState }: StateContext<BusStateModel>) {
    const states = getState();
    patchState({ submitted: true });

    return this.busService.getAllBus().pipe(
      tap((res: any) => {
        patchState({
          ...states,
          submitted: false,
          busList: res
        });
      }),
      catchError(err => {
        patchState({
          submitted: false
        });
        throw err;
      })
    );
  }
  

  /** Set Selected Bus */
  @Action(SetSelectedBusAction)
  setSelectedBus({ patchState }: StateContext<BusStateModel>, { payload }: SetSelectedBusAction) {
    patchState({ selectedBus: payload });
  }
}
