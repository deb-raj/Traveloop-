package com.traveloop.traveloop_backend.dto;



import lombok.*;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class UserDTO {
    private Long id;
    private String name;
    private String email;
    private String password;
    private String photoUrl;
    private String languagePref;
}