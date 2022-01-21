import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn} from "typeorm";

@Entity("Comment")
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  episodeId: number;

  @Column()
  anonymous: boolean;

  @Column({type: "varchar", nullable: true})
  ip_address: string | string[] | undefined;

  @Column({type: "varchar", length: 500})
  comment: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => "CURRENT_TIMESTAMP"})
  createdAt: Date;
}

