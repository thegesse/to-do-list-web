package com.goose.todo.model;


import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class Task {
    private int id;
    private String name;
    private String description;
}
