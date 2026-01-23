package com.goose.todo.controller;

import com.goose.todo.model.Task;
import com.goose.todo.service.TaskService;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/tasks")
@CrossOrigin(origins = "*")
public class ListController {
    private final TaskService taskService;

    public ListController(TaskService taskService) {
        this.taskService = taskService;
    }

    @PostMapping
    public Task addTask(@RequestBody Task task) {
        return taskService.addTask(task);
    }

    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Integer id) {
        taskService.deleteTask(id);
    }

    @GetMapping
    public List<Task> getTasks() {
        return taskService.getAllTasks();
    }
}
