package com.example.crud;

import com.example.crud.dto.ProductRequest;
import com.example.crud.entity.Product;
import com.example.crud.mapper.ProductMapper;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.assertEquals;

class ProductMapperTest {

    @Test
    void mapsRequestToEntity() {
        Product p = new ProductMapper().toEntity(new ProductRequest(" Pen ", "Blue", new BigDecimal("1.50"), 10));
        assertEquals("Pen", p.getName());
        assertEquals(10, p.getQuantity());
    }
}
