package com.sapo.mock.techshop.repository.impl;

import com.sapo.mock.techshop.common.utils.DataUtils;
import com.sapo.mock.techshop.dto.response.ProductForHomePageDTO;
import com.sapo.mock.techshop.repository.ProductRepoCustom;
import com.sapo.mock.techshop.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.ArrayList;
import java.util.List;

@Repository
public class ProductRepoCustomImpl implements ProductRepoCustom {
    @PersistenceContext
    EntityManager em;

    @Autowired
    ImageService imageService;

    @Override
    public List<ProductForHomePageDTO> getTopProductsByCategory(Integer count, Integer categoryId) {
        StringBuilder sql = new StringBuilder();

        sql.append("SELECT p.id, p.collection_id, p.name, p.selling_price, p.discount, p.rating, p.img_link ");
        sql.append("FROM products p, collections co, categories ca ");
        sql.append("WHERE p.collection_id = co.id ");
        sql.append("AND co.category_id = ca.id ");
        sql.append("AND ca.id = ? ");
        sql.append("ORDER BY (P.sold_amount) DESC ");
        sql.append("LIMIT ?");

        // using setParameter to prevent sql injection
        List<Object[]> rows = em.createNativeQuery(sql.toString())
                .setParameter(1, categoryId)
                .setParameter(2, count)
                .getResultList();

        List<ProductForHomePageDTO> data = new ArrayList<>();
        rows.forEach(row -> data.add(ProductForHomePageDTO.builder()
                .id(DataUtils.safeToInteger(row[0]))
                .collectionId(DataUtils.safeToInteger(row[1]))
                .name(DataUtils.safeToString(row[2]))
                .sellingPrice(DataUtils.safeToLong(row[3]))
                .discount(DataUtils.safeToDouble(row[4]))
                .rating(DataUtils.safeToDouble(row[5]))
                .imageBase64(imageService.loadImageAsBase64Source(DataUtils.safeToString(row[6])))
                .build()));
        return data;
    }
}
