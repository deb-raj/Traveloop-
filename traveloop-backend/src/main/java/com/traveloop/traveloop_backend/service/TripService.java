package com.traveloop.traveloop_backend.service;

import com.traveloop.traveloop_backend.dto.TripDTO;
import com.traveloop.traveloop_backend.entity.Trip;
import com.traveloop.traveloop_backend.entity.User;
import com.traveloop.traveloop_backend.exception.ResourceNotFoundException;
import com.traveloop.traveloop_backend.repository.TripRepository;
import com.traveloop.traveloop_backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TripService {

    private final TripRepository tripRepository;
    private final UserRepository userRepository;

    public TripDTO createTrip(TripDTO dto) {
        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + dto.getUserId()));

        Trip trip = Trip.builder()
                .name(dto.getName())
                .description(dto.getDescription())
                .startDate(dto.getStartDate())
                .endDate(dto.getEndDate())
                .coverPhotoUrl(dto.getCoverPhotoUrl())
                .isPublic(dto.getIsPublic() != null && dto.getIsPublic())
                .user(user)
                .build();
        return toDTO(tripRepository.save(trip));
    }

    public List<TripDTO> getAllTrips() {
        return tripRepository.findAll().stream().map(this::toDTO).collect(Collectors.toList());
    }

    public TripDTO getTripById(Long id) {
        return toDTO(findTrip(id));
    }

    public List<TripDTO> getTripsByUser(Long userId) {
        return tripRepository.findByUserId(userId).stream().map(this::toDTO).collect(Collectors.toList());
    }

    public List<TripDTO> getPublicTrips() {
        return tripRepository.findByIsPublicTrue().stream().map(this::toDTO).collect(Collectors.toList());
    }

    public TripDTO updateTrip(Long id, TripDTO dto) {
        Trip trip = findTrip(id);
        trip.setName(dto.getName());
        trip.setDescription(dto.getDescription());
        trip.setStartDate(dto.getStartDate());
        trip.setEndDate(dto.getEndDate());
        trip.setCoverPhotoUrl(dto.getCoverPhotoUrl());
        if (dto.getIsPublic() != null) trip.setIsPublic(dto.getIsPublic());
        return toDTO(tripRepository.save(trip));
    }

    public void deleteTrip(Long id) {
        tripRepository.delete(findTrip(id));
    }

    private Trip findTrip(Long id) {
        return tripRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Trip not found with id: " + id));
    }

    private TripDTO toDTO(Trip t) {
        return TripDTO.builder()
                .id(t.getId())
                .name(t.getName())
                .description(t.getDescription())
                .startDate(t.getStartDate())
                .endDate(t.getEndDate())
                .coverPhotoUrl(t.getCoverPhotoUrl())
                .isPublic(t.getIsPublic())
                .userId(t.getUser().getId())
                .build();
    }
}