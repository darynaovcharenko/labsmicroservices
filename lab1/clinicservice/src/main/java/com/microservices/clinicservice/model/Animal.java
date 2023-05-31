package com.microservices.clinicservice.model;
import jakarta.persistence.*;

@Entity
@Table(name = "animals")
public class Animal{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "owner_name")
    private String ownerName;

    @Column(name = "pets_name")
    private String petsName;

    private String email;

    public Animal() {

    }

    public Animal(String ownerName, String petsName, String email) {
        super();
        this.ownerName = ownerName;
        this.petsName = petsName;
        this.email = email;
    }
    public long getId() {
        return id;
    }
    public void setId(long id) {
        this.id = id;
    }
    public String getOwnerName() {
        return ownerName;
    }
    public void setOwnerName(String ownerName) {
        this.ownerName = ownerName;
    }
    public String getPetsName() {
        return petsName;
    }
    public void setPetsName(String petsName) {
        this.petsName = petsName;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
}
