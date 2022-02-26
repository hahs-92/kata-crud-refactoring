package co.com.sofka.crud.dto;


import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class TodoDto {
    private Long id;

    @NotBlank
    @Size(max = 25, min = 3)
    private String name;

    private Boolean completed;

    private Long listId;


    public TodoDto() {
    }

    public TodoDto(String name, Boolean completed, Long listId) {
        this.name = name;
        this.completed = completed;
        this.listId = listId;
    }

    public TodoDto(Long id, String name, Boolean completed, Long listId) {
        this.id = id;
        this.name = name;
        this.completed = completed;
        this.listId = listId;
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

    public Boolean getCompleted() {
        return completed;
    }

    public void setCompleted(Boolean completed) {
        this.completed = completed;
    }

    public Long getListId() {
        return listId;
    }

    public void setListId(Long listId) {
        this.listId = listId;
    }

}
