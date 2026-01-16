package taskmanager.taskmanager.controller;

import taskmanager.taskmanager.model.ChatMessage;
import taskmanager.taskmanager.repository.ChatMessageRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.security.Principal;

@Controller
public class ChatController {

    @Autowired
    private ChatMessageRepository chatMessageRepository;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    // Create a DTO class (can be inner class or separate file)
    public record ChatPayload(Long id, String sender, String receiver, String content) {}

    @MessageMapping("/send-message")
    public void sendMessage(ChatMessage message, Principal principal) {
        System.out.println("Principal name      : " + principal.getName());
        System.out.println("Message sender      : " + message.getSender());
        System.out.println("Message receiver    : " + message.getReceiver());
        ChatMessage savedMessage = chatMessageRepository.save(message);

        ChatPayload payload = new ChatPayload(
                savedMessage.getId(),
                savedMessage.getSender(),
                savedMessage.getReceiver(),
                savedMessage.getContent()
        );

        messagingTemplate.convertAndSendToUser(message.getReceiver(), "/queue/messages", payload);
        messagingTemplate.convertAndSendToUser(message.getSender(), "/queue/messages", payload);
    }

}
