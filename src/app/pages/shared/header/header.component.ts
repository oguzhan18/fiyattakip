import { OverlayContainer } from "@angular/cdk/overlay";
import { Component, EventEmitter, OnInit, Output, Input, HostBinding } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { AuthService } from 'src/app/_services/auth.service';


@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  today: Date = new Date();

  @HostBinding('class') className = '';

  toggleControl = new FormControl(false);

  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();

  //Input the the screen size from the default component
  @Input() deviceXs: boolean;
  @Input() deviceMd: boolean;
  @Input() deviceSm: boolean;
  @Input() deviceLg: boolean;
  @Input() deviceXl: boolean;

  constructor(public _AuthService: AuthService,private dialog: MatDialog, private overlay: OverlayContainer) {}

  ngOnInit(): void {
    this.toggleControl.valueChanges.subscribe((darkMode) => {
      const darkClassName = 'darkMode';
      this.className = darkMode ? darkClassName : '';
      if (darkMode) {
        this.overlay.getContainerElement().classList.add(darkClassName);
      } else {
        this.overlay.getContainerElement().classList.remove(darkClassName);
      }
    });}

  toggleSideBar() {
    this.toggleSideBarForMe.emit();
  }
}
