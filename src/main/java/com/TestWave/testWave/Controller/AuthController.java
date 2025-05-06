package com.TestWave.testWave.Controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.TestWave.testWave.DTO.RegisterRequest;
import com.TestWave.testWave.Model.User;
import com.TestWave.testWave.Model.Role;
import com.TestWave.testWave.Model.OtpEntity;
import com.TestWave.testWave.Repository.OtpRepository;
import com.TestWave.testWave.Repository.UserRepository;
import com.TestWave.testWave.Security.JwtUtils;
import com.TestWave.testWave.Service.UserService;
import com.TestWave.testWave.Service.EmailService;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class AuthController {

    private final UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OtpRepository otpRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtils jwtUtils;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    // Step 1: Send OTP for signup
    @PostMapping("/send-signup-otp")
    public ResponseEntity<?> sendSignupOtp(@RequestBody RegisterRequest request) {
        String email = request.getEmail();

        if (userRepository.existsByEmail(email)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", "User already exists"));
        }

        otpRepository.deleteByEmail(email); // Clear previous OTPs

        String otp = generateOtp();
        OtpEntity otpEntity = new OtpEntity(email, otp);
        otpRepository.save(otpEntity);

        emailService.sendEmail(email, "Your Signup OTP", "Your signup OTP is: " + otp);

        return ResponseEntity.ok(Map.of("message", "OTP sent to your email for verification"));
    }

    // Step 2: Verify signup OTP and create user
    @PostMapping("/verify-signup-otp")
    public ResponseEntity<?> verifySignupOtpAndRegister(@RequestBody RegisterRequest request) {
        String email = request.getEmail();
        String otp = request.getOtp().trim();

        Optional<OtpEntity> otpEntityOptional = otpRepository.findTopByEmailOrderByCreatedAtDesc(email);

        if (otpEntityOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", "OTP not found. Please request a new one."));
        }

        OtpEntity storedOtp = otpEntityOptional.get();
        if (!storedOtp.getOtp().trim().equals(otp.trim()) || storedOtp.isExpired()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", "Invalid or expired OTP"));
        }

        // Register the user
        userService.registerUser(email, request.getPassword(), request.getRole());

        // Delete OTP after successful verification
        otpRepository.deleteByEmail(email);

        return ResponseEntity.ok(Map.of("message", "Signup successful!"));
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> loginUser(@RequestBody RegisterRequest request) {
        Map<String, String> response = new HashMap<>();
        try {
            Optional<User> userOptional = userRepository.findByEmail(request.getEmail());

            if (userOptional.isEmpty()) {
                response.put("error", "Invalid credentials");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
            }

            User user = userOptional.get();
            boolean authenticated = userService.authenticateUser(request.getEmail(), request.getPassword());

            if (authenticated) {
                String token = jwtUtils.generateToken(request.getEmail());

                String expectedRedirectUrl = user.getRole() == Role.STUDENT ? "/studentdashboard" : "/dashboard";

                if ((request.getRole() == Role.STUDENT && user.getRole() != Role.STUDENT) ||
                        (request.getRole() == Role.TEACHER && user.getRole() != Role.TEACHER)) {
                    response.put("error", "Access denied: Unauthorized role.");
                    return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);
                }

                response.put("message", "Login successful!");
                response.put("token", token);
                response.put("redirectUrl", expectedRedirectUrl);

                return ResponseEntity.ok(response);
            } else {
                response.put("error", "Invalid credentials");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
            }
        } catch (Exception e) {
            response.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    // OTP flow for password reset (unchanged)
    @Transactional
    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        Optional<User> userOptional = userRepository.findByEmail(email);

        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", "No user found with this email"));
        }

        otpRepository.deleteByEmail(email);

        String otp = generateOtp();

        OtpEntity otpEntity = new OtpEntity(email, otp);
        otpRepository.save(otpEntity);

        emailService.sendEmail(email, "Your Password Reset OTP", "Your OTP is: " + otp);

        return ResponseEntity.ok(Map.of("message", "Password reset email sent!"));
    }


    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOtp(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String otp = request.get("otp").trim();

        Optional<OtpEntity> otpEntityOptional = otpRepository.findTopByEmailOrderByCreatedAtDesc(email);

        if (otpEntityOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", "OTP not found. Please request a new one."));
        }

        OtpEntity storedOtp = otpEntityOptional.get();

        if (!storedOtp.getOtp().trim().equals(otp.trim()) || storedOtp.isExpired()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", "Invalid or expired OTP"));
        }

        return ResponseEntity.ok(Map.of("message", "OTP verified. You can now reset your password!"));
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String newPassword = request.get("newPassword");

        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", "User not found"));
        }

        User user = userOptional.get();
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);

        return ResponseEntity.ok(Map.of("message", "Password updated successfully!"));
    }

    private String generateOtp() {
        return String.valueOf(new Random().nextInt(900000) + 100000);
    }
}
