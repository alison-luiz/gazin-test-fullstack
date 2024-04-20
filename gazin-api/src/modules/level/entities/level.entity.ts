import { Developer } from "@/modules/developer/entities/developer.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('niveis')
export class Level {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  nivel: string;

  @OneToMany(() => Developer, developer => developer.level)
  developers: Developer[];
}
