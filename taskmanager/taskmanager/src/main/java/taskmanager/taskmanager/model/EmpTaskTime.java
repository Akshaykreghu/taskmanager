package taskmanager.taskmanager.model;
import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.LocalDateTime;


@Entity
@Table(name = "emp_task_time")
public class EmpTaskTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "time_id")
    private Integer timeId;

    @Column(name = "emp_fkey", nullable = false)
    private Integer empFkey;

    @Column(name = "task_fkey", nullable = false)
    private Integer taskFkey;

    @Column(name = "start_time", nullable = false)
    private LocalDateTime startTime;

    @Column(name = "end_time", nullable = false)
    private LocalDateTime endTime;

    @Column(name = "duration_minutes", nullable = false)
    private Integer durationMinutes;

    @Column(name = "created_date")
    private LocalDateTime createdDate = LocalDateTime.now();

    // getters & setters

    public Integer getEmpFkey() {
        return empFkey;
    }

    public void setEmpFkey(Integer empFkey) {
        this.empFkey = empFkey;
    }

    public Integer getTaskFkey() {
        return taskFkey;
    }

    public void setTaskFkey(Integer taskFkey) {
        this.taskFkey = taskFkey;
    }

    public LocalDateTime getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalDateTime startTime) {
        this.startTime = startTime;
    }

    public LocalDateTime getEndTime() {
        return endTime;
    }

    public void setEndTime(LocalDateTime endTime) {
        this.endTime = endTime;
    }

    public Integer getDurationMinutes() {
        return durationMinutes;
    }

    public void setDurationMinutes(Integer durationMinutes) {
        this.durationMinutes = durationMinutes;
    }
}
