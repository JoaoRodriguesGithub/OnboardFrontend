import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/users.model';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { JWTTokenService } from 'src/app/services/jwt-token.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ProfileService } from 'src/app/services/profile.service';

const ELEMENT_DATA: User[] = [];

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['name', 'email', 'role', 'actions'];
  errorMessage: string = '';
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  subscription: Subscription;
  user: { id: number };

  constructor(
    private profileService: ProfileService,
    private errorHandler: ErrorHandlerService,
    private localStorageService: LocalStorageService,
    private jwtTokenService: JWTTokenService,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getUsers();
    this.subscription = this.profileService.refresh$.subscribe(() => {
      this.getUsers();
    })

    this.user = {
      id: this.activeRoute.snapshot.params['id']
    }
    this.activeRoute.params.subscribe((params: Params) => {
      this.user = {
        id: params['id']
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getUsers() {
    const tokenString = this.localStorageService.get('token');
    const tokenInfo = this.jwtTokenService.getDecodedAccessToken(tokenString);
    const userRoleId = tokenInfo.role_id;
    const userId = tokenInfo.id;

    if (userRoleId === 2) {
      this.subscription = this.profileService.getUser(userId).subscribe((resp) => {
        this.dataSource.data = [resp]
      })
    } else {
      this.subscription = this.profileService.getUsers().subscribe(
        (resp) => {
          this.dataSource = resp
        },
        (error) => {
          this.errorHandler.handleError(error);
          this.errorMessage = this.errorHandler.errorMessage;
        }
      );
    }
  }

  deleteButton(element) {
    this.profileService.deleteUser(element).subscribe(
      () => {
        this.ngOnInit();
      },
      (error) => {
        this.errorHandler.handleError(error);
        this.errorMessage = this.errorHandler.errorMessage;
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
