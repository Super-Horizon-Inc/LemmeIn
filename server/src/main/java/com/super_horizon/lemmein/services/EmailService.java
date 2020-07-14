package com.super_horizon.lemmein.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    
    @Autowired
    private JavaMailSender javaMailSender;

    public void sendEmail(String email, String id) {
 
        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setTo(email);
        msg.setSubject("Lemmein");
        msg.setText("Please click on the link below to confirm\n" + "http://localhost:8080/lemmein/customers/" + id + "/edit");
        javaMailSender.send(msg);
    }

}