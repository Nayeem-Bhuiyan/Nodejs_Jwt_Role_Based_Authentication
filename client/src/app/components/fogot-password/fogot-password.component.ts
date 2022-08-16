import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { TokenStorageService } from 'src/app/services/token/token-storage.service';

@Component({
  selector: 'app-fogot-password',
  templateUrl: './fogot-password.component.html',
  styleUrls: ['./fogot-password.component.css']
})
export class FogotPasswordComponent implements OnInit {
  

  frmData: FormGroup = new FormGroup({
    email: new FormControl('')
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
      }

    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.frmData.controls;
  }

  SendEmail=()=>{
    this.submitted = true;
    if (this.frmData.invalid) {
      return;
    }
    const {email}=this.frmData.value;
    this.authService.forgotPassword(email).subscribe({
      
      next: (response) => {
        console.log(response);
        this.notificationService.showSuccess("Send Email Successfully", "Success");
        this.router.navigate(["/login"]);
       
      },
      error: (err) => {
        console.log(err);
        this.notificationService.showError("Can not Send Email", "Error");
      },
      complete: () => console.info('Send Email Successfull')
    });

  }

  
  formReset(): void {
    this.submitted = false;
    this.frmData.reset();
  }

}
