package co.com.sofka.crud.controller;

import co.com.sofka.crud.dto.ListDto;
import co.com.sofka.crud.dto.TodoDto;
import co.com.sofka.crud.service.ListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/lists")
public class ListController {

    @Autowired
    private ListService service;

    @GetMapping
    public ResponseEntity<List<ListDto>> list() {
        try {
            return new ResponseEntity<>(service.list(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping
    public ResponseEntity<ListDto> save(@RequestBody ListDto listDto) {
        try {
            return  new ResponseEntity<>(service.save(listDto), HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping
    public ResponseEntity<ListDto> update(@RequestBody ListDto listDto){
        try {
            Optional<ListDto> listToUpdate = service.get(listDto.getId());

            if(listToUpdate.isEmpty()){
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>( service.save(listDto), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<HttpStatus> delete(@PathVariable Long id){
        try {
            Optional<ListDto> listToDelete = service.get(id);

            if(listToDelete.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }

            service.delete(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<ListDto> get(@PathVariable Long id){
        try {
            Optional<ListDto> list = service.get(id);

            if(list.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>(list.get(), HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
