package taskmanager.taskmanager.controller;

import org.springframework.web.bind.annotation.*;

import taskmanager.taskmanager.dto.TaskRequest;
import taskmanager.taskmanager.model.Employee;
import taskmanager.taskmanager.model.Task;
import taskmanager.taskmanager.repository.TaskRepository;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "http://localhost:3000")
public class TaskController {

    private final TaskRepository taskRepository;

    public TaskController(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    // CREATE TASK
    @PostMapping
    public Task createTask(@RequestBody TaskRequest request) {

        Task task = new Task();
        task.setTaskName(request.getTaskName());
        task.setDescription(request.getDescription());
        task.setDeadline(request.getDeadline());
        task.setStatus("PENDING");
        task.setAssigneeId(request.getAssigneeId());
         task.setEmpName(request.getEmpName());       // EmpName

        // Employee employee = new Employee();
        // employee.setEmployeeId(request.getAssigneeId());
        // task.setAssignee(employee);

// System.out.println("DEBUG EmpName = [" + request.getEmpName() + "]");
// System.out.println("DEBUG AssigneeId = [" + request.getAssigneeId() + "]");


        return taskRepository.save(task);
    }

    // GET ALL TASKS
    @GetMapping
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }
}
