package com.example.demo.Utils;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

//Class để tạo token mới, giải mã token cũ
@Component
public class JwtUtil {
    @Value("${app.jwt.secret}")
    private String privateKey;

    @Value("${app.jwt.exparation-time}")
    private Long keyLifeTime;

    //Tạo key hmac
    private Key getSigningKey(){
        return Keys.hmacShaKeyFor(privateKey.getBytes());
    }

    //Tạo jwt
    public String generateToken(String Email){
        return Jwts.builder()
                .setSubject(Email) //Thêm email vào token
                .setIssuedAt(new Date()) // Thời gian tạo token
                .setExpiration(new Date(System.currentTimeMillis() + keyLifeTime)) // Mốc token die
                .signWith(getSigningKey(), SignatureAlgorithm.HS256) // Thuật toán mã hóa
                .compact();
    }

    //Lấy admin từ jwt
    public String extractEmail(String token){
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJwt(token)
                .getBody()
                .getSubject();
    }

    //Validate token
    public boolean validateToken(String token){
        try {
            Jwts.parserBuilder().setSigningKey(getSigningKey()).build().parseClaimsJwt(token);
            return true;
        } catch (Exception e){
            return false;
        }
    }
}