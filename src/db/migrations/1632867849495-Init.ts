import { MigrationInterface, QueryRunner } from 'typeorm'

export class Init1632867849495 implements MigrationInterface {
	public async up(_queryRunner: QueryRunner): Promise<void> {}

	public async down(_queryRunner: QueryRunner): Promise<void> {}
}
