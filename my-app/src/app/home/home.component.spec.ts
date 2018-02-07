import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { DebugElement } from '@angular/core';

import { RouterLinkStubDirective }   from '../testing/router-stubs';
import { RouterOutletStubComponent } from '../testing/router-stubs';


import { By } from '@angular/platform-browser';

import { HomeComponent } from './home.component';
import {AddListComponent} from "./add-list/add-list.component";
import {SickListComponent} from "./List/list.component";
import {FormsModule} from "@angular/forms";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

import {GetListsService} from '../get-posts.service';
import {AuthService} from '../auth.service';
import {IResponse} from '../response';

import {Observable} from 'rxjs';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  let componentGetListsService: GetListsService;
  let getListsService: GetListsService;

  const VacationObj = {data: 12, message: 'All is Ok', type: true};
  class getListsServiceStub  {
    public getVacationInd(): Observable<IResponse> {
      return Observable.of(VacationObj);
    }
    public getSickInd(): Observable<IResponse> {
      return Observable.of(VacationObj);
    }
  }
  // let getListsServiceStub = {
  //   getVacationInd(): void {
  //     component.vacations = 2;
  //   },
  //   getSickInd(): void {
  //     component.sickLeaves = 3;
  //   },
  //   logout(): void {
  //     console.log('smth');
  //   }
  // };

  let authServiceStub = {

  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomeComponent,
        AddListComponent,
        SickListComponent,
        RouterLinkStubDirective,
        RouterOutletStubComponent
      ],
      providers: [
        {provide: GetListsService, useClass: getListsServiceStub},
        {provide: AuthService, useValue: authServiceStub}
      ],
      imports: [
        FormsModule,
        NgbModule,
      ]
    })
    .compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    getListsService = fixture.debugElement.injector.get(GetListsService);
    componentGetListsService = getListsService;
    getListsService = TestBed.get(GetListsService);

    // spyOn(componentGetListsService, 'getVacationInd').and.callFake(getListsServiceStub.getVacationInd);
    // spyOn(componentGetListsService, 'getSickInd').and.callFake(getListsServiceStub.getSickInd);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });


  it('should inject the component\'s GetListsService instance',
    inject([GetListsService], (service: GetListsService) => {
      expect(service).toBe(componentGetListsService);
    }));

  tests();

  function tests() {
    let links: RouterLinkStubDirective[];
    let linkDes: DebugElement[];

    beforeEach(() => {
      // trigger initial data binding
      fixture.detectChanges();

      // find DebugElements with an attached RouterLinkStubDirective
      linkDes = fixture.debugElement
        .queryAll(By.directive(RouterLinkStubDirective));

      // get the attached link directive instances using the DebugElement injectors
      links = linkDes
        .map(de => de.injector.get(RouterLinkStubDirective) as RouterLinkStubDirective);
    });

    it('can instantiate it', () => {
      expect(component).not.toBeNull();
    });

    it('can get RouterLinks from template', () => {
      expect(links.length).toBe(2, 'should have 2 links');
      expect(links[0].linkParams).toBe('/home/list', '1st link should go to the whole list of vacations');
      expect(links[1].linkParams).toBe('/home/addList', '1st link should go to form to add new list');
    });

    it('can click add list link in template', () => {
      const addLinkDe = linkDes[1];
      const addLink = links[1];

      expect(addLink.navigatedTo).toBeNull('link should not have navigated yet');

      addLinkDe.triggerEventHandler('click', null);
      fixture.detectChanges();

      expect(addLink.navigatedTo).toBe('/home/addList');
    });

    it('can click list link in template', () => {
      const addLinkDe = linkDes[0];
      const addLink = links[0];
      expect(addLink.navigatedTo).toBeNull('link should not have navigated yet');
      addLinkDe.triggerEventHandler('click', null);
      fixture.detectChanges();

      expect(addLink.navigatedTo).toBe('/home/list');
    });
  }

});
