package com.project.example.controllers;

import com.project.example.models.Student;
import com.project.example.services.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = "http://127.0.0.1:5500") //localhost
public class StudentController {

    private final StudentService studentService;

    @PostMapping()
    public ResponseEntity<?> createStudent(@RequestBody Student student) {
        studentService.addStudent(student);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> readStudent(@PathVariable String id) {
        Student student = studentService.getStudent(id);
        return ResponseEntity.ok(student);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateStudent(@PathVariable String id, @RequestBody Student updatedStudent) {
        studentService.updateStudent(id, updatedStudent);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteStudent(@PathVariable String id) {
        studentService.deleteStudent(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping()
    public ResponseEntity<?> getAllStudents() {
        Map<String, Student> students = studentService.getAllStudents();
        return ResponseEntity.ok(students);
    }
}
