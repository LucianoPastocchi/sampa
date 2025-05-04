package com.sampa.service;

import com.sampa.entity.Pet;
import com.sampa.entity.SampaUser;
import com.sampa.exception.SampaException;
import com.sampa.model.SampaUserModel;
import com.sampa.repository.PetRepository;
import com.sampa.repository.SampaUserRepository;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class SampaUserService extends BaseService<SampaUser, Long> {

    private final SampaUserRepository sampaUserRepository;
    private final PetRepository petRepository;
    private final PasswordEncoder passwordEncoder;

    public SampaUserService(SampaUserRepository sampaUserRepository, PetRepository petRepository, PasswordEncoder passwordEncoder) {
        super(sampaUserRepository);
        this.sampaUserRepository = sampaUserRepository;
        this.petRepository = petRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public SampaUser updateUser(SampaUserModel user) throws SampaException {

        try {
            SampaUser existingUser = sampaUserRepository.findByUserName(user.getUserName())
                    .orElseThrow(() -> new SampaException("User not found with username: " + user.getUserName()));

            if (user.getIdCard() != null && !user.getIdCard().isEmpty()) {
                existingUser.setIdCard(user.getIdCard());
            }
            if (user.getName() != null && !user.getName().isEmpty()) {
                existingUser.setName(user.getName());
            }
            if (user.getLastname() != null && !user.getLastname().isEmpty()) {
                existingUser.setLastname(user.getLastname());
            }
            if (user.getEmail() != null && !user.getEmail().isEmpty()) {
                existingUser.setEmail(user.getEmail());
            }
            if (user.getRole() != null && user.getRole().getDescription() != null && !user.getRole().getDescription().isEmpty()) {
                existingUser.setRole(user.getRole().getDescription());
            }
            if (user.getPhone() != null && !user.getPhone().isEmpty()) {
                existingUser.setPhone(user.getPhone());
            }
            if (user.getAddress() != null && !user.getAddress().isEmpty()) {
                existingUser.setAddress(user.getAddress());
            }


            sampaUserRepository.save(existingUser);
            log.info("User updated successfully: id={}, email={}", existingUser.getId(), existingUser.getEmail());
            return existingUser;

        } catch (Exception e) {
            log.error("Failed to update user: userName={}, error={}", user.getUserName(), e.getMessage(), e);
            throw new SampaException("Could not update user");
        }
    }

    public void updatePassword(String userName, String currentPassword, String newPassword) throws SampaException {
        SampaUser user = sampaUserRepository.findByUserName(userName)
                .orElseThrow(() -> new SampaException("User not found"));

        if (!passwordEncoder.matches(currentPassword, user.getPassword())) {
            throw new SampaException("Current password is incorrect");
        }

        String hashedPassword = passwordEncoder.encode(newPassword);
        user.setPassword(hashedPassword);

        sampaUserRepository.save(user);
        log.info("Password updated successfully for user ={}", userName);
    }


    public void deleteUser(String userName) throws SampaException {
        try {
            sampaUserRepository.deleteByUsername(userName);
            log.info("User {} deleted successfully", userName);
        } catch (Exception e) {
            log.error("Failed to delete user: userName={}, error={}", userName, e.getMessage(), e);
            throw new SampaException("Could not delete user " + userName);
        }
    }

    @Transactional
    public void addPetToUser(String userName, Long petId) throws SampaException {

        SampaUser user = sampaUserRepository.findByUserName(userName)
                .orElseThrow(() -> new SampaException("User not found"));

        Pet pet = petRepository.findById(petId)
                .orElseThrow(() -> new SampaException("Pet not found"));

        pet.setOwner(user);

        petRepository.save(pet);

        user.getPets().add(pet);
    }


}
