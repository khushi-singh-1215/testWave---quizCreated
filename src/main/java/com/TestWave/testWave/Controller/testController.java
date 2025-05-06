package com.TestWave.testWave.Controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/test")
public class testController {
    @GetMapping("/protected-endpoint")
    @PreAuthorize("hasAnyRole('Teacher', 'Student')")
    public String protectedEndpoint(){
        return "Access granted!You are authenticated";
        
    }

}
