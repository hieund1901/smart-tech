package com.sapo.mock.techshop.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.vladmihalcea.hibernate.type.json.JsonStringType;
import com.vladmihalcea.hibernate.type.json.JsonType;
import lombok.*;
import org.apache.commons.lang3.builder.CompareToBuilder;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Comparator;
import java.util.List;
import java.util.Map;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@Entity
@Table(name = "products")
@TypeDef(
        name = "json",
        typeClass = JsonStringType.class
)
public class Product implements Comparable<Product> {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    //    private Integer collectionId;
    @JsonIgnore
    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "collection_id")
    private Collection collection;

    private String name; // iPhone 14 128GB | Chính hãng VN/A
    private String shortName; // for ex: "128Gb, red"
    private Long importingPrice; // can not change
    private Long sellingPrice;
    private Double discount;
    private Integer remainingAmount;
    private Integer soldAmount;
    private String detail;
    private Double rating;
    private String imgLink;

    @Type(type = "json")
    @Column(columnDefinition = "json")
    private Map<String, Object> attributes;

    @CreationTimestamp
    private Timestamp createdAt;
    @UpdateTimestamp
    private Timestamp updatedAt;


    @Override
    public int compareTo(Product o) {
        return new CompareToBuilder()
                .append(getUpdatedAt(), o.getUpdatedAt())
                .append(getCreatedAt(), o.getCreatedAt())
                .build();
    }
}
