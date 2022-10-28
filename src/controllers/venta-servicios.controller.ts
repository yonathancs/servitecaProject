import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Venta,
  Servicios,
} from '../models';
import {VentaRepository} from '../repositories';

export class VentaServiciosController {
  constructor(
    @repository(VentaRepository)
    public ventaRepository: VentaRepository,
  ) { }

  @get('/ventas/{id}/servicios', {
    responses: {
      '200': {
        description: 'Servicios belonging to Venta',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Servicios)},
          },
        },
      },
    },
  })
  async getServicios(
    @param.path.string('id') id: typeof Venta.prototype.id,
  ): Promise<Servicios> {
    return this.ventaRepository.servicios(id);
  }
}
