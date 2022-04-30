import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToOne, JoinColumn} from "typeorm";
import { TimeTable } from "./timetable.entity";


@Entity({name: 'tbl_department'})
export class Department {
    @PrimaryGeneratedColumn('increment')
    id: string;

    @Column({type: 'varchar'})
    level: string;

    @Column({type: 'varchar'})
    name: string;

    @Column({type: 'varchar'})
    college: string;

    // @OneToOne(type => TimeTable) @JoinColumn()
    // timetable: TimeTable;
}

