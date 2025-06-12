import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable, BeforeInsert, BeforeUpdate } from "typeorm";
import bcrypt from "bcryptjs";


@Entity('users')
export class User {
    
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column({ length: 100, nullable: false })
    public name: string;

    @Column({ unique: true })
    public email: string;

    @Column({ nullable: false })
    public password: string;

    public previousPassword?: string;

    /**
     * Getter name
     * @return {string}
     */
	public get nameA(): string {
		return this.name;
	}

    /**
     * Getter email
     * @return {string}
     */
	public get emailA(): string {
		return this.email;
    }

    /**
     * Getter password
     * @return {string}
     */
	public get passwordA(): string {
		return this.password;
	}

    /**
     * Setter name
     * @param {string} value
     */
	public set nameA(value: string) {
		this.name = value;
	}

    /**
     * Setter email
     * @param {string} value
     */
	public set emailA(value: string) {
		this.email = value;
	}

	constructor(name:string, email:string, password:string) {
        this.name = name;
        this.email = email;
        this.password = password;
	}
  

    /**
     * Função que ocorre antes  
     */
    @BeforeInsert()
    async hashPasswordBeforeInsert() {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }

    @BeforeUpdate()
    async hashPasswordBeforeUpdate() {
        // ⚠️ Só re-hash se a senha tiver sido alterada
        if (this.password !== this.previousPassword) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        }
    }

    // Quando o TypeORM carregar a entidade do banco, esse método é chamado aqui pegamos a senha original antes de qualquer update
    setPreviousPassword(password: string) {
        this.previousPassword = password;
    }

    

}