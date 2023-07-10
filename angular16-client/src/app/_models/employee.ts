export class Employee {
  id!: string;
  nombre?: string;
  cedula?: string;
  fechaContratacion?: Date;
  puesto?: string;
  oficina?: string;
  subsidiariaId?: bigint
}

export class Employees {
  "empleados": Employee[]
}