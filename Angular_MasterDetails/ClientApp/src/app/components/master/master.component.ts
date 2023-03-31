import { NotifyService } from './../../services/notify.service';
import { Spot } from './../../models/spot';
import { DataService } from './../../services/data.service';
import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.css']
})
export class MasterComponent {

  spotList : Spot[] = [];
  clientPicture : File = null!;

  constructor(
    public dataSvc : DataService,
    private router : Router,
    private notifySvc : NotifyService
  ){}

  bookingForm : FormGroup = new FormGroup({
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

  addSpotItem() {
    this.SpotItemsArray.push(new FormGroup({
      spotId: new FormControl(undefined, Validators.required)
    }));
  }

  removeSpotItem(index: number) {
    if (this.SpotItemsArray.controls.length > 0)
      this.SpotItemsArray.removeAt(index);
  }

  ngOnInit(){
    this.dataSvc.getSpotList().subscribe((result) => {
      this.spotList = result;
    });
    this.addSpotItem();
  }

  onFileSelected(event : any){
    this.clientPicture = event.target.files[0];
  }

  CreateBooking(){

    var formData = new FormData();

    formData.append("spotsStringify", JSON.stringify(this.bookingForm.get("spotItems")?.value));
    formData.append("clientName", this.bookingForm.get("clientName")?.value);
    formData.append("birthDate", this.bookingForm.get("birthDate")?.value);
    formData.append("phoneNo", this.bookingForm.get("phoneNo")?.value);
    formData.append("maritalStatus", this.bookingForm.get("maritalStatus")?.value);
    formData.append("pictureFile", this.clientPicture, this.clientPicture.name);

    this.dataSvc.postBooking(formData).subscribe(
      {
        next : r => {
          console.log(r);
          this.router.navigate(['/masterdetails']);
          this.notifySvc.message('Data insered successfull!!!', 'DISMISS');
        },
        error : err => {
          console.log(err);
        }
      }
    );

  }

}
