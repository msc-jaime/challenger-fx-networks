export class Subsidiary {
  id!: string;
  razonSocial?: string;
  telefono?: string;
  email?: Date;
}

export class Subsidiaries {
  "subsidiarias": Subsidiary[]
}