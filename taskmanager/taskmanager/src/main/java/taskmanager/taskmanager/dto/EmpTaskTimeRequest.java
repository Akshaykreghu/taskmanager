package taskmanager.taskmanager.dto;
import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.LocalDateTime;
import com.fasterxml.jackson.annotation.JsonProperty;

public class EmpTaskTimeRequest {

    private Integer empFkey;
    private Integer taskFkey;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm")
    private LocalDateTime startTime;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm")
    private LocalDateTime endTime;

    private Integer durationMinutes;

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
