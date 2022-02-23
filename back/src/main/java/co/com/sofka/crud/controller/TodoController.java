package co.com.sofka.crud.controller;

import co.com.sofka.crud.dto.TodoDto;
import co.com.sofka.crud.service.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/todos")
public class TodoController {

    @Autowired
    private TodoService service;

    @GetMapping
    public ResponseEntity<List<TodoDto>> list() {
        try {
            return new ResponseEntity<>(service.list(), HttpStatus.OK );
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @PostMapping
    public ResponseEntity<TodoDto> save(@RequestBody TodoDto todo){
        try {
            return  new ResponseEntity<>(service.save(todo), HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping
    public ResponseEntity<TodoDto> update(@RequestBody TodoDto todo){
       try {
           Optional<TodoDto> todoToUpdate = service.get(todo.getId());

           if(todoToUpdate.isEmpty()){
               return new ResponseEntity<>(HttpStatus.NOT_FOUND);
           }
           return new ResponseEntity<>( service.save(todo), HttpStatus.OK);
       } catch (Exception e) {
           return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
       }
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<HttpStatus> delete(@PathVariable Long id){
        try {
            Optional<TodoDto> todoToDelete = service.get(id);

            if(todoToDelete.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }

            service.delete(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<TodoDto> get(@PathVariable Long id){
        try {
            Optional<TodoDto> todo = service.get(id);

            if(todo.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>(todo.get(), HttpStatus.OK);

        } catch (Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
