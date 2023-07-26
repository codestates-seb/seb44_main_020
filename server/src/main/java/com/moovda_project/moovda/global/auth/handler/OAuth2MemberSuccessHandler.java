package com.moovda_project.moovda.oauth2_jwt.handler;


import com.moovda_project.moovda.global.auth.jwt.JwtTokenizer;
import com.moovda_project.moovda.module.member.entity.Member;
import com.moovda_project.moovda.module.member.repository.MemberRepository;
import com.moovda_project.moovda.module.member.service.MemberService;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.io.IOException;
import java.net.URI;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
public class OAuth2MemberSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    private final JwtTokenizer jwtTokenizer;
    private final MemberService memberService;


    private final MemberRepository memberRepository;



    public OAuth2MemberSuccessHandler(JwtTokenizer jwtTokenizer,
                                      MemberService memberService,
                                      MemberRepository memberRepository) {
        this.jwtTokenizer = jwtTokenizer;
        this.memberService = memberService;
        this.memberRepository = memberRepository;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        var oAuth2User = (OAuth2User)authentication.getPrincipal();
        String nickname = String.valueOf(oAuth2User.getAttributes().get("name"));
        String email = String.valueOf(oAuth2User.getAttributes().get("email"));

        log.info("OAuth2 로그인에 성공했습니다1");
        redirect(request, response, nickname, email);
        log.info("OAuth2 로그인에 성공했습니다2");
    }

    private void redirect(HttpServletRequest request, HttpServletResponse response, String nickname, String email) throws IOException {
        String accessToken = delegateAccessToken(nickname, email);
        String refreshToken = delegateRefreshToken(nickname);

        String uri = createURI(accessToken, refreshToken).toString();
        getRedirectStrategy().sendRedirect(request, response, uri);
    }

    private String delegateAccessToken(String nickname, String email) {
        Map<String, Object> claims = new HashMap<>();
        Member member = memberService.findByEmail(email);
        claims.put("nickname", nickname);
        claims.put("memberId",member.getMemberId());

        String subject = nickname;
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());

        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String accessToken = jwtTokenizer.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);

        return accessToken;
    }

    private String delegateRefreshToken(String nickname) {
        String subject = nickname;
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getRefreshTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String refreshToken = jwtTokenizer.generateRefreshToken(subject, expiration, base64EncodedSecretKey);

        return refreshToken;
    }

    private URI createURI(String accessToken, String refreshToken) {
        MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
        queryParams.add("Authorization","Bearer " + accessToken);
        queryParams.add("refresh_token", refreshToken);

        return UriComponentsBuilder
                .newInstance()
                .scheme("https")
                .host("moovda.vercel.app")
                .queryParams(queryParams)
                .build()
                .toUri();
    }
}
