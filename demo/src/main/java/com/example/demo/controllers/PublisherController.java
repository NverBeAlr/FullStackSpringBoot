package com.example.demo.controllers;

import com.example.demo.services.PublisherService;
import com.example.demo.entities.Publisher;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/publishers")
public class PublisherController {
    @Autowired 
    private PublisherService publisherService;

    @GetMapping
    public List<Publisher> getAllPublishers() {
        return publisherService.getAllPublishers();
    }

    @GetMapping("/{Id}")
    public Publisher getPublisherById(@PathVariable Long Id) {
        return publisherService.getPublisherById(Id);
    }

    @PostMapping("/create")
    public String createPublisher(@RequestBody Publisher publisher) {
        publisherService.createPublisher(publisher);
        return "Thêm thành công";
    }

    @PutMapping("/{Id}")
    public String updatePublisher(@PathVariable Long Id, @RequestBody Publisher publisher) {
        publisherService.updatePublisher(Id, publisher);
        return "Sửa thành công";
    }

    @DeleteMapping("/{Id}")
    public String deletePublisher(@PathVariable Long Id) {
        publisherService.deletePublisher(Id);
        return "Xóa thành công";
    }
}