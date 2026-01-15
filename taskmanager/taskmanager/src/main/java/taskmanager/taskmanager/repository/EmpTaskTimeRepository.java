// import org.springframework.data.jpa.repository.JpaRepository;
// import org.springframework.stereotype.Repository;


// @Repository
// public interface EmpTaskTimeRepository
//         extends JpaRepository<EmpTaskTime, Integer> {

//     List<EmpTaskTime> findByTaskFkey(Integer taskFkey);
// }


package taskmanager.taskmanager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import taskmanager.taskmanager.model.EmpTaskTime;

import java.util.List;

public interface EmpTaskTimeRepository
        extends JpaRepository<EmpTaskTime, Integer> {

    List<EmpTaskTime> findByTaskFkey(Integer taskFkey);
}