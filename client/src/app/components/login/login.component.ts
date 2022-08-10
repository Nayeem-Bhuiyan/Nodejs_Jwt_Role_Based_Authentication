import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup,FormArray, FormControl, Validators } from '@angular/forms';
import { TokenStorageService } from 'src/app/services/token/token-storage.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NotificationService } from 'src/app/services/notification/notification.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  frmData: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  submitted = false;

  constructor(
    private tokenService: TokenStorageService,
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.frmData = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(40)
          ]
        ]

      }

    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.frmData.controls;
  }

  login() {
    this.submitted = true;
    if (this.frmData.invalid) {
      return;
    }

    const {email,password}=this.frmData.value;

    this.authService.login(email,password).subscribe({
      
      next: (response) => {
        console.log(response);
        this.tokenService.saveToken(response.token);
        this.notificationService.showSuccess("User login successful", "Success");
        this.router.navigate(["/userDashboard"]);
       
      },
      error: (err) => {
        console.log(err);
        this.notificationService.showError("Invalid username or password.", "Error");
      },
      complete: () => console.info('login complete')
    });

  }


  



  formReset(): void {
    this.submitted = false;
    this.frmData.reset();
  }


}