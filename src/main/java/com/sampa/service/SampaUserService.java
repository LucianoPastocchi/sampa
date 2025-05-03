package com.sampa.service;

import com.sampa.entity.Pet;
import com.sampa.entity.SampaUser;
import com.sampa.model.SampaUserModel;
import com.sampa.repository.PetRepository;
import com.sampa.repository.SampaUserRepository;
import jakarta.transaction.Transactional;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

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

    public SampaUser createUser(SampaUserModel user) {
        SampaUser userEntity = new SampaUser();

        userEntity.setIdCard(user.getIdCard());
        userEntity.setName(user.getName());
        userEntity.setLastname(user.getLastname());
        userEntity.setEmail(user.getEmail());
        userEntity.setRole(user.getRole().getDescription());
        userEntity.setPhone(user.getPhone());
        userEntity.setAddress(user.getAddress());

        String rawPassword = user.getPassword();
        String hashedPassword = passwordEncoder.encode(rawPassword);
        userEntity.setPassword(hashedPassword);

        return sampaUserRepository.save(userEntity);
    }

    @Transactional
    public void addPetToUser(Long userId, Long petId) {
        SampaUser user = sampaUserRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        Pet pet = petRepository.findById(petId)
                .orElseThrow(() -> new RuntimeException("Mascota no encontrada"));

        // Seteamos al dueño
        pet.setOwner(user);

        // Guardamos la mascota con la relación actualizada
        petRepository.save(pet);

        // Opcional: actualizar la lista en el user también
        user.getPets().add(pet);
        sampaUserRepository.save(user); // Esto es opcional si cascada está bien configurada
    }

}
