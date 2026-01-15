package taskmanager.taskmanager.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.nio.charset.StandardCharsets;

@RestController
@RequestMapping("/api/proxy")
public class EmployeeProxyController {

    @GetMapping("/employees")
    public ResponseEntity<String> getEmployees() throws IOException {
        // External API URL
        String url = "https://v1.mypayrollmaster.online/api/v2qa/employees_list?user_id=GLET100056";

        try (InputStream in = new URL(url).openStream()) {
            String result = new String(in.readAllBytes(), StandardCharsets.UTF_8);
            return ResponseEntity.ok(result);
        }
    }
}
