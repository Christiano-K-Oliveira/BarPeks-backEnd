import { Column, CreateDateColumn, UpdateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Pub } from './pubs.entity';

@Entity('plans')
class Plan {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', length: 80 })
    name: string;

    @CreateDateColumn({ type: 'date' })
    created_at: string;

    @UpdateDateColumn({ type: 'date' })
    updated_at: string;

    @OneToOne(() =>  Pub, { onDelete: "CASCADE" })
    @JoinColumn()
	pub: Pub;
}

export { Plan }