using System;
using System.Threading.Tasks;
using HotChocolate;

using TodoApp.Database;
using TodoApp.Models;

namespace TodoApp.GraphQL
{
  public class Mutation
  {
    public async Task<bool> CreateTodoAsync([Service] TodoDbContext dbContext, string title, string description, string status, DateTime dueDate)
    {
      dbContext.Todos.Add(new Todo { Title = title, Description = description, Status = status, DueDate = dueDate });
      await dbContext.SaveChangesAsync();
      return true;
    }

    public async Task<bool> DeleteTodoByIdAsync([Service] TodoDbContext dbContext, int id)
    {
      dbContext.Todos.Remove(new Todo { Id = id });
      await dbContext.SaveChangesAsync();
      return true;
    }

    // May be best to allow the user to update a specific field, might be more efficient than updating everything, but
    // then need to make extra mutators and check on the front end for the specific changes
    public async Task<bool> UpdateTodoAsync([Service] TodoDbContext dbContext, int id, string title, string description, string status, DateTime dueDate)
    {
      dbContext.Todos.Update(new Todo { Id = id, Title = title, Description = description, Status = status, DueDate = dueDate });
      await dbContext.SaveChangesAsync();
      return true;
    }
  }
}
