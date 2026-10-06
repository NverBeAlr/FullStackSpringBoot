package com.example.demo.services;

import com.example.demo.Repositories.PublisherRepository;
import com.example.demo.entities.Publisher;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PublisherService {
	private final PublisherRepository publisherRepository;

	public PublisherService(PublisherRepository publisherRepository) {
		this.publisherRepository = publisherRepository;
	}

	public List<Publisher> getAllPublishers() {
		return publisherRepository.findAll();
	}

	public Publisher getPublisherById(Long id) {
		return publisherRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Không tìm thấy publisher phù hợp"));
	}

	public Publisher createPublisher(Publisher publisher) {
		return publisherRepository.save(publisher);
	}

	public Publisher updatePublisher(Long id, Publisher publisher) {
		Publisher existing = getPublisherById(id);
		existing.setName(publisher.getName());
		existing.setEmail(publisher.getEmail());
		existing.setAddress(publisher.getAddress());
		existing.setPhone_number(publisher.getPhone_number());
		existing.setDescription(publisher.getDescription());
		return publisherRepository.save(existing);
	}

	public Publisher deletePublisher(Long id) {
		Publisher existing = getPublisherById(id);
		publisherRepository.delete(existing);
		return existing;
}
}
