using System;
using System.Collections.Generic;
using System.Linq;
using BShop.API.Data;
using BShop.API.Data.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace BShop.API.FunctionalTests.Infrastructure
{
    public class TestWebApplicationFactory<TStartup>
        : WebApplicationFactory<TStartup> where TStartup : class
    {
        protected override void ConfigureWebHost(IWebHostBuilder builder)
        {
            builder.ConfigureServices(services =>
            {
                var descriptor = services.SingleOrDefault(
                    d => d.ServiceType == typeof(DbContextOptions<ApplicationDbContext>));

                if (descriptor != null)
                {
                    services.Remove(descriptor);
                }

                services.AddDbContext<ApplicationDbContext>(options =>
                    options.UseInMemoryDatabase("InMemoryDbForTesting"));

                using var scope = services.BuildServiceProvider().CreateScope();

                var scopedServices = scope.ServiceProvider;
                var context = scopedServices.GetRequiredService<ApplicationDbContext>();
                var logger = scopedServices.GetRequiredService<ILogger<TestWebApplicationFactory<TStartup>>>();

                context.Database.EnsureCreated();

                try
                {
                    context.InitializeDbForTests();
                }
                catch (Exception ex)
                {
                    logger.LogError(ex, "An error occurred seeding the " +
                                        "database with messages. Error: {Message}", ex.Message);
                }
            });
        }
    }

    public static class DbContextUtilities
    {
        public static void InitializeDbForTests(this ApplicationDbContext context)
        {
            context.Categories.AddRange(GetSeedingCategories());
            context.SaveChanges();
        }

        public static void ReinitializeDbForTests(ApplicationDbContext context)
        {
            context.Categories.RemoveRange(context.Categories);
            InitializeDbForTests(context);
        }

        public static List<Category> GetSeedingCategories()
        {
            return new List<Category>
            {
                new Category { Name = "Test category 1" },
            };
        }
    }
}
