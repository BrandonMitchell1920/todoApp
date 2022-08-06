class Todo
{
  id: number;
  title: string;
  description: string;
  status: string;

  // This is technically a string because JSON doesn't have date types.
  // However, Typescript doesn't seem to really notice until I use Date's methods
  // I can convert it to a "string" easily, but can't use use string methods until then
  dueDate: Date;

  // Used for indexing in sort method
  [key: string]: string | number | Date;
  
  constructor(id: number, title: string, description: string, status: string, dueDate: Date)
  {
    this.id = id;
    this.title = title;
    this.description = description;
    this.status = status;
    this.dueDate = dueDate;
  }
};

export default Todo;