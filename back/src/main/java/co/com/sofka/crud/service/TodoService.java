package co.com.sofka.crud.service;

import co.com.sofka.crud.dto.TodoDto;
import co.com.sofka.crud.entity.ListEntity;
import co.com.sofka.crud.entity.TodoEntity;
import co.com.sofka.crud.repository.IListRepository;
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
    private IListRepository iListRepository;

    @Autowired
    private ModelMapper mapper;


    public List<TodoDto> list(){
        List<TodoEntity> listTodoEntity = repository.findAll();
        return listTodoEntity.stream().map(todo -> mapper.map(todo, TodoDto.class)).collect(Collectors.toList());
    }

    public TodoDto save(TodoDto todo){
        TodoEntity todoEntity = new TodoEntity();
        todoEntity.setName(mapper.map(todo, TodoEntity.class).getName());

        Optional<ListEntity> listEntity = iListRepository.findById(todo.getListId());

        listEntity.ifPresent(todoEntity::setList);
        return  mapper.map(repository.save(todoEntity), TodoDto.class);
    }

    public TodoDto update(TodoDto todoDto) {
        TodoEntity updateTodo = repository.findById(todoDto.getId())
                .map(todo -> {
                    todo.setName(todoDto.getName());
                    todo.setCompleted(todoDto.getCompleted());
                    return repository.save(todo);
                }).orElse(null);
        return mapper.map(updateTodo, TodoDto.class);
    }

    public void delete(Long id){
        repository.deleteById(id);
    }

    public Optional<TodoDto> get(Long id){
        Optional<TodoEntity> todoEntity = repository.findById(id);
        if(todoEntity.isEmpty()) {
            return Optional.empty();
        }
        return Optional.of(mapper.map(todoEntity.get(), TodoDto.class));
    }

}
