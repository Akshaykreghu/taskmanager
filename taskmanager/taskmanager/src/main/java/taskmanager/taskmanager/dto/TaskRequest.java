// import com.fasterxml.jackson.annotation.JsonFormat;
// import java.time.LocalDateTime;

// public class TaskRequest {

//     private String taskName;
//     private String description;

//     @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
//     private LocalDateTime deadline;

//     private Integer assigneeId;

//     // getters & setters
// }

// package taskmanager.taskmanager.dto;

// import com.fasterxml.jackson.annotation.JsonFormat;
// import java.time.LocalDateTime;

// public class TaskRequest {
//     private String taskName;
//     private String description;

//     @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
//     private LocalDateTime deadline;

//     private Integer assigneeId;

//     // getters & setters
// }


package taskmanager.taskmanager.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.time.LocalDateTime;

public class TaskRequest {

    @JsonProperty("task_name")
    private String taskName;
    private String description;

    private String status;
    



    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime deadline;

    @JsonProperty("EmpName")
    private String EmpName;

    @JsonProperty("assignee_id")
    private Integer assigneeId;

    // ✅ Getters
    public String getTaskName() { return taskName; }
    public String getDescription() { return description; }
    public LocalDateTime getDeadline() { return deadline; }
    public Integer getAssigneeId() { return assigneeId; }
    public String getStatus() { return status; }
     public String getEmpName() { return EmpName; }
    
    // public String getAttachment() { return attachment; }


    // ✅ Setters
    public void setTaskName(String taskName) { this.taskName = taskName; }
    public void setDescription(String description) { this.description = description; }
    public void setDeadline(LocalDateTime deadline) { this.deadline = deadline; }
    public void setAssigneeId(Integer assigneeId) { this.assigneeId = assigneeId; }
    public void setStatus(String status) { this.status = status; }
     public void setEmpName(String EmpName) { this.EmpName = EmpName; }
    // public void setAttachment(String attachment) { this.attachment = attachment; }
}

