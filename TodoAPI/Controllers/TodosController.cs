using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;

namespace TodoAPI
{
    public class Todo
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public bool Completed { get; set; }
    }
    public class PatchTodo
    {
        public bool Completed { get; set; }
    }
    public class EditTodo
    {
        public string Title { get; set; }
    }



    [ApiController]
    [Route("todos")]
    public class TodosController : ControllerBase
    {
        private static int nextId = 1; // Initialize a counter for generating IDs
        private static List<Todo> todos = new List<Todo>
        {
            new Todo { Id = nextId++.ToString(), Title = "todo 1", Completed = true },
            new Todo { Id = nextId++.ToString(), Title = "todo 2", Completed = false },
            new Todo { Id = nextId++.ToString(), Title = "todo 3", Completed = false },
            new Todo {Id = nextId++.ToString(), Title = "todo 4", Completed = false },
            new Todo {Id = nextId++.ToString(), Title = "todo 5", Completed = false }
        };
        //https://localhost:7170/todos
        [HttpGet]
        public IActionResult GetTodos()
        {
            return Ok(todos);
        }

        [HttpPost]
        public IActionResult AddTodo(Todo todo)
        {
            todo.Id = todo.Id;
            todo.Completed = false;
            todos.Add(todo);
            return Ok(todo);
        }
        //https://localhost:7170/todos/${payload.id}
        [HttpPatch("{id}")]
        public IActionResult UpdateTodoStatus(string id,PatchTodo PatchTodo)
        {
            var todo = todos.Find(t => t.Id == id);
            if (todo != null)
            {
                todo.Completed = PatchTodo.Completed;
                return Ok(todo);
            }
            return NotFound();
        }

        [HttpPut("{id}")]
        public IActionResult UpdateTodoTitle(string id, EditTodo editTodo)
        {
            var todo = todos.Find(t => t.Id == id);
            if (todo != null)
            {
                todo.Title = editTodo.Title;
                return Ok(todo);
            }
            return NotFound();
        }

        //https://localhost:7170/todos/${payload.id}
        [HttpDelete("{id}")]
        public IActionResult DeleteTodoById(string id)
        {
            var index = todos.FindIndex(t => t.Id == id);
            if (index != -1)
            {
                todos.RemoveAt(index);
                return Ok(todos);
            }
            return NotFound();
        }
    }
}