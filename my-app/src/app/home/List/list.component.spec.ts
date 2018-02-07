import { async, ComponentFixture, TestBed } from '@angular/core/testing';


import { SickListComponent } from './list.component';
import { CurrentDataService} from '../../current-data.service';
import {GetListsService} from "../../get-posts.service";
import { HttpModule} from "@angular/http";
import {FormsModule} from '@angular/forms';


import {GetListsStub} from './fake-getLists.service';

describe('SickListComponent', () => {
  let component: SickListComponent;
  let fixture: ComponentFixture<SickListComponent>;
  let currentDataService: CurrentDataService;
  let currentDataServiceStub = {
    getCurrentDate() {
      return{
        year: 2017,
        month: 1,
        day: 1
      };
    }
  };

  let getListsStub: GetListsStub;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SickListComponent ],
      providers: [
        {provide: CurrentDataService, useValue: currentDataServiceStub },
        {provide: GetListsService, useClass: GetListsStub}

      ],
      imports: [
        HttpModule, FormsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SickListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    currentDataService = TestBed.get(CurrentDataService);
    getListsStub = fixture.debugElement.injector.get(GetListsService);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

});


