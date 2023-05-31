package com.microservices.clinicservice.controller;
import com.microservices.clinicservice.model.Animal;
import com.microservices.clinicservice.repo.AnimalRepo;



import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;



@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("api/")
public class AnimalsController {
    @Autowired
    private AnimalRepo animalRepo;

    @GetMapping("animals")
    public List <Animal> getAnimals() {
        return this.animalRepo.findAll();
    }
}