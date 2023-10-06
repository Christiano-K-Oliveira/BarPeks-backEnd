import { getRounds, hashSync } from 'bcryptjs';
import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('pubs')
class Pub {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', length: 150 })
    name: string;

    @Column({ type: 'varchar', length: 14 })
    social_number: string;

    @Column({ type: 'varchar', length: 80 })
    email: string;

    @Column({ type: 'varchar', length: 120 })
    password: string;

    @Column({ type: 'varchar', length: 120, nullable: true })
    reset_password: string | null | undefined;

    @Column({ type: 'varchar', length: 11 })
    telephone: string;

    @Column({ type: 'varchar', length: 150 })
    address: string;

    @Column({ type: 'varchar', length: 60 })
    state: string;

    @Column({ type: 'varchar', length: 60 })
    city: string;

    @Column({ type: 'varchar', length: 8 })
    postal_code: string;

    @Column({ type: 'varchar', nullable: true })
    photo_url: string | null | undefined;

    @Column({ type: 'boolean', default: true })
    is_active: boolean;

    @Column({ type: 'varchar', nullable: true })
    expires_reset_password: string | null;

    @BeforeInsert()
    @BeforeUpdate()
    hashPassword() {
        const isEncrypted = getRounds(this.password);
            if(!isEncrypted) {
                this.password = hashSync(this.password, 10)
            }
    }
}

export { Pub }