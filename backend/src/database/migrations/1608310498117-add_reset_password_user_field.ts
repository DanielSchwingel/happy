import {MigrationInterface, QueryRunner, Table, TableColumn} from "typeorm";

export class addResetPasswordUserField1608310498117 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const usersTable = await queryRunner.getTable("users");
        const tokenResetPassword = new TableColumn({ name: "token_rp", type: "string", isNullable: true });
        const dateExpirationResetPassword = new TableColumn({ name: "date_expiration_rp", type: "datetime", isNullable: true });
        await queryRunner.addColumn(usersTable as Table, tokenResetPassword);
        await queryRunner.addColumn(usersTable as Table, dateExpirationResetPassword);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const usersTable = await queryRunner.getTable("users");
        await queryRunner.dropColumn(usersTable as Table, "token_rp");
        await queryRunner.dropColumn(usersTable as Table, "date_expiration_rp");
    }

}
