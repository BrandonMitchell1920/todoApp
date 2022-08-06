using System;
using System.Linq;
using Microsoft.Extensions.DependencyInjection;

using TodoApp.Models;

namespace TodoApp.Database
{
  public class SeedDataGenerator
  {
    public static void Initialize(IServiceProvider serviceProvider)
    {
      using (TodoDbContext dbContext = serviceProvider.GetRequiredService<TodoDbContext>())
      {
        // Seed the DB with some Todos if they don't exist yet
        if (dbContext.Todos.Any())
        {
          return;
        }

        dbContext.Todos.AddRange(
          new Todo()
          {
            Title = "Walk the Cat",
            Description = "Smokey seems to have gotten a bit of a belly.  I should walk her around the neighborhood.",
            Status = "Todo",
            DueDate = DateTime.Now,
          },
          new Todo()
          {
            Title = "Dispose of Nacho Cheese",
            Description = "Take the five gallons of cheddar cheese sauce to the local creek and pour it in.  Wear black and don't be seen.",
            Status = "Todo",
            DueDate = DateTime.Now.AddDays(1),
          },
          new Todo()
          {
            Title = "Find the Rat King",
            Description = "Rumor has it that a rat king is living in one of the Asian resturants in the area.  Find and document the beast.",
            Status = "In Progress",
            DueDate = DateTime.Now.AddDays(7),
          },
          new Todo()
          {
            Title = "Complete Todo App",
            Description = "As part of Grid's onboarding, I need to complete a todo app using their tech stack.",
            Status = "In Progress",
            DueDate = DateTime.Now.AddDays(14),
          },
          new Todo()
          {
            Title = "Purchase 100 Soulja Boy Consoles to Scalp",
            Description = "Scalp the consoles and sell them on eBay for outrageous prices.  Also convince the community they are a hot buy.",
            Status = "Complete",
            DueDate = DateTime.Now.AddDays(-3),
          }
        );

        dbContext.SaveChanges();
      }
    }
  }
}