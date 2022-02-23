package co.com.sofka.crud.service;

import co.com.sofka.crud.dto.TodoDto;
import co.com.sofka.crud.entity.Todo;
import co.com.sofka.crud.repository.TodoRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TodoService {

    @Autowired
    private TodoRepository repository;

    @Autowired
    private ModelMapper mapper;

    public List<TodoDto> list(){
        List<Todo> listTodoEntity = repository.findAll();
        return listTodoEntity.stream().map(todo -> mapper.map(todo, TodoDto.class)).collect(Collectors.toList());
    }

    public TodoDto save(TodoDto todo){
        Todo todoEntity = mapper.map(todo, Todo.class);
        return  mapper.map(repository.save(todoEntity), TodoDto.class);
    }

    public void delete(Long id){
        repository.deleteById(id);
    }

    public Optional<TodoDto> get(Long id){
        Optional<Todo> todoEntity = repository.findById(id);
        if(todoEntity.isEmpty()) {
            return Optional.empty();
        }
        return Optional.of(mapper.map(todoEntity.get(), TodoDto.class));
    }

}
