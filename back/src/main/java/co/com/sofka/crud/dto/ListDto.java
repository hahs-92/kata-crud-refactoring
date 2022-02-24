package co.com.sofka.crud.dto;

import co.com.sofka.crud.entity.TodoEntity;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.List;

public class ListDto {

    private Long id;

    @NotBlank
    @Size(max = 25)
    private String name;

    private List<TodoEntity> todos;


    public ListDto() {
    }

    public ListDto(String name, List<TodoEntity> todos) {
        this.name = name;
        this.todos = todos;
    }

    public ListDto(Long id, String name, List<TodoEntity> todos) {
        this.id = id;
        this.name = name;
        this.todos = todos;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<TodoEntity> getTodos() {
        return todos;
    }

   public void setTodos(List<TodoEntity> todos) {
        this.todos = todos;
    }
}
