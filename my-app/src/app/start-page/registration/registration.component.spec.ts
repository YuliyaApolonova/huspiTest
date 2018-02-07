import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationComponent } from './registration.component';
import {ReactiveFormsModule} from "@angular/forms";
import {RouterTestingModule} from '@angular/router/testing';

import {AuthService} from '../../auth.service';

import {Observable} from 'rxjs';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;

  class authServiceStub {
    register(): Observable<boolean> {
      return Observable.of(true);
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationComponent ],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule
      ],
      providers: [
        {provide: AuthService, useClass: authServiceStub}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('form should be invalid when empty', () => {
    expect(component.registrationForm.valid).toBeFalsy();
  });

  it('email field initially should be invalid', () => {
    let email = component.registrationForm.controls['email'];
    expect(email.valid).toBeFalsy();
  });

  it('username field initially should be invalid', () => {
    let username = component.registrationForm.controls['username'];
    expect(username.valid).toBeFalsy();
  });

  it('email field validity', () => {
    let errors = {};
    let email = component.registrationForm.controls['email'];
    errors = email.errors || {};
    expect(errors['required']).toBeTruthy();
    email.setValue("test");
    errors = email.errors || {};
    expect(errors['pattern']).toBeTruthy();

    email.setValue("test@");
    errors = email.errors || {};
    expect(errors['pattern']).toBeTruthy();

    email.setValue("test@fgfg.");
    errors = email.errors || {};
    expect(errors['pattern']).toBeTruthy();

    email.setValue("35656");
    errors = email.errors || {};
    expect(errors['pattern']).toBeTruthy();
  });

  it('set values after submitting form', () => {
    expect(component.registrationForm.valid).toBeFalsy();
    component.registrationForm.controls['email'].setValue("test@test.com");
    component.registrationForm.controls['username'].setValue('vasya');

    expect(component.registrationForm.controls['email'].valid).toBeTruthy();

    component.onSubmit();

    expect(component.submitted).toBe(true);
    expect(component.registrationForm.value.email).toBe('test@test.com');
    expect(component.registrationForm.value.username).toBe('vasya');

  });
});
