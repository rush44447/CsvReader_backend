export class CreateUserDto {
  readonly name: string;
  readonly age: number;
  readonly address: Record<string, any>;
  readonly additional_info: Record<string, any>;
}