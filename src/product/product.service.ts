import { Injectable, Logger } from '@nestjs/common';
import { TenantConnectionProvider } from '../tenant/providers/tenant-connection.provider';
import { Product } from './entities/product.entity';
import { ProductLocal } from './entities/product-local.entity';

@Injectable()
export class ProductService {
  private readonly logger = new Logger(ProductService.name);

  constructor(private readonly tenantConnection: TenantConnectionProvider) { }

  async getProductsForSync(since?: string) {
    const dataSource = await this.tenantConnection.getDataSource();
    const productRepository = dataSource.getRepository(Product);

    const query = productRepository.createQueryBuilder('p');
    if (since) {
      query.where('p.updated_at > :since', { since });
    }
    return await query.getMany();
  }

  async getProductLocalForSync(local_id: string, since?: string) {
    // ── Diagnostic log 1: local_id recibido ──────────────────────────────────
    this.logger.log(`[ProductLocal] local_id recibido: ${local_id}`);

    const dataSource = await this.tenantConnection.getDataSource();

    // ── Diagnostic log 2: tenant activo (nombre del DataSource) ──────────────
    this.logger.log(`[ProductLocal] Tenant/DataSource activo: ${dataSource.options.database ?? dataSource.options.name ?? 'desconocido'}`);

    const productLocalRepository = dataSource.getRepository(ProductLocal);

    // ── Query SOLO sobre product_local, sin JOIN con product ─────────────────
    // El INNER JOIN anterior generaba aliases pl_* y p_* mezclados con getRawMany(),
    // lo que podía devolver filas de otros locales si el JOIN no filtraba bien.
    const query = productLocalRepository
      .createQueryBuilder('pl')
      .where('pl.id_local = :local_id', { local_id });

    if (since) query.andWhere('pl.updated_at > :since', { since });

    // getMany() devuelve entidades tipadas — sin confusión de aliases
    const rows = await query.getMany();

    // ── Diagnostic log 3: count de registros encontrados ─────────────────────
    this.logger.log(`[ProductLocal] Registros encontrados en product_local para local_id ${local_id}: ${rows.length}`);

    // ── Diagnostic log 4: primeros 5 product_id con su id_local ──────────────
    if (rows.length > 0) {
      const sample = rows.slice(0, 5).map(r => `product_id=${r.product_id} | id_local=${r.id_local}`);
      this.logger.debug(`[ProductLocal] Muestra (primeros 5): ${sample.join(' | ')}`);
    }

    // ── Validación estricta: descartar cualquier fila con id_local distinto ───
    const validRows = rows.filter(r => {
      if (r.id_local !== local_id) {
        this.logger.error(
          `[ProductLocal] DESCARTADO — product_id=${r.product_id} tiene id_local='${r.id_local}' ` +
          `pero se solicitó local_id='${local_id}'. Posible contaminación entre locales.`
        );
        return false;
      }
      return true;
    });

    if (validRows.length !== rows.length) {
      this.logger.error(
        `[ProductLocal] Se descartaron ${rows.length - validRows.length} registros con id_local incorrecto. ` +
        `Revisar integridad de product_local.`
      );
    }

    return validRows.map(r => ({
      product_local_id: r.product_local_id,
      product_id: r.product_id,
      id_local: r.id_local,          // valor real de la BD, no del parámetro
      stock: Number(r.stock ?? 0),
      price: Number(r.price ?? 0),
      manage_stock: r.manage_stock ?? false,
      updated_at: r.updated_at,
      created_at: r.created_at,
    }));
  }

  async saveProductLocalFromBranch(data: any[]) {
    const dataSource = await this.tenantConnection.getDataSource();
    const productLocalRepository = dataSource.getRepository(ProductLocal);

    for (const item of data) {
      const existing = await productLocalRepository.findOne({
        where: { product_id: item.product_id, id_local: item.id_local },
      });

      if (existing) {
        Object.assign(existing, {
          stock: item.stock,
          price: item.price,
          manage_stock: item.manage_stock,
          updated_at: new Date(),
        });
        await productLocalRepository.save(existing);
      } else {
        const newRecord = productLocalRepository.create({
          product_id: item.product_id,
          id_local: item.id_local,
          stock: item.stock,
          price: item.price,
          manage_stock: item.manage_stock,
          created_at: new Date(),
          updated_at: new Date(),
          state_audit: 'A',
        });
        await productLocalRepository.save(newRecord);
      }
    }

    return { message: `${data.length} productos locales sincronizados desde Ventas` };
  }
}

