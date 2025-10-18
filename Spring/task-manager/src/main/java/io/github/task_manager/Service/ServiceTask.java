package io.github.task_manager.Service;

import io.github.task_manager.Model.Status;
import io.github.task_manager.Model.TaskEntity;
import io.github.task_manager.Repository.RepositoryTask;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ServiceTask {

    private final RepositoryTask repositoryTask;

    public ServiceTask(RepositoryTask repositoryTask) {
        this.repositoryTask = repositoryTask;
    }

    // Criar nova tarefa
    public TaskEntity createTask(TaskEntity task) {
        task.setId_tarefa(UUID.randomUUID());
        task.setStatus(task.getStatus() != null ? task.getStatus() : Status.PENDING);
        return repositoryTask.save(task);
    }

    // Alternativa para addTask, apenas delega para createTask
    public TaskEntity addTask(TaskEntity task) {
        return createTask(task);
    }

    // Atualizar tarefa existente
    public TaskEntity updateTask(UUID id, TaskEntity updatedTask) {
        TaskEntity existingTask = repositoryTask.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        existingTask.setNameTask(updatedTask.getNameTask());
        existingTask.setDescriptionTask(updatedTask.getDescriptionTask());
        existingTask.setStatus(updatedTask.getStatus());

        return repositoryTask.save(existingTask);
    }

    // Buscar tarefa pelo ID
    public TaskEntity getTaskById(UUID id) {
        return repositoryTask.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));
    }

    // Buscar tarefa opcional pelo ID
    public Optional<TaskEntity> getTask(UUID id) {
        return repositoryTask.findById(id);
    }

    // Buscar todas as tarefas
    public List<TaskEntity> getAllTasks() {
        return repositoryTask.findAll();
    }

    // Deletar tarefa
    public void deleteTask(UUID id) {
        repositoryTask.deleteById(id);
    }
}
