package com.example.demo.services;

import com.example.demo.Repositories.PublisherRepository;
import com.example.demo.entities.Publisher;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PublisherService {
	@Autowired 
	private PublisherRepository publisherRepository;

	public List<Publisher> getAllPublishers() {
		return publisherRepository.findAll();
	}

	public Publisher getPublisherById(Long Id) {
		return publisherRepository.findById(Id)
				.orElseThrow(() -> new RuntimeException("Không tìm thấy publisher phù hợp"));
	}

	public Publisher createPublisher(Publisher publisher) {
		return publisherRepository.save(publisher);
	}

	public Publisher updatePublisher(Long Id, Publisher publisher) {
		Publisher existingPublisher = getPublisherById(Id);
		existingPublisher.setName(publisher.getName());
		existingPublisher.setEmail(publisher.getEmail());
		existingPublisher.setAddress(publisher.getAddress());
		existingPublisher.setPhone_number(publisher.getPhone_number());
		existingPublisher.setDescription(publisher.getDescription());
		return publisherRepository.save(existingPublisher);
	}

	public Publisher deletePublisher(Long Id) {
		Publisher existingPublisher = getPublisherById(Id);
		publisherRepository.delete(existingPublisher);
		return existingPublisher;
}
}
