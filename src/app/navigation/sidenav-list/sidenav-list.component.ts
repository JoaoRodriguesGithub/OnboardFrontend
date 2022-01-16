import { Component, EventEmitter, Output } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css'],
})
export class SidenavListComponent  {
  @Output() closeSidenav = new EventEmitter<void>();

  constructor( private localStorageService: LocalStorageService){}
  
  ngOnInit() {
    
  }

  onClose() {

  }

  onLogout() {
    this.localStorageService.clear();
    this.onClose();
  }
}
