import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Servicios,
  Venta,
} from '../models';
import {ServiciosRepository} from '../repositories';

export class ServiciosVentaController {
  constructor(
    @repository(ServiciosRepository) protected serviciosRepository: ServiciosRepository,
  ) { }

  @get('/servicios/{id}/ventas', {
    responses: {
      '200': {
        description: 'Array of Servicios has many Venta',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Venta)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Venta>,
  ): Promise<Venta[]> {
    return this.serviciosRepository.ventas(id).find(filter);
  }

  @post('/servicios/{id}/ventas', {
    responses: {
      '200': {
        description: 'Servicios model instance',
        content: {'application/json': {schema: getModelSchemaRef(Venta)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Servicios.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Venta, {
            title: 'NewVentaInServicios',
            exclude: ['id'],
            optional: ['serviciosId']
          }),
        },
      },
    }) venta: Omit<Venta, 'id'>,
  ): Promise<Venta> {
    return this.serviciosRepository.ventas(id).create(venta);
  }

  @patch('/servicios/{id}/ventas', {
    responses: {
      '200': {
        description: 'Servicios.Venta PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Venta, {partial: true}),
        },
      },
    })
    venta: Partial<Venta>,
    @param.query.object('where', getWhereSchemaFor(Venta)) where?: Where<Venta>,
  ): Promise<Count> {
    return this.serviciosRepository.ventas(id).patch(venta, where);
  }

  @del('/servicios/{id}/ventas', {
    responses: {
      '200': {
        description: 'Servicios.Venta DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Venta)) where?: Where<Venta>,
  ): Promise<Count> {
    return this.serviciosRepository.ventas(id).delete(where);
  }
}
