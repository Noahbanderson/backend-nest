import {
	PipeTransform,
	Injectable,
	ArgumentMetadata,
	BadRequestException,
} from '@nestjs/common'

@Injectable()
export class ParseIntArrayPipe implements PipeTransform {
	transform(value: any, _metadata: ArgumentMetadata) {
		const values = value.split(',').map((v: string) => parseInt(v))

		if (values.length > 0 && values.every((v: number) => !isNaN(v))) {
			return values
		} else {
			throw new BadRequestException('Validation failed (array of numbers is expected)')
		}
	}
}
