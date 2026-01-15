package taskmanager.taskmanager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import taskmanager.taskmanager.model.Feed;

import java.util.List;

public interface FeedRepository extends JpaRepository<Feed, Integer> {
}
