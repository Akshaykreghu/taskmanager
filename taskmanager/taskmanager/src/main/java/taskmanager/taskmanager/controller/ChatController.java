package taskmanager.taskmanager.controller;

import taskmanager.taskmanager.model.ChatMessage;
import taskmanager.taskmanager.repository.ChatMessageRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {

    @Autowired
    private ChatMessageRepository chatMessageRepository;

    // Receives messages from React frontend
    @MessageMapping("/send-message")
    @SendTo("/topic/public") // broadcasts to subscribers
    public ChatMessage sendMessage(ChatMessage message) {

        // 🔹 Log sender, receiver & company IDs
        System.out.println(
                "Chat | SenderEmp: " + message.getSender() +
                        " | ReceiverEmp: " + message.getReceiver() +
                        " | Message: " + message.getContent()
        );

        // 🔹 Save message to DB
        ChatMessage savedMessage = chatMessageRepository.save(message);

        // 🔹 Broadcast saved message
        return savedMessage;
    }
}
