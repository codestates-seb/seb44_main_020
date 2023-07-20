package com.moovda_project.moovda.module.movie.repository.staff;

import com.moovda_project.moovda.module.movie.entity.staff.Staff;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StaffRepository extends JpaRepository<Staff,Long> {
    Staff findByName(String name);
}