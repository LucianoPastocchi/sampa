package com.sampa.controller;

import com.sampa.entity.SampaUser;
import com.sampa.enums.Role;
import com.sampa.exception.SampaException;
import com.sampa.model.LoginRequest;
import com.sampa.model.SampaUserModel;
import com.sampa.service.SampaUserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/sampa/user")
@RequiredArgsConstructor
public class SampaUserController {

    private final SampaUserService sampaUserService;

    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@Valid @RequestBody SampaUserModel userModel) {
        try {
            //TODO - REVISAR
            userModel.setRole(Role.PET_OWNER);
            SampaUser createdUser = sampaUserService.createUser(userModel);
            return ResponseEntity.ok(createdUser);
        } catch (SampaException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            SampaUser user = sampaUserService.authenticate(loginRequest.getIdentifier(), loginRequest.getPassword());
            return ResponseEntity.ok(user);
        } catch (SampaException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }


    @PutMapping("/{username}")
    public ResponseEntity<?> updateUser(@PathVariable String username, @Valid @RequestBody SampaUserModel userModel) {
        try {
            userModel.setUserName(username); // Ensure username consistency
            SampaUser updatedUser = sampaUserService.updateUser(userModel);
            return ResponseEntity.ok(updatedUser);
        } catch (SampaException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{username}/password")
    public ResponseEntity<?> updatePassword(
            @PathVariable String username,
            @RequestParam String currentPassword,
            @RequestParam String newPassword
    ) {
        try {
            sampaUserService.updatePassword(username, currentPassword, newPassword);
            return ResponseEntity.ok("Password updated successfully");
        } catch (SampaException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{username}")
    public ResponseEntity<?> deleteUser(@PathVariable String username) {
        try {
            sampaUserService.deleteUser(username);
            return ResponseEntity.ok("User deleted successfully");
        } catch (SampaException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/{username}/pets/{petId}")
    public ResponseEntity<?> addPetToUser(@PathVariable String username, @PathVariable Long petId) {
        try {
            sampaUserService.addPetToUser(username, petId);
            return ResponseEntity.ok("Pet added to user successfully");
        } catch (SampaException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
