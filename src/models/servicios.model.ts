import {Entity, model, property, hasMany} from '@loopback/repository';
import {Venta} from './venta.model';

@model()
export class Servicios extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  codigo_servicio: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre_servicio: string;

  @property({
    type: 'string',
    required: true,
  })
  valor_servicio: string;

  @hasMany(() => Venta)
  ventas: Venta[];

  constructor(data?: Partial<Servicios>) {
    super(data);
  }
}

export interface ServiciosRelations {
  // describe navigational properties here
}

export type ServiciosWithRelations = Servicios & ServiciosRelations;
