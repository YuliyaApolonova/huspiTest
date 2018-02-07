import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';

import { StartPageComponent } from './start-page.component';
import {LoginComponent} from "./login/login.component";
import {RegistrationComponent} from "./registration/registration.component";

import { RouterLinkStubDirective }   from '../testing/router-stubs';
import { RouterOutletStubComponent } from '../testing/router-stubs';

import { By } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

describe('StartPageComponent', () => {
  let component: StartPageComponent;
  let fixture: ComponentFixture<StartPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        StartPageComponent,
        LoginComponent,
        RegistrationComponent,
        RouterLinkStubDirective,
        RouterOutletStubComponent
      ],
      imports: [
        ReactiveFormsModule,
        FormsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  tests();

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

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
      expect(links[0].linkParams).toBe('/start/sign_in', '1st link should go to Sign In');
      expect(links[1].linkParams).toBe('/start/registration', '1st link should go to Registration Page');
    });

    it('can click registration link in template', () => {
      const homeLinkDe = linkDes[1];
      const homeLink = links[1];

      expect(homeLink.navigatedTo).toBeNull('link should not have navigated yet');

      homeLinkDe.triggerEventHandler('click', null);
      fixture.detectChanges();

      expect(homeLink.navigatedTo).toBe('/start/registration');
    });

    it('can click login link in template', () => {
      const loginLinkDe = linkDes[0];
      const loginLink = links[0];

      expect(loginLink.navigatedTo).toBeNull('link should not have navigated yet');

      loginLinkDe.triggerEventHandler('click', null);
      fixture.detectChanges();

      expect(loginLink.navigatedTo).toBe('/start/sign_in');
    });
  }

});
