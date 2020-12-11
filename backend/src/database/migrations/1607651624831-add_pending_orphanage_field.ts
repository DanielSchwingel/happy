import {MigrationInterface, QueryRunner, TableColumn, Table} from "typeorm";

export class addPendingOrphanageField1607651624831 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const orphanagesTable = await queryRunner.getTable("orphanages");
        const pendingColumn = new TableColumn({ name: "pending", type: "integer", default: 1 });
        await queryRunner.addColumn(orphanagesTable as Table, pendingColumn);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const orphanagesTable = await queryRunner.getTable("orphanages");
        await queryRunner.dropColumn(orphanagesTable as Table, "pending")
    }

}
