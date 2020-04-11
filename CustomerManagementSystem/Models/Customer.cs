using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace CustomerManagementSystem.WebApi.Models
{
	public class Customer
	{
		[Key]
		public int CustomerId { get; set; }
		[Required]
		[Column(TypeName ="varchar(100)")]
		public string Name { get; set; }
		[Required]
		[Column(TypeName = "varchar(10)")]
		public string Gender { get; set; }
		[Required]
		[Column(TypeName = "varchar(100)")]
		public string Email { get; set; }
	}
}
