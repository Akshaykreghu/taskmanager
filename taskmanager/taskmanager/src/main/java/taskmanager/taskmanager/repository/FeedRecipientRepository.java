package taskmanager.taskmanager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import taskmanager.taskmanager.model.FeedRecipient;

import java.util.List;

public interface FeedRecipientRepository extends JpaRepository<FeedRecipient, Integer> {
}
