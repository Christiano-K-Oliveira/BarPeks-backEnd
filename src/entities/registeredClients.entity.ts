import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Client } from './clients.entity';
import { Pub } from './pubs.entity';

@Entity('registered_clients')
class RegisteredClients {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', length: 150 })
    name: string;

    @Column({ type: 'varchar', length: 11 })
    cpf: string;

    @Column({ type: 'varchar', length: 80 })
    email: string;

    @Column({ type: 'varchar', length: 11 })
    telephone: string;

    @Column({ type: 'varchar', length: 6 })
    points: string;

    @Column({ type: 'varchar', length: 10, nullable: true})
    link_qrcode: string | null;

    @Column({ type: 'varchar', length: 6, nullable: true })
    old_points: string | null;

    @ManyToOne(() => Client, { onDelete: "CASCADE" })
	client: Client;

    @ManyToOne(() =>  Pub, { onDelete: "CASCADE" })
	pub: Pub;
}

export { RegisteredClients }