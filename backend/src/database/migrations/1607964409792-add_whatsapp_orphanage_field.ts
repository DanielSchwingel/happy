import {MigrationInterface, QueryRunner, TableColumn, Table} from "typeorm";

export class addWhatsappOrphanageField1607964409792 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const orphanagesTable = await queryRunner.getTable("orphanages");
        const whatsappColumn = new TableColumn({ name: "whatsapp", type: "integer", isNullable: true });
        await queryRunner.addColumn(orphanagesTable as Table, whatsappColumn);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const orphanagesTable = await queryRunner.getTable("orphanages");
        await queryRunner.dropColumn(orphanagesTable as Table, "whatsapp")
    }

}
