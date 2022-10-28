import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Cliente} from './cliente.model';
import {Vehiculo} from './vehiculo.model';
import {Servicios} from './servicios.model';

@model()
export class Venta extends Entity {
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
  fecha: string;

  @belongsTo(() => Cliente)
  clienteId: string;

  @belongsTo(() => Vehiculo)
  vehiculoId: string;

  @belongsTo(() => Servicios)
  serviciosId: string;

  constructor(data?: Partial<Venta>) {
    super(data);
  }
}

export interface VentaRelations {
  // describe navigational properties here
}

export type VentaWithRelations = Venta & VentaRelations;
