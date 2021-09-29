/* eslint-disable @typescript-eslint/no-empty-function */
export class FakeEntity {
	public create(): void {}
	public async save(): Promise<void> {}
	public async remove(): Promise<void> {}
	public async delete(): Promise<void> {}
	public async findOne(): Promise<void> {}
	public async find(): Promise<void> {}
	public async update(): Promise<void> {}
	public async findOneOrFail(): Promise<void> {}
	public async query(): Promise<void> {}
}
