
package taskmanager.taskmanager.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "tasks")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "task_id")
    private Long id;

    private String status;
    
    @Column(name = "attachment")
    private String attachment;

    @Column(name = "task_name")
    private String taskName;

    private String description;
    private LocalDateTime deadline;

    // @ManyToOne(fetch = FetchType.LAZY)
    // @JoinColumn(name = "assignee_id", referencedColumnName = "employee_id")
    // @JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "password"})
    // private Employee assignee;

    @Column(name = "assignee_id")
    private Integer assigneeId;

    @Column(name = "EmpName")
    private String EmpName;       // EmpName from API


    // getters & setters
    public Long getId() { return id; }

    public String getTaskName() { return taskName; }
    public void setTaskName(String taskName) { this.taskName = taskName; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public LocalDateTime getDeadline() { return deadline; }
    public void setDeadline(LocalDateTime deadline) { this.deadline = deadline; }

    public String getEmpName() { return EmpName; }
    public void setEmpName(String EmpName) { this.EmpName = EmpName; }

    // public Employee getAssignee() { return assignee; }
    // public void setAssignee(Employee assignee) { this.assignee = assignee; }
    

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Integer getAssigneeId() {
        return assigneeId;
    }
     public void setAssigneeId(Integer assigneeId) {
        this.assigneeId = assigneeId;
    }
    

    public String getAttachment() { return attachment; }
    public void setAttachment(String attachment) { this.attachment = attachment; }
}
