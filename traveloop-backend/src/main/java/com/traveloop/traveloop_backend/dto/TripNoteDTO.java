package com.traveloop.traveloop_backend.dto;



import lombok.*;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class TripNoteDTO {
    private Long id;
    private String title;
    private String content;
    private Long tripId;
}