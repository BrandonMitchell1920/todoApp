using Microsoft.EntityFrameworkCore;

using TodoApp.Models;

namespace TodoApp.Database
{
  public sealed class TodoDbContext : DbContext
  {
    public TodoDbContext(DbContextOptions<TodoDbContext> options) : base(options)
    {
      Database.EnsureCreated();
    }

    public DbSet<Todo> Todos { get; set; }
  }
}