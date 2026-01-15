// package taskmanager.taskmanager.model;

// import jakarta.persistence.*;

// @Entity
// @Table(name = "employees")
// public class Employee {

//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     @Column(name = "employee_id")
//     private Integer employeeId;

//     @Column(name = "full_name")
//     private String fullName;

//     @Column(name = "email")
//     private String email;

//     @Column(name = "password")
//     private String password;

//     // getters & setters
//     public Integer getEmployeeId() { return employeeId; }
//     public void setEmployeeId(Integer employeeId) { this.employeeId = employeeId; }

//     public String getFullName() { return fullName; }
//     public void setFullName(String fullName) { this.fullName = fullName; }

//     public String getEmail() { return email; }
//     public void setEmail(String email) { this.email = email; }

//     public String getPassword() { return password; }
//     public void setPassword(String password) { this.password = password; }
// }


package taskmanager.taskmanager.model;

import jakarta.persistence.*;

@Entity
@Table(name = "employees")
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "employee_id")
    private Integer employeeId;

    @Column(name = "full_name")
    private String fullName;

    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;

    // getters & setters
    public Integer getEmployeeId() { return employeeId; }
    public void setEmployeeId(Integer employeeId) { this.employeeId = employeeId; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}
