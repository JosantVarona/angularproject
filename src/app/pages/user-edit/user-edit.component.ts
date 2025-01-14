import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotificationComponent } from "../../components/notification/notification.component";

@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, NotificationComponent],
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.css'
})
export class UserEditComponent {
  user: User = { name: '', email: '', dni: '', phone: ''};
  id: string = '';
  showAlert: boolean = false;
  alertMessage: string = "";
  alertClass: string = "";

  constructor(private userService: UserService, private route: ActivatedRoute) {
    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      // Obtener los detalles de la empresa desde Firestore
      console.log(this.id);
      this.userService.getUser(this.id).subscribe({
        error: (error) => {
          this.alertMessage = `Error al cargar el usuario: ${error}`;
          this.alertClass = "danger";
          this.showAlert = true;
        },
        next: (user) => {
          if (user) {
            this.user = user;
          } else {
            this.alertMessage = `El usuario con id ${this.id} no existe`;
            this.alertClass = "danger";
            this.showAlert = true;
          }
        }
      });
    }
  }

  updateUser() {
    if (this.id) {
      this.userService.updateUser(this.id, this.user).then(() => {
        this.alertMessage = `Usuario editado correctamente`;
        this.alertClass = "success";
        this.showAlert = true;
      }).catch((error) => {
        this.alertMessage = `Error al editar el usuario: ${error}`;
        this.alertClass = "danger";
        this.showAlert = true;
      });
    }
  }
}