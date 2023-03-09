package com.sapo.mock.techshop.service.impl;

import com.sapo.mock.techshop.common.exception.BusinessException;
import com.sapo.mock.techshop.common.utils.DTOValidator;
import com.sapo.mock.techshop.common.utils.RandomStringGenerator;
import com.sapo.mock.techshop.dto.request.OrderRequestDTO;
import com.sapo.mock.techshop.entity.AuthUser;
import com.sapo.mock.techshop.entity.Order;
import com.sapo.mock.techshop.entity.OrderProductDetail;
import com.sapo.mock.techshop.entity.Product;
import com.sapo.mock.techshop.mapper.OrderMapper;
import com.sapo.mock.techshop.repository.AuthUserRepo;
import com.sapo.mock.techshop.repository.OrderProductDetailRepo;
import com.sapo.mock.techshop.repository.OrderRepo;
import com.sapo.mock.techshop.repository.ProductRepo;
import com.sapo.mock.techshop.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

import static com.sapo.mock.techshop.common.constant.HttpStatusConstant.*;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    OrderRepo orderRepo;

    @Autowired
    DTOValidator dtoValidator;

    @Autowired
    AuthUserRepo authUserRepo;

    @Autowired
    ProductRepo productRepo;

    @Autowired
    OrderProductDetailRepo orderProductDetailRepo;

    @Autowired
    OrderMapper orderMapper;

    @Override
    public List<Order> getAll() {
        return orderRepo.findAll();
    }

    @Override
    public Order getById(Integer id) {
        return orderRepo.findById(id)
                .orElseThrow((() -> new BusinessException(NOT_FOUND_CODE, ORDER_NOT_FOUND_MESSAGE)));
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public Order create(OrderRequestDTO orderRequestDTO) {
        dtoValidator.validate(orderRequestDTO);

        authUserRepo.findById(orderRequestDTO.getUserId())
                .orElseThrow((() -> new BusinessException(NOT_FOUND_CODE, USER_NOT_FOUND_MESSAGE)));

        String code = RandomStringGenerator.getAlphaNumericString(10);

        Order order = Order.builder()
                .code(code)
                .userId(orderRequestDTO.getUserId())
                .name(orderRequestDTO.getName())
                .phone(orderRequestDTO.getPhone())
                .address(orderRequestDTO.getAddress())
                .build();
        order = orderRepo.save(order);

        for (OrderRequestDTO.ProductWithAmount productWithAmount : orderRequestDTO.getProducts()) {
            Product product = productRepo.findById(productWithAmount.getProductId())
                    .orElseThrow((() -> new BusinessException(NOT_FOUND_CODE, PRODUCT_NOT_FOUND_MESSAGE)));
            product.setSoldAmount(product.getSoldAmount() + 1);
            product.setRemainingAmount(product.getRemainingAmount() - 1);
            productRepo.save(product);

            OrderProductDetail orderProductDetail = new OrderProductDetail();
            orderProductDetail.setOrderId(order.getId());
            orderProductDetail.setProductId(product.getId());
            orderProductDetail.setProductName(product.getName());
            orderProductDetail.setProductShortName(product.getShortName());
            orderProductDetail.setQuantity(orderProductDetail.getQuantity());
            orderProductDetail.setSellingPrice(product.getSellingPrice());
            orderProductDetail.setImportingPrice(product.getImportingPrice());
            orderProductDetail.setDetail(product.getDetail());
            orderProductDetail.setImgLink(product.getImgLink());

            orderProductDetailRepo.save(orderProductDetail);
        }
        return orderRepo.save(order);
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public Order updateById(Integer id, OrderRequestDTO orderRequestDTO) {
        dtoValidator.validate(orderRequestDTO);

        Order order = getById(id);

        orderMapper.updateEntity(order, orderRequestDTO);

        return orderRepo.save(order);
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public void deleteById(Integer id) {
        getById(id);
        orderRepo.deleteById(id);
    }

    @Override
    public List<Order> getAllByNameContains(String name) {
        return orderRepo.findAllByNameContainsIgnoreCase(name);
    }
}
