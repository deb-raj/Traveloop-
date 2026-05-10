package com.traveloop.traveloop_backend.dto;


import lombok.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class ActivityDTO {
    private Long id;
    private String name;
    private String description;
    private String category;
    private LocalDate activityDate;
    private LocalTime activityTime;
    private Double estimatedCost;
    private String imageUrl;
    private Long tripStopId;
}