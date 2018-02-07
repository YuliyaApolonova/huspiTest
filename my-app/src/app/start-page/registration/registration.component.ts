import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl} from '@angular/forms';
import {Router} from '@angular/router';

import {AuthService} from '../../auth.service';

  function duplicatePassword(input: FormControl) {

    if (!input.root || !input.root['controls']) {
    return null;
  }

  let exactMatch = input.root['controls'].password.value === input.value;

    return exactMatch ? null : { mismatchedPassword: true };
}

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registrationForm: FormGroup;
  submitted  = false;
  message = '';

  formErrors = {
    'firstName': '',
    'lastName': '',
    'email': '',
    'telephone': '',
    'username': '',
    'password': '',
    "confPassword": ''
  };

  validationMessages = {
    'firstName': {
      'required': 'firstName is required.',
      'pattern': 'Only english letters allowed'
    },
    'lastName': {
      'required': 'LastName is required.',
      'pattern': 'Only english letters allowed'
    },
    'email': {
      'required': 'Email is required.',
      'pattern': 'Email format must be xxxxx@yyyy.zzz'
    },
    'telephone': {
      'pattern': 'Only numbers allowed'
    },
    'username': {
      'required': 'Username is required',
      'pattern': 'Only english characters or numbers',
      'minlength': 'Must be at least 5 characters long.',
      'maxlength': 'Cannot be more than 10 characters long.'
    },
    'password': {
      'required': 'Password is required',
      'pattern': 'Only english characters or numbers'
    },
    'confPassword': {
      'required': 'Please, confirm the password',
      'pattern': 'Only english characters or numbers',
      'mismatchedPassword': 'Passwords must match'
    }
  };

  onSubmit():void {
    this.submitted = true;
    console.log(this.registrationForm.value);
    this.authService.register(this.registrationForm.value)
      .subscribe(data => {

        if(data){
          this.router.navigate(['/home']);
        }
        else{
          this.message = 'Invalid login or password';
        }
    });
  }

  ngOnInit(): void {
    this.buildForm();
  }

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  buildForm(): void {
    this.registrationForm = this.fb.group({

      "firstName": ["", [Validators.required,
        Validators.pattern('[A-Za-z]+')]],

      "lastName": ["", [Validators.required,
        Validators.pattern('[A-Za-z]+')]],

      "email": ["", [Validators.required,
        Validators.pattern('^[0-9A-Za-z]{1,10}@[0-9a-zA-Z_]+?\.[a-zA-Z]{2,5}$')]],

      "telephone": ["", Validators.pattern('[0-9]+')],

      "username": ["", [Validators.required,
        Validators.pattern('[A-Za-z0-9]+'),
        Validators.maxLength(10),
        Validators.minLength(5)]],

      "password": ["", [Validators.required,
          Validators.pattern('[a-zA-Z0-9]+')]],

      "confPassword": ["", [Validators.required,
          Validators.pattern('[a-zA-Z0-9]+'),
          duplicatePassword
      ]],

    },

    );

    this.registrationForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged();

  }


  onValueChanged(data?: any) {
    if (!this.registrationForm) { return; }
    const form = this.registrationForm;

    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field); // get input from form

      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }


}
