import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { JwtService } from '../../service/jwt.service';
import { UtilisateurService } from '../../service/utilisateur.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-authentication',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.scss'
})
export class AuthenticationComponent implements OnInit{

  registerForm!: FormGroup;
  loginForm!: FormGroup;
  errorMessage: string = '';
  userEmail: string = '';

  constructor(
     private userService: UtilisateurService,
     private service: JwtService,
     private fb: FormBuilder,
     private router: Router,
  ){}
  ngOnInit(): void {

    this.loginForm = this.fb.nonNullable.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      platform: ['WEB'],
    });

  }
  
  submitForm2() {
    this.errorMessage = '';
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.service.login(this.loginForm.value).subscribe(
      (response: any) => { 
          localStorage.setItem('token', response.token); // Stocke le token
          localStorage.setItem('username', this.loginForm.value.username);
          this.userService.retournerEmail(this.loginForm.value.username).subscribe({
            next: (email: string) => {
              this.userEmail = email;
              localStorage.setItem('email', this.userEmail); // Stocke l'email
           
              this.router.navigate(['/dashboard']); // Redirige vers le dashboard
            },
            error: (error) => {
              console.error('Error fetching email:', error);
              this.router.navigate(['/dashboard']); // Redirige même en cas d'erreur
            }
          });
          localStorage.setItem('email', this.userEmail); // Stocke l'email
         
          this.router.navigate(['/dashboard']); // Redirige vers le dashboard
      },
      (error) => {
       
        this.errorMessage = 'Username ou password incorrect';
        
      }
    )
  }
  
  isActive = false;

  activate(): void {
    this.isActive = true;
  }

  deactivate(): void {
    this.isActive = false;
  }

 
  
  onLogin() {
    console.log("Tentative de connexion...");
    
  }

}
