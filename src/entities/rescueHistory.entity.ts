import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Client } from './clients.entity';
import { Pub } from './pubs.entity';

@Entity('rescue_history')
class RescueHistory {
    @PrimaryGeneratedColumn('increment')
    id: number;

	@Column({ type: 'enum', enum: ['disponivel', 'resgatado'], default: 'disponivel' })
	status: string;

    @CreateDateColumn({ type: 'date' })
    date: string;

    @Column({ type: 'varchar', length: 80 })
    reward_name: string;

    @Column({ type: 'varchar', length: 10})
    code_rescue: string;

    @Column({ type: 'varchar', length: 20, nullable: true })
    rescue_date: string | null;

    @ManyToOne(() => Client, { onDelete: "CASCADE" })
	client: Client;

    @ManyToOne(() =>  Pub, { onDelete: "CASCADE" })
	pub: Pub;
}

export { RescueHistory }