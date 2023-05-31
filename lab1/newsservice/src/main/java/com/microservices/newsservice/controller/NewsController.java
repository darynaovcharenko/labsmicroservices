package com.microservices.newsservice.controller;


import com.microservices.newsservice.model.News;
import com.microservices.newsservice.repo.NewsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("api/")
public class NewsController {
    @Autowired
    private NewsRepo newsRepo;

    @GetMapping("news")
    public List<News> getNews() {
        return this.newsRepo.findAll();
    }
}
