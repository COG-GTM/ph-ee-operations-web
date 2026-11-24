/** Angular Imports */
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

/** Custom Services */
import { AuthenticationService } from '../../authentication/authentication.service';
import { NgClass, NgStyle } from '@angular/common';
import { ExtendedModule } from '@angular/flex-layout/extended';
import { FlexModule } from '@angular/flex-layout/flex';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { MatNavList, MatListItem } from '@angular/material/list';
import { MatTooltip } from '@angular/material/tooltip';
import { MatIcon } from '@angular/material/icon';
import { MatLine } from '@angular/material/grid-list';
import { HasRoleDirective } from '../../../directives/has-role/has-role.directive';
import { MatFabButton } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';

/**
 * Sidenav component.
 */
@Component({
    selector: 'mifosx-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.scss'],
    imports: [NgClass, ExtendedModule, FlexModule, FaIconComponent, MatNavList, MatListItem, MatTooltip, RouterLink, MatIcon, MatLine, HasRoleDirective, NgStyle, MatFabButton, TranslateModule]
})
export class SidenavComponent implements OnInit {

  //User Management Expansion
  isUserManagementExpanded:boolean = false;
  //User Management Active Button
  activeButton:string='';

  /** True if sidenav is in collapsed state. */
  @Input() sidenavCollapsed: boolean;
  @Output() sideNavControl: EventEmitter<boolean> = new EventEmitter;
  /** Username of authenticated user. */
  username: string;

  /**
   * @param {Router} router Router for navigation.
   * @param {AuthenticationService} authenticationService Authentication Service.
   */
  constructor(private router: Router,
    private authenticationService: AuthenticationService) { }

  /**
   * Sets the username of the authenticated user.
   */
  ngOnInit() {
    const credentials = this.authenticationService.getCredentials();
    if (credentials) {
      this.username = credentials.username;
    } else {
      this.username = 'User';
    }
  }

  /**
   * Logs out the authenticated user and redirects to login page.
   */
  logout() {
    this.authenticationService.logout()
      .subscribe(() => this.router.navigate(['/login'], { replaceUrl: true }));
  }

  sideNavCollapsed(value: boolean): void {
    this.sideNavControl.emit(value);
  }
  toggleUserManagement(event: Event) {
    event.stopPropagation(); 
    this.isUserManagementExpanded = !this.isUserManagementExpanded;
  }
  setActiveButton(buttonName: string) {
    this.activeButton = buttonName;
  }

}
