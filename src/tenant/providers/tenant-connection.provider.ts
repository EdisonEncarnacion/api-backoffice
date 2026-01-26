// src/tenant/providers/tenant-connection.provider.ts
import { Scope, Injectable, Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { DataSource } from 'typeorm';
import { TenantResolver } from '../tenant.resolver';
import { TenantConnectionManager } from '../tenant-connection.manager';

@Injectable({ scope: Scope.REQUEST })
export class TenantConnectionProvider {
    private dataSource: DataSource;

    constructor(
        @Inject(REQUEST) private readonly request: Request,
        private readonly tenantResolver: TenantResolver,
        private readonly connectionManager: TenantConnectionManager,
    ) { }

    async getDataSource(): Promise<DataSource> {
        if (this.dataSource) {
            return this.dataSource;
        }

        const subdomain = this.request['subdomain'];
        const tenant = await this.tenantResolver.getTenantBySubdomain(subdomain);
        this.dataSource = await this.connectionManager.getConnection(tenant);

        return this.dataSource;
    }
}
