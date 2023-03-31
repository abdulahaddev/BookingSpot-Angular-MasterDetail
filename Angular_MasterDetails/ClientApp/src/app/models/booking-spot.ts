import { Spot } from "./spot";

export class BookingSpot {
  constructor(
      public clientId? : number,
      public clientName? : string,
      public birthDate? : Date,
      public phoneNo? : number,
      public picture? : string,
      public pictureFile? : File,
      public maritalStatus? : boolean,
      public spotItems? : Spot[]
  ){}
}
