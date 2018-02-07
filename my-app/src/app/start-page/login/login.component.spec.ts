import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {FormsModule} from "@angular/forms";
import {RouterTestingModule} from '@angular/router/testing';

import { LoginComponent } from './login.component';
import {AuthService} from '../../auth.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  class authServiceStub {

  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        FormsModule,
        RouterTestingModule
      ],
      providers: [
        {provide: AuthService, useClass: authServiceStub}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should set the model value', fakeAsync(() => {
    fixture.detectChanges();
    setInputValue('#username', 'test');
    // expect(fixture.debugElement.query(By.css('#username')).nativeElement.textContent).toEqual('test');
      expect(component.model.username).toEqual('test');
  }));

  function setInputValue(selector: string, value: string) {
    let input = fixture.debugElement.query(By.css(selector)).nativeElement;
    input.value = value;
    input.dispatchEvent(new Event('input'));
    tick();
    fixture.detectChanges();
  }

});
