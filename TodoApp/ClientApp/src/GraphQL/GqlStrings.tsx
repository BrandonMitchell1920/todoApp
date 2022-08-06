import { gql } from '@apollo/client';

// Returns a list of Todos
export const GET_TODOS = gql
`
  query GetTodos
  {
    todos
    {
      id
      title
      description
      status
      dueDate
    }
  }
`;

// Returns a bool
export const DELETE_TODO = gql
`
  mutation DeleteTodoById($id: Int!) 
  {
    deleteTodoById(id: $id)
  }
`;

// Returns a bool
export const CREATE_TODO = gql
`
  mutation CreateTodo($title: String!, $description: String!, $status: String!, $dueDate: DateTime!) 
  {
    createTodo(title: $title, description: $description, status: $status, dueDate: $dueDate)
  }
`;

// Returns a bool
export const UPDATE_TODO = gql
`
  mutation updateTodo($id: Int!, $title: String!, $description: String!, $status: String!, $dueDate: DateTime!) 
  {
    updateTodo(id: $id, title: $title, description: $description, status: $status, dueDate: $dueDate)
  }
`;