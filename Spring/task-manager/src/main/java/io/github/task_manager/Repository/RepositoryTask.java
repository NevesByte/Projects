package io.github.task_manager.Repository;

import io.github.task_manager.Model.TaskEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.UUID;

@Repository
public interface RepositoryTask extends JpaRepository<TaskEntity, UUID> {
}
