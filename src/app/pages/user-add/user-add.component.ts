import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-user-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-add.component.html',
  styleUrl: './user-add.component.css'
})
export class UserAddComponent {
  userForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    dni: new FormControl(''),
    phone: new FormControl(''),
  });
  constructor(private userService: UserService) {}

  submitUser() {
    let newUser: User = {
      name: this.userForm.value.name ?? "",
      email: this.userForm.value.email ?? "",
      dni: this.userForm.value.dni ?? "",
      phone: this.userForm.value.phone ?? ""
    }
    this.userService.addUser(newUser).then(()=>{
      this.userForm.reset();
    });
  }
}
