package co.com.sofka.crud.dto;


import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class TodoDto {
    private Long id;

    @NotBlank
    @Size(max = 25, min = 3)
    private String name;

    @NotNull
    private Boolean completed;

    @NotBlank
    private String groupListId;

    public TodoDto() {
    }

    public TodoDto(Long id, String name, Boolean completed, String groupListId) {
        this.id = id;
        this.name = name;
        this.completed = completed;
        this.groupListId = groupListId;
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

    public String getGroupListId() {
        return groupListId;
    }

    public void setGroupListId(String groupListId) {
        this.groupListId = groupListId;
    }
}
