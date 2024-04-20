import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('niveis')
export class Level {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  nivel: string;
}
