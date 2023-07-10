package com.moovda_project.moovda.movie.entity.staff;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@NoArgsConstructor()
@Getter
@Setter
@Table(name = "staffs")
public class Staff {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "staff_id")
    private Long staffId;
    @Column(name = "name")
    private String name;

//    @Column(name = "profile_image")
//    private String profileImage;


}
