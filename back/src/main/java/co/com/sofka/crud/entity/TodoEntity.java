package co.com.sofka.crud.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

@Entity
@Table(name = "Todo")
public class TodoEntity {
    @Id
    @GeneratedValue
    private Long id;
    private String name;
    private boolean completed = false;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "list_id", nullable = false)
    @JsonIgnoreProperties("todos") //evita un bucle en la respuesta del json
    private ListEntity list;

    public TodoEntity() {
    }

    public TodoEntity(String name, boolean completed) {
        this.name = name;
        this.completed = completed;
    }

    public TodoEntity(Long id, String name, boolean completed) {
        this.id = id;
        this.name = name;
        this.completed = completed;
    }

    public Long getId() {
        return id;
    }


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public boolean isCompleted() {
        return completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }

    public ListEntity getList() {
        return list;
    }

    public void setList(ListEntity list) {
        this.list = list;
    }
}
