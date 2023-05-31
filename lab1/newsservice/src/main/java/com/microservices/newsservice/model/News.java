package com.microservices.newsservice.model;


import jakarta.persistence.*;

@Entity
@Table(name = "news")
public class News {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "clinic_news")
    private String clinicNews;

    @Column(name = "data")
    private String data;


    public News() {

    }

    public News(String clinicNews,String data) {
        super();
        this.clinicNews = clinicNews;
        this.data = data;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getClinicNews() {
        return clinicNews;
    }

    public void setClinicNews(String firstName) {
        this.clinicNews = clinicNews;
    }

    public String getData() {
        return data;
    }

    public void setData(String data) {
        this.data = data;
    }
}
