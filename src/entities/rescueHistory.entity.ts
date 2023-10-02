import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Client } from './clients.entity';
import { Pub } from './pubs.entity';

export type StatusRescue = 'disponível' | 'resgatado'

@Entity('rescue_history')
class RescueHistory {
    @PrimaryGeneratedColumn('increment')
    id: number;

	@Column({ type: 'enum', enum: ['disponível', 'resgatado'], default: 'disponível' })
	status: StatusRescue;

    @CreateDateColumn({ type: 'date' })
    date: string;

    @Column({ type: 'varchar', length: 80 })
    reward_name: string;

    @Column({ type: 'varchar', length: 150 })
    pub_name: string;

    @ManyToOne(() => Client, { onDelete: "CASCADE" })
	client: Client;

    @ManyToOne(() =>  Pub, { onDelete: "CASCADE" })
	pub: Pub;
}

export { RescueHistory }