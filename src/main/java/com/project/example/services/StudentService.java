package com.project.example.services;

import com.project.example.models.Student;
import com.project.example.models.StudentMap;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class StudentService {
    private final RestTemplate restTemplate;
    private final String baseUrl = "https://mssv-ps34860-default-rtdb.firebaseio.com/students";

    public void addStudent(Student student) {
        String url = baseUrl + ".json";
        restTemplate.postForObject(url, student, Student.class);
    }

    public Student getStudent(String id) {
        String url = baseUrl + "/" + id + ".json";
        return restTemplate.getForObject(url, Student.class);
    }

    public void updateStudent(String id, Student updatedStudent) {
        String url = baseUrl + "/" + id + ".json";
        restTemplate.put(url, updatedStudent);
    }

    public void deleteStudent(String id) {
        String url = baseUrl + "/" + id + ".json";
        restTemplate.delete(url);
    }

    // Phương thức để lấy tất cả sinh viên
    public StudentMap getAllStudents() {
        String url = baseUrl + ".json";
        return restTemplate.getForObject(url, StudentMap.class);
    }
}
