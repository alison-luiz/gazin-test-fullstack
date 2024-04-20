import { Level } from "@/modules/level/entities/level.entity";
import { Exclude, Expose } from "class-transformer";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { SexType } from "../enums/sex-type.enum";

@Entity('desenvolvedores')
export class Developer {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  nome: string;

  @Column({ type: 'enum', enum: SexType })
  sexo: SexType;

  @Column()
  datanascimento: Date;

  @Column()
  hobby: string;

  @Exclude()
  @Column()
  nivelId: number;

  @ManyToOne(() => Level, level => level.developers)
  @JoinColumn({ name: 'nivelId' })
  level?: Level;

  @Expose({ name: 'idade' })
  getAge(): number {
    const today = new Date();
    const birthDate = new Date(this.datanascimento);
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  }
}
