import {MigrationInterface, QueryRunner,Table} from "typeorm";

export class CreateMessages1619112275386 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name:"messages",
                columns:[
                    {
                        name:"id",
                        type: "uuid",
                        isPrimary:true
                    },
                    {
                        name:"admin_id",
                        type: "uuid",
                        isNullable:true,
                    },
                    {
                        name:"user_id",
                        type: "uuid",
                    },
                    
                    {
                        name:"text",
                        type: "varchar",
                    },
                    {
                        name:"updated_at",
                        type: "timestamp",
                        default: "now()"
                    },
                    {
                        name:"created_at",
                        type: "timestamp",
                        default: "now()"
                    },
                ],
                foreignKeys:[{
                    name: "FKUser",
                    referencedTableName:"users",
                    referencedColumnNames:["id"],
                    columnNames:["user_id"],
                    onDelete: "SET NULL",
                    onUpdate: "SET NULL",
                }]
            })
        );
    }

    //sempre que tiver user_id vou estar referenciando o id da tabela de usuarios

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("messages");
    }

}
