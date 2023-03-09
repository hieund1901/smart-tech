package com.sapo.mock.techshop.service.impl;

import com.sapo.mock.techshop.common.exception.BusinessException;
import com.sapo.mock.techshop.common.utils.DTOValidator;
import com.sapo.mock.techshop.dto.response.ManufacturerDTO;
import com.sapo.mock.techshop.entity.Manufacturer;
import com.sapo.mock.techshop.mapper.ManufacturerMapper;
import com.sapo.mock.techshop.repository.ManufacturerRepo;
import com.sapo.mock.techshop.service.ManufacturerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Comparator;
import java.util.List;

import static com.sapo.mock.techshop.common.constant.HttpStatusConstant.MANUFACTURER_NOT_FOUND_MESSAGE;
import static com.sapo.mock.techshop.common.constant.HttpStatusConstant.NOT_FOUND_CODE;

@Service
public class ManufacturerServiceImpl implements ManufacturerService {

    @Autowired
    private ManufacturerRepo manufacturerRepo;
    @Autowired
    private DTOValidator dtoValidator;

    @Autowired
    private ManufacturerMapper manufacturerMapper;

    @Override
    public List<Manufacturer> getAll() {
        List<Manufacturer> manufacturers = manufacturerRepo.findAll();
        manufacturers.sort(Comparator.reverseOrder());
        return manufacturers;
    }

    @Override
    public Manufacturer getById(Integer id) {
        return manufacturerRepo.findById(id)
                .orElseThrow(() -> new BusinessException(NOT_FOUND_CODE, MANUFACTURER_NOT_FOUND_MESSAGE));
    }

    @Override
    public Manufacturer create(ManufacturerDTO manufacturerDTO) {
        dtoValidator.validate(manufacturerDTO);
        Manufacturer manufacturer = manufacturerMapper.createEntity(manufacturerDTO);
        return manufacturerRepo.save(manufacturer);
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public Manufacturer updateById(Integer id, ManufacturerDTO manufacturerDTO) {
        dtoValidator.validate(manufacturerDTO);
        Manufacturer manufacturer = manufacturerRepo.findById(id)
                .orElseThrow(() -> new BusinessException(NOT_FOUND_CODE,MANUFACTURER_NOT_FOUND_MESSAGE));
        manufacturerMapper.updateEntity(manufacturer,manufacturerDTO);
        return manufacturer;
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public void deleteById(Integer id) {
        Manufacturer manufacturer = manufacturerRepo.findById(id)
                .orElseThrow(() -> new BusinessException(NOT_FOUND_CODE,MANUFACTURER_NOT_FOUND_MESSAGE));
        manufacturerRepo.deleteById(id);
    }

    @Override
    public List<Manufacturer> getAllByNameContains(String name) {
        List<Manufacturer> manufacturers = manufacturerRepo.findAllByNameContainsIgnoreCase(name);
        manufacturers.sort(Comparator.reverseOrder());
        return manufacturers;
    }
}
