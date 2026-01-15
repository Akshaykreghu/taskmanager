
package taskmanager.taskmanager.dto;
import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.LocalDateTime;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class FeedRequest {

    private String message;
    private String recipientType; // ALL | SELECTED
    private List<Integer> recipientIds;

    // getters & setters
    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getRecipientType() {
        return recipientType;
    }

    public void setRecipientType(String recipientType) {
        this.recipientType = recipientType;
    }

    public List<Integer> getRecipientIds() {
        return recipientIds;
    }

    public void setRecipientIds(List<Integer> recipientIds) {
        this.recipientIds = recipientIds;
    }
}
