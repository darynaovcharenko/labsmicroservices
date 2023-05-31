package com.microservices.clinicservice;

import com.microservices.clinicservice.model.Animal;
import com.microservices.clinicservice.repo.AnimalRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ClinicserviceApplication implements CommandLineRunner {
	private final AnimalRepo animalRepo;

	@Autowired
	public ClinicserviceApplication(AnimalRepo animalRepo) {
		this.animalRepo = animalRepo;
	}

	public static void main(String[] args) {
		SpringApplication.run(ClinicserviceApplication.class, args);
	}


	@Override
	public void run(String...args) throws Exception {
		this.animalRepo.save(new Animal("Іванова Олена", "Буч", "ivanova@gmail.com"));
		this.animalRepo.save(new Animal("Коваленко Катерина", "Муся", "tom@gmail.com"));
		this.animalRepo.save(new Animal("Карпюк Степан", "Рекс", "степан@gmail.com"));
	}
}
