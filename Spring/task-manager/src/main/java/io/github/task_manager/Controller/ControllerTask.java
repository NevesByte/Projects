package io.github.task_manager.Controller;

import io.github.task_manager.Model.TaskEntity;
import io.github.task_manager.Service.ServiceTask;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/tasks")
public class ControllerTask {

    private final ServiceTask serviceTask;

    public ControllerTask(ServiceTask serviceTask) {
        this.serviceTask = serviceTask;
    }

    @PostMapping
    public ResponseEntity<TaskEntity> addTask(@RequestBody TaskEntity task) {
        return ResponseEntity.ok(serviceTask.addTask(task));
    }

    @PutMapping("/{id}")
    public ResponseEntity<TaskEntity> updateTask(@PathVariable UUID id, @RequestBody TaskEntity task) {
        return ResponseEntity.ok(serviceTask.updateTask(id, task));
    }

    @GetMapping
    public ResponseEntity<List<TaskEntity>> getAllTasks() {
        return ResponseEntity.ok(serviceTask.getAllTasks());
    }

    @GetMapping("/{id}")
    public ResponseEntity<TaskEntity> getTaskById(@PathVariable UUID id) {
        return ResponseEntity.ok(serviceTask.getTaskById(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable UUID id) {
        serviceTask.deleteTask(id);
        return ResponseEntity.noContent().build();
    }
}
