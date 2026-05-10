package com.traveloop.traveloop_backend.entity;



import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "checklist_items")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class ChecklistItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String itemName;

    private String category;       // Clothing, Documents, Electronics, etc.
    private Integer quantity = 1;
    private Boolean isPacked = false;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "trip_id", nullable = false)
    private Trip trip;
}