import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable, BeforeInsert, BeforeUpdate } from "typeorm";
import bcrypt from "bcryptjs";


@Entity('users')
export class User {
    
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column({ length: 100, nullable: false })
    private _name: string;

    @Column({ unique: true })
    private _email: string;

    @Column({ nullable: false })
    private _password: string;

    private _previousPassword?: string;

    /**
     * Getter name
     * @return {string}
     */
	public get name(): string {
		return this._name;
	}

    /**
     * Getter email
     * @return {string}
     */
	public get email(): string {
		return this._email;
    }

    /**
     * Getter password
     * @return {string}
     */
	public get password(): string {
		return this._password;
	}

    /**
     * Setter name
     * @param {string} value
     */
	public set name(value: string) {
		this._name = value;
	}

    /**
     * Setter email
     * @param {string} value
     */
	public set email(value: string) {
		this._email = value;
	}

	constructor(name:string, email:string, password:string) {
        this._name = name;
        this._email = email;
        this._password = password;
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
        if (this.password !== this._previousPassword) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        }
    }

    // Quando o TypeORM carregar a entidade do banco, esse método é chamado aqui pegamos a senha original antes de qualquer update
    setPreviousPassword(password: string) {
        this._previousPassword = password;
    }

    

}