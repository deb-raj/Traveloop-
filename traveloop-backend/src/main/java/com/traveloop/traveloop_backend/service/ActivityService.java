package com.traveloop.traveloop_backend.service;


import com.traveloop.traveloop_backend.dto.ActivityDTO;
import com.traveloop.traveloop_backend.entity.Activity;
import com.traveloop.traveloop_backend.entity.TripStop;
import com.traveloop.traveloop_backend.exception.ResourceNotFoundException;
import com.traveloop.traveloop_backend.repository.ActivityRepository;
import com.traveloop.traveloop_backend.repository.TripStopRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ActivityService {

    private final ActivityRepository activityRepository;
    private final TripStopRepository tripStopRepository;

    public ActivityDTO createActivity(ActivityDTO dto) {
        TripStop stop = tripStopRepository.findById(dto.getTripStopId())
                .orElseThrow(() -> new ResourceNotFoundException("TripStop not found: " + dto.getTripStopId()));

        Activity a = Activity.builder()
                .name(dto.getName())
                .description(dto.getDescription())
                .category(dto.getCategory())
                .activityDate(dto.getActivityDate())
                .activityTime(dto.getActivityTime())
                .estimatedCost(dto.getEstimatedCost())
                .imageUrl(dto.getImageUrl())
                .tripStop(stop)
                .build();
        return toDTO(activityRepository.save(a));
    }

    public List<ActivityDTO> getActivitiesByStop(Long stopId) {
        return activityRepository.findByTripStopId(stopId)
                .stream().map(this::toDTO).collect(Collectors.toList());
    }

    public ActivityDTO getById(Long id) {
        return toDTO(find(id));
    }

    public ActivityDTO updateActivity(Long id, ActivityDTO dto) {
        Activity a = find(id);
        a.setName(dto.getName());
        a.setDescription(dto.getDescription());
        a.setCategory(dto.getCategory());
        a.setActivityDate(dto.getActivityDate());
        a.setActivityTime(dto.getActivityTime());
        a.setEstimatedCost(dto.getEstimatedCost());
        a.setImageUrl(dto.getImageUrl());
        return toDTO(activityRepository.save(a));
    }

    public void deleteActivity(Long id) {
        activityRepository.delete(find(id));
    }

    private Activity find(Long id) {
        return activityRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Activity not found: " + id));
    }

    private ActivityDTO toDTO(Activity a) {
        return ActivityDTO.builder()
                .id(a.getId())
                .name(a.getName())
                .description(a.getDescription())
                .category(a.getCategory())
                .activityDate(a.getActivityDate())
                .activityTime(a.getActivityTime())
                .estimatedCost(a.getEstimatedCost())
                .imageUrl(a.getImageUrl())
                .tripStopId(a.getTripStop().getId())
                .build();
    }
}