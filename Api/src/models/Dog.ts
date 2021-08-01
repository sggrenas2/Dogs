import {Model, Column, Table, CreatedAt, UpdatedAt, DataType} from 'sequelize-typescript';

@Table
export class Dog extends Model<Dog>{

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name!: string;
    
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    minHeight!: number;
    
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    maxHeight!: number;
    
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    minWeight!: number;
    
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    maxWeight!: number;
    
    @Column({
        type: DataType.INTEGER,
        allowNull: true
    })
    lifeSpan!: number;
    
    @Column({
        type: DataType.STRING,
        allowNull: true,
        defaultValue: null
    })
    img!: string;
    
    @Column(DataType.VIRTUAL)
    get hId(){
        return this.getDataValue('id')+'H';
    }

    @CreatedAt
    @Column
    createdAt!:Date;

    @UpdatedAt
    @Column
    updatedAt!: Date;
}