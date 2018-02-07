import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterLinkStubDirective }   from './testing/router-stubs';
import { RouterOutletStubComponent } from './testing/router-stubs';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { AppComponent } from './app.component';
import {HomeComponent} from "./home/home.component";
import {StartPageComponent} from "./start-page/start-page.component";

describe('AppComponent', () => {
  let comp:    AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HomeComponent,
        StartPageComponent,
        RouterLinkStubDirective,
        RouterOutletStubComponent
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(AppComponent);
      comp  = fixture.componentInstance;
    });
  }));

  tests();

  it('should create the app', async(() => {
    // const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'app'`, async(() => {
    // const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app');
  }));

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
      expect(comp).not.toBeNull();
    });

    // it('can get RouterLinks from template', () => {
    //   expect(links.length).toBe(2, 'should have 2 links');
    //   expect(links[0].linkParams).toBe('/start', '1st link should go to StartPage');
    //   expect(links[1].linkParams).toBe('/home', '1st link should go to Home');
    // });

    // it('can click home link in template', () => {
    //   const homeLinkDe = linkDes[1];
    //   const homeLink = links[1];
    //
    //   expect(homeLink.navigatedTo).toBeNull('link should not have navigated yet');
    //
    //   homeLinkDe.triggerEventHandler('click', null);
    //   fixture.detectChanges();
    //
    //   expect(homeLink.navigatedTo).toBe('/home');
    // });
  }

});


