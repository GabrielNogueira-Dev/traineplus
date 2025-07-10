declare module 'bcrypt' {
  export function hash(data: string | Buffer, saltOrRounds: number | string): Promise<string>;
  export function compare(data: string | Buffer, encrypted: string): Promise<boolean>;
}
