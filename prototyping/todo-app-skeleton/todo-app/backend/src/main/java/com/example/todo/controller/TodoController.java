package com.example.todo.controller;

import org.springframework.web.bind.annotation.*;
import com.example.todo.model.Todo;
import com.example.todo.service.TodoService;

import java.util.List;

@RestController
@RequestMapping("/api/todos")
public class TodoController {

    private final TodoService service;

    public TodoController(TodoService service) {
        this.service = service;
    }

    @GetMapping
    public List<Todo> getTodos() {
        return service.getAll();
    }

    @PostMapping
    public Todo addTodo(@RequestBody Todo todo) {
        return service.add(todo);
    }

    @DeleteMapping("/{id}")
    public void deleteTodo(@PathVariable Long id) {
        service.delete(id);
    }
    @PutMapping("/{id}")
    public Todo updateTodo(@PathVariable Long id, @RequestBody Todo updatedTodo) {
        updatedTodo.setId(id);
        return service.add(updatedTodo); // reuse save logic
    }
    @GetMapping("/filter")
      public List<Todo> filterByStatus(@RequestParam boolean completed) {
        return service.getByCompleted(completed);
    }


}
