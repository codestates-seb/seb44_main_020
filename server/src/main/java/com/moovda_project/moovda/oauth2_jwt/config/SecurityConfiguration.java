//package com.moovda_project.moovda.oauth2_jwt.config;
//
//import com.moovda_project.moovda.member.service.MemberService;
//import com.moovda_project.moovda.oauth2_jwt.filter.JwtVerificationFilter;
//import com.moovda_project.moovda.oauth2_jwt.handler.MemberAccessDeniedHandler;
//import com.moovda_project.moovda.oauth2_jwt.handler.MemberAuthenticationEntryPoint;
//import com.moovda_project.moovda.oauth2_jwt.handler.OAuth2MemberSuccessHandler;
//import com.moovda_project.moovda.oauth2_jwt.jwt.JwtTokenizer;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
//import org.springframework.security.config.http.SessionCreationPolicy;
//import org.springframework.security.oauth2.client.web.OAuth2LoginAuthenticationFilter;
//import org.springframework.security.web.SecurityFilterChain;
//import org.springframework.web.cors.CorsConfiguration;
//import org.springframework.web.cors.CorsConfigurationSource;
//import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
//
//import java.util.Arrays;
//
//import static org.springframework.security.config.Customizer.withDefaults;
//
////@Configuration
//public class SecurityConfiguration {
//    private final JwtTokenizer jwtTokenizer;
//
//    private final MemberService memberService;
//
//    public SecurityConfiguration(JwtTokenizer jwtTokenizer,
//                                 MemberService memberService) {
//        this.jwtTokenizer = jwtTokenizer;
//        this.memberService = memberService;
//    }
//
//    @Bean
//    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//        http
//                .headers().frameOptions().sameOrigin()
//                .and()
//                .csrf().disable()
//                .cors(withDefaults())
//                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
//                .and()
//                .formLogin().disable()
//                .httpBasic().disable()
//                .exceptionHandling()
//                .authenticationEntryPoint(new MemberAuthenticationEntryPoint())
//                .accessDeniedHandler(new MemberAccessDeniedHandler())
//                .and()
//                .apply(new CustomFilterConfigurer())  // 추가
//                .and()
//                .authorizeHttpRequests(authorize -> authorize
//                                .anyRequest().permitAll()
//                )
//                .oauth2Login(oauth2 -> oauth2
//                       .successHandler(new OAuth2MemberSuccessHandler(jwtTokenizer,  memberService))
//
//                );
//
//        return http.build();
//    }
//
//    @Bean
//    CorsConfigurationSource corsConfigurationSource() {
//        CorsConfiguration configuration = new CorsConfiguration();
//        configuration.setAllowedOrigins(Arrays.asList("*"));
//        configuration.setAllowedMethods(Arrays.asList("GET","POST", "PATCH", "DELETE"));
//        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//        source.registerCorsConfiguration("/**", configuration); // 주의 사항: 컨텐츠 표시 오류로 인해 '/**'를 '\/**'로 표기했으니 실제 코드 구현 시에는 '\(역슬래시)'를 빼 주세요.
//
//        return source;
//    }
//
//    // 추가
//    public class CustomFilterConfigurer extends AbstractHttpConfigurer<CustomFilterConfigurer, HttpSecurity> {
//        @Override
//        public void configure(HttpSecurity builder) throws Exception {
//            JwtVerificationFilter jwtVerificationFilter = new JwtVerificationFilter(jwtTokenizer);
//
//            builder.addFilterAfter(jwtVerificationFilter, OAuth2LoginAuthenticationFilter.class);
//        }
//    }
//}