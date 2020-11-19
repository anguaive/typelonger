using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using IdentityServer4.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace api.Data
{
    public class ApplicationDbContext : ApiAuthorizationDbContext<ApplicationUser>
    {
        private readonly SeedData _seedData;

        public ApplicationDbContext(
            DbContextOptions options,
            IOptions<OperationalStoreOptions> operationalStoreOptions, SeedData seedData) : base(options, operationalStoreOptions)
        {
            _seedData = seedData;
        }

        public DbSet<ApplicationUser> ApplicationUsers { get; set; }
        public DbSet<Alias> Aliases { get; set; }
        public DbSet<Text> Texts { get; set; }
        public DbSet<Section> Sections { get; set; }
        public DbSet<Performance> Performances { get; set; }
        public DbSet<RawStats> RawStats { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            _seedData.Seed(builder);

        }
    }
}
