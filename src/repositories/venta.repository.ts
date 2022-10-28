import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Venta, VentaRelations, Cliente, Vehiculo, Servicios} from '../models';
import {ClienteRepository} from './cliente.repository';
import {VehiculoRepository} from './vehiculo.repository';
import {ServiciosRepository} from './servicios.repository';

export class VentaRepository extends DefaultCrudRepository<
  Venta,
  typeof Venta.prototype.id,
  VentaRelations
> {

  public readonly cliente: BelongsToAccessor<Cliente, typeof Venta.prototype.id>;

  public readonly vehiculo: BelongsToAccessor<Vehiculo, typeof Venta.prototype.id>;

  public readonly servicios: BelongsToAccessor<Servicios, typeof Venta.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('VehiculoRepository') protected vehiculoRepositoryGetter: Getter<VehiculoRepository>, @repository.getter('ServiciosRepository') protected serviciosRepositoryGetter: Getter<ServiciosRepository>,
  ) {
    super(Venta, dataSource);
    this.servicios = this.createBelongsToAccessorFor('servicios', serviciosRepositoryGetter,);
    this.registerInclusionResolver('servicios', this.servicios.inclusionResolver);
    this.vehiculo = this.createBelongsToAccessorFor('vehiculo', vehiculoRepositoryGetter,);
    this.registerInclusionResolver('vehiculo', this.vehiculo.inclusionResolver);
    this.cliente = this.createBelongsToAccessorFor('cliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
  }
}
