using System.Linq;
using HotChocolate;

using TodoApp.Database;
using TodoApp.Models;

namespace TodoApp.GraphQL
{
  public class Query
  {
    public IQueryable<Todo> GetTodos([Service] TodoDbContext dbContext) => dbContext.Todos;
  }
}
