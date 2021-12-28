import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

export interface User {
  name: string;
  email: string;
  role: string;
}

const ELEMENT_DATA: User[] = [
  {
    name: 'João Rodrigues',
    email: 'joaorodrigues@onboard.com',
    role: 'Administrator',
  },
  {
    name: 'Jorge Rodrigues',
    email: 'jorgerodrigues@onboard.com',
    role: 'Administrator',
  },
  {
    name: 'Joana Fernandes',
    email: 'joanafernandes@onboard.com',
    role: 'User',
  },
  {
    name: 'Teresa Domingues',
    email: 'teresadomingues@onboard.com',
    role: 'User',
  },
  { name: 'António Silva', email: 'antoniosilva@onboard.com', role: 'User' },
];

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'role', 'actions'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  constructor() {}

  ngOnInit(): void {}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
