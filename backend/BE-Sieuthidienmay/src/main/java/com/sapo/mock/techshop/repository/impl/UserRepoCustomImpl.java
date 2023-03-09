package com.sapo.mock.techshop.repository.impl;

import com.sapo.mock.techshop.common.utils.DataUtils;
import com.sapo.mock.techshop.dto.response.UserListDTO;
import com.sapo.mock.techshop.repository.UserRepoCustom;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.ArrayList;
import java.util.List;

@Repository
public class UserRepoCustomImpl implements UserRepoCustom {
    @PersistenceContext
    EntityManager em;

    @Override
    public List<UserListDTO> getDetailsAllusers() {
        StringBuilder sql = new StringBuilder();
        sql.append("SELECT u.email, u.username, u.name, u.phone, u.address, " +
                "count(o.id) as totalOrder, " +
                "sum(nn.quantity) as totalProduct, " +
                "sum(nn.quantity*nn.selling_price) as totalCost, " +
                "u.last_login_at, u.created_at, u.updated_at ");
        sql.append("FROM (users u LEFT JOIN orders o ON u.id = o.user_id) ");
        sql.append("LEFT JOIN order_product_details nn ON o.id = nn.order_id ");
        sql.append("GROUP BY(u.id) ");

        List<Object[]> rows = em.createNativeQuery(sql.toString()).getResultList();

        List<UserListDTO> data = new ArrayList<>();
        rows.forEach(row -> data.add(UserListDTO.builder()
                .email(DataUtils.safeToString(row[0]))
                .username(DataUtils.safeToString(row[1]))
                .name(DataUtils.safeToString(row[2]))
                .phone(DataUtils.safeToString(row[3]))
                .address(DataUtils.safeToString(row[4]))
                .totalOrder(DataUtils.safeToLong(row[5]))
                .totalProduct(DataUtils.safeToLong(row[6]))
                .totalCost(DataUtils.safeToLong(row[7]))
                .lastLoginAt(DataUtils.safeToLocalDateTime(row[8]))
                .createdAt(DataUtils.safeToLocalDateTime(row[9]))
                .updatedAt(DataUtils.safeToLocalDateTime(row[10]))
                .build()));
        return data;
    }
}
