package com.traveloop.traveloop_backend.dto;



import lombok.*;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class ChecklistItemDTO {
    private Long id;
    private String itemName;
    private String category;
    private Integer quantity;
    private Boolean isPacked;
    private Long tripId;
}