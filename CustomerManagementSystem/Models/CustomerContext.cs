using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CustomerManagementSystem.WebApi.Models
{
	public class CustomerContext:DbContext
	{
		public CustomerContext(DbContextOptions<CustomerContext>dbContextOptions):base(dbContextOptions)
		{

		}
		public DbSet<Customer> Customers { get; set; }
	}
}
