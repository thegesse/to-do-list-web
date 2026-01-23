package com.goose.todo.service;

import com.goose.todo.model.Task;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TaskService {
    private final List<Task> tasks = new ArrayList<>();
    private int currentId = 0;

    public Task addTask(Task task) {
        task.setId(currentId++);
        tasks.add(task);
        return task;
    }

    public void deleteTask(Integer id) {
        tasks.removeIf(task -> task.getId().equals(id));
    }

    public List<Task> getAllTasks() {
        return new ArrayList<>(tasks);
    }
}
