package io.github.task_manager.Model;

import jakarta.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "task")
public class TaskEntity {

    @Id
    private UUID id_tarefa;

    @Column(name = "name_task", nullable = false)
    private String nameTask;

    @Column(name = "description_task")
    private String descriptionTask;

    @Enumerated(EnumType.STRING)
    private Status status;

    @Version
    private Long version; // <-- ADICIONE ISSO PARA LOCKING

    // getters e setters
    public UUID getId_tarefa() { return id_tarefa; }
    public void setId_tarefa(UUID id_tarefa) { this.id_tarefa = id_tarefa; }

    public String getNameTask() { return nameTask; }
    public void setNameTask(String nameTask) { this.nameTask = nameTask; }

    public String getDescriptionTask() { return descriptionTask; }
    public void setDescriptionTask(String descriptionTask) { this.descriptionTask = descriptionTask; }

    public Status getStatus() { return status; }
    public void setStatus(Status status) { this.status = status; }

    public Long getVersion() { return version; }
    public void setVersion(Long version) { this.version = version; }
}
