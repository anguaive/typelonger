using System;
using System.Collections.Generic;
using api.Models;

namespace api.ViewModels
{
    public class User
    {
        public string Name { get; set; }
        public string Biography { get; set; }
        public string PictureURL { get; set; }
        public DateTime DateOfRegistration { get; set; }
        public List<AliasDetailsView> Aliases { get; set; }
    }
}