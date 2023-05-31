package com.microservices.newsservice;

import com.microservices.newsservice.model.News;
import com.microservices.newsservice.repo.NewsRepo;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;


@SpringBootApplication
public class NewsserviceApplication implements CommandLineRunner {
	private final NewsRepo newsRepo;

	@Autowired
	public NewsserviceApplication(NewsRepo newsRepo) {
		this.newsRepo = newsRepo;
	}

	public static void main(String[] args) {
		SpringApplication.run(NewsserviceApplication.class, args);
	}


	@Override
	public void run(String...args) throws Exception {
		this.newsRepo.save(new News( "В нашому центрі передбачено попередній запис на прийом. Записатись можна під час особистої присутності в центрі, в телефонному режимі ...","10.10.2022"));
		this.newsRepo.save(new News( "Вірусний інфекційний перитоніт котів... ","10.10.2022"));
		this.newsRepo.save(new News( "СИНДРОМ ВТОМЛЕННИХ ВУСИКІВ у КОТІВ....","10.10.2022"));
	}
}
