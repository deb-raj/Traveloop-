package com.traveloop.traveloop_backend.dto;



import lombok.*;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class BudgetDTO {
    private Long id;
    private String category;
    private Double estimatedAmount;
    private Double actualAmount;
    private String currency;
    private Long tripId;
}