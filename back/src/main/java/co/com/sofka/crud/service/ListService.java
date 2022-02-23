package co.com.sofka.crud.service;

import co.com.sofka.crud.dto.ListDto;
import co.com.sofka.crud.entity.ListEntity;
import co.com.sofka.crud.repository.IListRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ListService {
    @Autowired
    private IListRepository iListRepository;

    @Autowired
    private ModelMapper mapper;


    public List<ListDto> list() {
        List<ListEntity> listEntities = iListRepository.findAll();
        return listEntities.stream().map(l -> mapper.map(l, ListDto.class)).collect(Collectors.toList());
    }

    public ListDto save(ListDto listDto) {
        ListEntity listEntity = mapper.map(listDto, ListEntity.class);
        return mapper.map(iListRepository.save(listEntity), ListDto.class);
    }

    public void delete(Long id) {
        iListRepository.deleteById(id);
    }

    public Optional<ListDto> get(Long id) {
        Optional<ListEntity> listEntity = iListRepository.findById(id);
        if(listEntity.isEmpty()) {
            return Optional.empty();
        }
        return Optional.of(mapper.map(listEntity.get(), ListDto.class));
    }
}
