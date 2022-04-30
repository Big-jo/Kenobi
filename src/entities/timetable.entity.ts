import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn} from "typeorm";

@Entity({name: 'tbl_timetable'})
export class TimeTable {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('jsonb', {nullable: false})
    table: string;

    @Column('int')
    department: number

    @Column('varchar')
    level: string
}

