package com.traveloop.traveloop_backend.service;


import com.traveloop.traveloop_backend.dto.UserDTO;
import com.traveloop.traveloop_backend.entity.User;
import com.traveloop.traveloop_backend.exception.ResourceNotFoundException;
import com.traveloop.traveloop_backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public UserDTO createUser(UserDTO dto) {
        if (userRepository.existsByEmail(dto.getEmail())) {
            throw new IllegalArgumentException("Email already exists: " + dto.getEmail());
        }
        User user = User.builder()
                .name(dto.getName())
                .email(dto.getEmail())
                .password(dto.getPassword())
                .photoUrl(dto.getPhotoUrl())
                .languagePref(dto.getLanguagePref())
                .build();
        return toDTO(userRepository.save(user));
    }

    public List<UserDTO> getAllUsers() {
        return userRepository.findAll().stream().map(this::toDTO).collect(Collectors.toList());
    }

    public UserDTO getUserById(Long id) {
        return toDTO(findUser(id));
    }

    public UserDTO updateUser(Long id, UserDTO dto) {
        User user = findUser(id);
        user.setName(dto.getName());
        user.setPhotoUrl(dto.getPhotoUrl());
        user.setLanguagePref(dto.getLanguagePref());
        if (dto.getPassword() != null) user.setPassword(dto.getPassword());
        return toDTO(userRepository.save(user));
    }

    public void deleteUser(Long id) {
        userRepository.delete(findUser(id));
    }

    private User findUser(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
    }

    private UserDTO toDTO(User u) {
        return UserDTO.builder()
                .id(u.getId())
                .name(u.getName())
                .email(u.getEmail())
                .photoUrl(u.getPhotoUrl())
                .languagePref(u.getLanguagePref())
                .build();
    }
}