using System;

namespace TodoApp.Models
{
  public class Todo
  {
    // Note: [GraphQLNonNullType] is not necessary.  If the value can't be
    // null (no ?), then GraphQL won't make it nullable in the schema
    public int Id { get; set; }

    public string Title { get; set; }

    public string Description { get; set; }

    // Should be a statusId foreign key into a Statuses table, only a few statuses exist, so it
    // would reduce the amount of data we need to store (single btye instead of several)
    public string Status { get; set; }

    public DateTime DueDate { get; set; }
  }

  // I think it will be best to define the statuses here and then get them on the front end.
  // This means I won't have to hard code them in several places in the frontend and make 
  // adding new status easier.  This isn't really necessary, though.  
  /*
  public struct Statuses
  {
    public static string TODO => "Todo";
    public static string INPROGRESS => "In Progress";
    public static string COMPLETED => "Completed";
  }
  */
}