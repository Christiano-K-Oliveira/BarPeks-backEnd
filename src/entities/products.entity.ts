import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Pub } from './pubs.entity';

@Entity('products')
class Product {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', length: 80 })
    name: string;

    @Column({ type: 'varchar', length: 8 })
    value: string;

    @Column({ type: 'varchar', length: 10 })
    code: string;

    @Column({ type: 'varchar', nullable: true })
    photo_url: string | null | undefined;

    @ManyToOne(() => Pub, { onDelete: "CASCADE" })
	pub: Pub;
}

export { Product }