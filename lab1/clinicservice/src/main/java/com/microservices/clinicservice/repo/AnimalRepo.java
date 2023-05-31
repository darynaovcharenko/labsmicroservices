package com.microservices.clinicservice.repo;


import org.springframework.data.jpa.repository.JpaRepository;
import com.microservices.clinicservice.model.Animal;
import org.springframework.stereotype.Repository;


@Repository
public interface AnimalRepo extends JpaRepository<Animal, Long>{

}