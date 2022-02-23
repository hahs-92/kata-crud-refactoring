package co.com.sofka.crud.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class ListDto {

    private Long id;

    @NotBlank
    @Size(max = 25)
    private String name;

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
}
