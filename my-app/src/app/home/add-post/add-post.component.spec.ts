import  { async, ComponentFixture, inject, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { AddListComponent } from './add-post.component';
import {CurrentDataService} from '../../current-data.service';
import {GetListsService} from '../../get-posts.service';
import {FormsModule} from "@angular/forms";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {RouterTestingModule} from '@angular/router/testing';

import {NgbCalendar, NgbCalendarGregorian} from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-calendar';
import {NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date-parser-formatter';

describe('AddListComponent', () => {
  let component: AddListComponent;
  let fixture: ComponentFixture<AddListComponent>;
  let componentCurrentDataService: CurrentDataService; // the actually injected service
  let componentGetListsService: GetListsService;
  let currentDataService: CurrentDataService;
  let getListsService: GetListsService;
  let form: DebugElement;
  let dateFrom: DebugElement;
  let dateTo: DebugElement;

  // let type: HTMLInputElement;
  // let form: HTMLElement;

  let currentDataServiceStub = {
    getCurrentDate() {
      return{
        year: 2017,
        month: 1,
        day: 1
      };
    }
  };

  let getListsServiceStub = {
    createList(){

    }
  };

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [
        AddListComponent
      ],
      providers: [
        {provide: CurrentDataService, useValue: currentDataServiceStub },
        {provide: GetListsService, useValue: getListsServiceStub},
        {provide: NgbCalendar, useValue:  NgbCalendarGregorian},
        {provide: NgbDateParserFormatter, useValue: NgbDateParserFormatter}
      ],
      imports: [ FormsModule, NgbModule, RouterTestingModule]
    })
    .compileComponents();

  }));

  beforeEach(() => {

    fixture = TestBed.createComponent(AddListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    currentDataService = fixture.debugElement.injector.get(CurrentDataService);
    componentCurrentDataService = currentDataService;
    currentDataService = TestBed.get(CurrentDataService);

    getListsService = fixture.debugElement.injector.get(GetListsService);
    componentGetListsService = getListsService;
    getListsService = TestBed.get(GetListsService);

    form = fixture.debugElement.query(By.css('#addListForm'));
    dateFrom = fixture.debugElement.query(By.css('#dateFrom'));
    dateTo = fixture.debugElement.query(By.css('#dateTo'));
    // form = de.nativeElement;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should inject the component\'s CurrentDataService instance',
    inject([CurrentDataService], (service: CurrentDataService) => {
      expect(service).toBe(componentCurrentDataService);
    }));

  it('service injected via inject(...) and TestBed.get(...) should be the same instance ',
    inject([CurrentDataService], (service: CurrentDataService) => {
      expect(service).toBe(currentDataService);
    }));

  it('should inject the component\'s GetListsService instance',
    inject([GetListsService], (service: GetListsService) => {
      expect(service).toBe(componentGetListsService);
    }));

  it('should call function that set today date (minDate)', () =>{
    spyOn(component, 'setMinDate');
    component.setMinDate();
    expect(component.setMinDate).toHaveBeenCalled();
  });


  it('Should call onSubmit function after submitting', ()=>{
    spyOn(component, "onSubmit");
    form.triggerEventHandler('submit', null);
    fixture.detectChanges();
    expect(component.onSubmit).toHaveBeenCalled();
  });

  it('should take submitted = true after submit', () => {
   form.triggerEventHandler("submit", null); // used to simulate events
   fixture.detectChanges();
   expect(component.submitted).toBe(true);
  });

  it('should call addList function with String arguments after submit ', () => {
    spyOn(component, "addList");
    component.model.type = 'test value';
    component.model.dateFrom = {
      year: 2017,
      month: 11,
      day: 11
    }
    component.model.dateTo = {
      year: 2017,
      month: 11,
      day: 11
    }
    component.onSubmit();
    expect(component.addList).toHaveBeenCalledWith(jasmine.any(String), jasmine.any(String), 'test value');
  })


  it('should navigate to home page when add new list', () => {

  })
  // it("Should bind the input to the correct property" , fakeAsync(()=> {  // FAILED!!!!
  //   fixture.detectChanges();
  //   let type = fixture.debugElement.query(By.css('#type')).nativeElement;
  //   type.value = 'test-value';
  //   // fixture.detectChanges();
  //   type.dispatchEvent(new Event('input'));
  //   // fixture.whenStable().then( () => {
  //   //   fixture.detectChanges();
  //   tick();
  //     expect(component.model.type).toEqual('test-value');
  //   // })
  //   // expect(component.model.dateFrom).toBe({year: 2018, month: 6, day: 4});
  //   // expect(component.model.dateTo).toBe({year: 2018, month: 6, day: 5});
  // }))

  it("Should bind the input to the correct property" , fakeAsync(()=> { // FAILED!!!
    let type = fixture.debugElement.query(By.css('#type')).nativeElement;
    component.model.type = 'test value';
    fixture.detectChanges();
    tick(); // wait for async
    fixture.detectChanges(); // update view
      expect(type.value).toBe('test-value');
  }))

});
