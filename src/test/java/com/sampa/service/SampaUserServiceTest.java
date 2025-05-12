package com.sampa.service;

import com.sampa.entity.Pet;
import com.sampa.entity.SampaUser;
import com.sampa.exception.SampaException;
import com.sampa.model.SampaUserModel;
import com.sampa.repository.PetRepository;
import com.sampa.repository.SampaUserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.ArrayList;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class SampaUserServiceTest {

    @InjectMocks
    private SampaUserService sampaUserService;

    @Mock
    private SampaUserRepository sampaUserRepository;

    @Mock
    private PetRepository petRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @BeforeEach
    void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testUpdateUser_success() throws SampaException {
        SampaUserModel model = new SampaUserModel();
        model.setUserName("johnDoe");
        model.setName("John");
        model.setEmail("john@example.com");
        // set other fields...

        SampaUser user = new SampaUser();
        user.setUserName("johnDoe");

        when(sampaUserRepository.findByUserName("johnDoe")).thenReturn(Optional.of(user));
        when(sampaUserRepository.save(any(SampaUser.class))).thenReturn(user);

        SampaUser updated = sampaUserService.updateUser(model);

        assertNotNull(updated);
        verify(sampaUserRepository).save(user);
    }

    @Test
    void testUpdatePassword_success() throws SampaException {
        SampaUser user = new SampaUser();
        user.setUserName("johndoe");
        user.setPassword("hashed_current");

        when(sampaUserRepository.findByUserName("johnDoe")).thenReturn(Optional.of(user));
        when(passwordEncoder.matches("current123", "hashed_current")).thenReturn(true);
        when(passwordEncoder.encode("new123")).thenReturn("hashed_new");

        sampaUserService.updatePassword("johnDoe", "current123", "new123");

        verify(sampaUserRepository).save(user);
        assertEquals("hashed_new", user.getPassword());
    }

    @Test
    void testUpdatePassword_wrongCurrentPassword() {
        SampaUser user = new SampaUser();
        user.setUserName("johnDoe");
        user.setPassword("hashed_current");

        when(sampaUserRepository.findByUserName("johnDoe")).thenReturn(Optional.of(user));
        when(passwordEncoder.matches("wrong", "hashed_current")).thenReturn(false);

        assertThrows(SampaException.class, () -> {
            sampaUserService.updatePassword("johnDoe", "wrong", "new123");
        });
    }

    @Test
    void testDeleteUser_success() throws SampaException {
        doNothing().when(sampaUserRepository).deleteByUserName("johnDoe");

        sampaUserService.deleteUser("johnDoe");

        verify(sampaUserRepository).deleteByUserName("johnDoe");
    }

    @Test
    void testAddPetToUser_success() throws SampaException {
        SampaUser user = new SampaUser();
        user.setUserName("Test");
        user.setPets(new ArrayList<>());

        Pet pet = new Pet();
        pet.setId(100L);

        when(sampaUserRepository.findByUserName("Test")).thenReturn(Optional.of(user));
        when(petRepository.findById(100L)).thenReturn(Optional.of(pet));

        sampaUserService.addPetToUser("Test", 100L);

        assertTrue(user.getPets().contains(pet));
        verify(petRepository).save(pet);
    }

}

