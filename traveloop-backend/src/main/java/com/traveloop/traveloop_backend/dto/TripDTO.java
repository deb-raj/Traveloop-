package com.traveloop.traveloop_backend.dto;



import lombok.*;
import java.time.LocalDate;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class TripDTO {
    private Long id;
    private String name;
    private String description;
    private LocalDate startDate;
    private LocalDate endDate;
    private String coverPhotoUrl;
    private Boolean isPublic;
    private Long userId;
}