package co.com.sofka.crud.repository;

import co.com.sofka.crud.entity.ListEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IListRepository extends JpaRepository<ListEntity, Long> {
}
