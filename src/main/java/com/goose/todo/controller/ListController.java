package com.goose.todo.controller;

import com.goose.todo.model.Task;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/tasks")
@CrossOrigin(origins = "*")
public class ListController {
    private final List<Task> taskList = new ArrayList<>();
    private int currentId = 0;

    @PostMapping
    public Task addTask(@RequestBody Task task) {
        task.setId(++currentId);
        taskList.add(task);
        return task;
    }

    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable int id) {
        taskList.removeIf(task -> task.getId() == id);
    }

    @GetMapping
    public List<Task> getAllTasks() {
        return taskList;
    }


}
