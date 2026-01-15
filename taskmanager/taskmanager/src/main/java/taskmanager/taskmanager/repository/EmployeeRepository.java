package taskmanager.taskmanager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import taskmanager.taskmanager.model.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Integer> {
}
