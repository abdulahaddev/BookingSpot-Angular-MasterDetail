import { NotifyService } from './../../services/notify.service';
import { Spot } from './../../models/spot';
import { BookingSpot } from './../../models/booking-spot';
import { DataService } from './../../services/data.service';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-master-view',
  templateUrl: './master-view.component.html',
  styleUrls: ['./master-view.component.css']
})
export class MasterViewComponent {

  spotList : Spot[] = [];
  bookingList : BookingSpot[] = [];

  constructor(
    private dataSvc : DataService,
    private notifySvc: NotifyService,
    private matDialog: MatDialog
  ){}

  ngOnInit(): void {

    this.dataSvc.getSpotList().subscribe(x => {
      this.spotList = x;
    });
    this.dataSvc.getBookingEntries().subscribe(x => {
      this.bookingList = x;
    });
  }

  getSpotName(id : any){
    let data = this.spotList.find(x => x.spotId == id);
    return data?data.spotName : '';
  }
  OnDelete(item : BookingSpot) : void {
    this.matDialog.open(ConfirmDialogComponent, {
          width: '450px',
          enterAnimationDuration: '500ms'
        }).afterClosed()
      .subscribe(result => {
        if (result) {
          if (item.clientId) {
            this.dataSvc.deleteBooking(item.clientId).subscribe(x => {
              this.bookingList = this.bookingList.filter(x => x.clientId != item.clientId);
              this.notifySvc.message('Item Deleted Successfully !!!', 'DISMISS');
            }, error => {
              this.notifySvc.message('An error occured while deleting !!!', 'DISMISS');
            });
          }
        }
      });
  }


}
