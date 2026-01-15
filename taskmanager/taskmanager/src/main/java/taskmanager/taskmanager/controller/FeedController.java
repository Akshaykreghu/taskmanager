package taskmanager.taskmanager.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import taskmanager.taskmanager.dto.FeedRequest;
import taskmanager.taskmanager.service.FeedService;
import taskmanager.taskmanager.model.Feed;
import taskmanager.taskmanager.repository.FeedRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;

// import jakarta.validation.Valid;
import java.util.List;

import java.util.Map;

@RestController
@RequestMapping("/api/feeds")
@CrossOrigin(origins = "http://localhost:3000")
public class FeedController {

    @Autowired
    private FeedService feedService;

    @PostMapping
    public ResponseEntity<?> createFeed(
            @RequestBody FeedRequest dto,
            HttpServletRequest request
    ) {
        // Example: get from session/JWT
        Integer senderId = (Integer) request.getAttribute("emp_fkey");
        if (senderId == null) senderId = 1; // TEMP for testing

        feedService.createFeed(dto, senderId);

        return ResponseEntity.ok(
            Map.of(
                "success", true,
                "message", "Feed sent successfully"
            )
        );
    }
}
