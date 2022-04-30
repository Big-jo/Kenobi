import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn} from "typeorm";

@Entity({name: 'tbl_user'})
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type: 'varchar', length: 250})
    name: string;

    @Column({type: 'varchar'})
    matric_number: string;

    @Column({type: 'int'})
    level: number;

    @Column({type: 'varchar'})
    email: string;

    @Column({type: 'varchar', length: 250})
    department: string;
}

