import { Spot } from './../../models/spot';
import { DataService } from './../../services/data.service';
import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { BookingSpot } from 'src/app/models/booking-spot';
import { DatePipe } from '@angular/common';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
  selector: 'app-master-edit',
  templateUrl: './master-edit.component.html',
  styleUrls: ['./master-edit.component.css']
})
export class MasterEditComponent {
  spotList: Spot[] = [];
  clientPicture: File = null!;
  bookingSpot : BookingSpot = {clientId:undefined, clientName:undefined, phoneNo:undefined, picture:undefined, maritalStatus:undefined}

  constructor(
    public dataSvc: DataService,
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private notifySvc : NotifyService
  ) { }

  bookingForm: FormGroup = new FormGroup({

    clientId: new FormControl(undefined, Validators.required),
    clientName: new FormControl(undefined, Validators.required),
    birthDate: new FormControl(undefined),
    phoneNo: new FormControl(undefined, Validators.required),
    maritalStatus: new FormControl(undefined, Validators.required),
    spotItems: new FormArray([])
  });

  get SpotItemsArray() {
    return this.bookingForm.controls["spotItems"] as FormArray;
  }

  addSpotItem(item? : Spot) {
    if(item){
        this.SpotItemsArray.push(new FormGroup({
        spotId: new FormControl(item.spotId, Validators.required)
      }));
    }else{
        this.SpotItemsArray.push(new FormGroup({
        spotId: new FormControl(undefined, Validators.required)
    }));
    }

  }

  removeSpotItem(index: number) {
    if (this.SpotItemsArray.controls.length > 0)
      this.SpotItemsArray.removeAt(index);
  }

  ngOnInit() {
    const id = this.activatedRouter.snapshot.params['id'];

    this.dataSvc.getBookingEntryById(id).subscribe(x => {
      this.bookingSpot = x;

      this.bookingForm.patchValue(this.bookingSpot);

      if (x.birthDate) {
        const birthDate = new Date(x.birthDate);
        const formattedBirthDate = birthDate.toISOString().substring(0, 10);

        this.bookingForm.patchValue({
        birthDate: formattedBirthDate
        });
      }

      this.bookingSpot.spotItems?.forEach(item =>{
                this.addSpotItem(item);
              });

    });

    this.dataSvc.getSpotList().subscribe((result) => {
      this.spotList = result;
    });
  }

  onFileSelected(event: any) {
    this.clientPicture = event.target.files[0];
  }

  UpdateBooking() {

    var formData = new FormData();

    formData.append("spotsStringify", JSON.stringify(this.bookingForm.get("spotItems")?.value));
    formData.append("clientId", this.bookingForm.get("clientId")?.value);
    formData.append("clientName", this.bookingForm.get("clientName")?.value);
    formData.append("birthDate", this.bookingForm.get("birthDate")?.value);
    formData.append("phoneNo", this.bookingForm.get("phoneNo")?.value);
    formData.append("maritalStatus", this.bookingForm.get("maritalStatus")?.value);

    if (this.clientPicture) {
    formData.append("pictureFile", this.clientPicture, this.clientPicture.name);
    }

    this.dataSvc.updateBooking(formData).subscribe(
      {
        next: r => {
          console.log(r);
          this.router.navigate(['/masterdetails']);
          this.notifySvc.message('Data updated successfully !!!', 'DISMISS');
        },
        error: err => {
          console.log(err);
        }
      }
    );

  }
}
