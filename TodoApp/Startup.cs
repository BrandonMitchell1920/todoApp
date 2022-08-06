using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;

using TodoApp.Database;
using TodoApp.GraphQL;

namespace TodoApp
{
  public class Startup
  {
    private readonly IWebHostEnvironment _env;

    public Startup(IWebHostEnvironment env)
    {
      _env = env;
    }

    public void ConfigureServices(IServiceCollection services)
    {
      services
        .AddDbContext<TodoDbContext>(options => options.UseSqlite("Filename=TodoApp.db"))
        .AddCors(options => options.AddPolicy("allowedOrigin", builder => builder.AllowAnyOrigin()))
        .AddGraphQLServer()
          .AddQueryType<Query>()
          .AddMutationType<Mutation>();
    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
      if (env.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();
      }

      app
        .UseCors(corsPolicyBuilder => corsPolicyBuilder.AllowAnyHeader().AllowAnyOrigin().AllowAnyMethod())
        .UseWebSockets()
        .UseRouting()
        .UseEndpoints(endpoints =>  endpoints.MapGraphQL());
    }
  }
}