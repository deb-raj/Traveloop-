package com.traveloop.traveloop_backend.dto;



import lombok.*;
import java.time.LocalDate;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class TripStopDTO {
    private Long id;
    private String cityName;
    private String country;
    private LocalDate arrivalDate;
    private LocalDate departureDate;
    private Integer stopOrder;
    private Double costIndex;
    private Long tripId;
}