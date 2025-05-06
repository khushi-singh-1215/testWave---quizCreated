package com.TestWave.testWave.Service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.TestWave.testWave.Model.Role;
import com.TestWave.testWave.Model.User;
import com.TestWave.testWave.Repository.UserRepository;

@Service
public class UserService {
    private final UserRepository userRepository;

    @Autowired
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User registerUser(String email, String password, Role role) {
        if (userRepository.existsByEmail(email)) {
            throw new RuntimeException("Email is already registered.");
        }
        User user = new User();
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password)); // Encrypt password
        user.setRole(role);

        User savedUser = userRepository.save(user);


        System.out.println("User saved with ID: " + savedUser.getId());  // Debugging
        return savedUser;
    }

    public boolean authenticateUser(String email, String password) {
        Optional<User> userOptional = userRepository.findByEmail(email);

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            return passwordEncoder.matches(password, user.getPassword()); // Compare encrypted password
        }
        return false;
    }
}
