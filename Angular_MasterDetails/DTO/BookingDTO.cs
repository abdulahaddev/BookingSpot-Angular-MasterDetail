using Angular_MasterDetails.Models;
using Microsoft.AspNetCore.Mvc.ApplicationParts;
using System.ComponentModel.DataAnnotations;

namespace Angular_MasterDetails.DTO
{
    public class BookingDTO
    {
       public int ClientId { get; set; }

        public string ClientName { get; set; }

        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime BirthDate { get; set; }

        public int PhoneNo { get; set; }

        public string Picture { get; set; }

        public IFormFile PictureFile { get; set; }

        public bool MaritalStatus { get; set; }

        public string spotsStringify { get; set; }

        public Spot[] SpotItems { get; set; }
    }
}
