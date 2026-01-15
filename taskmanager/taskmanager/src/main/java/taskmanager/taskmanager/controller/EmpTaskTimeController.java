package taskmanager.taskmanager.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import taskmanager.taskmanager.dto.EmpTaskTimeRequest;
// import taskmanager.taskmanager.model.Employee;
import taskmanager.taskmanager.model.EmpTaskTime;
import taskmanager.taskmanager.repository.EmpTaskTimeRepository;

// import jakarta.validation.Valid;
import java.util.List;


@RestController
@RequestMapping("/api/emp_task_time")
@CrossOrigin(origins = "http://localhost:3000")
public class EmpTaskTimeController {

    private final EmpTaskTimeRepository repo;

    public EmpTaskTimeController(EmpTaskTimeRepository repo) {
        this.repo = repo;
    }

    @PostMapping
    public ResponseEntity<?> save(
        @RequestBody  EmpTaskTimeRequest request
    ) {
        EmpTaskTime time = new EmpTaskTime();
        time.setEmpFkey(request.getEmpFkey());
        time.setTaskFkey(request.getTaskFkey());
        time.setStartTime(request.getStartTime());
        time.setEndTime(request.getEndTime());
        time.setDurationMinutes(request.getDurationMinutes());

        return ResponseEntity.ok(repo.save(time));
    }

    @GetMapping("/task/{id}")
    public List<EmpTaskTime> getByTask(@PathVariable Integer id) {
        return repo.findByTaskFkey(id);
    }
}
