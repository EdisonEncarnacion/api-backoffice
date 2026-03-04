import { Module } from '@nestjs/common';
import { TenantModule } from '../tenant/tenant.module';
import { SectionService } from './section.service';
import { SectionController } from './section.controller';

@Module({
    imports: [TenantModule],
    controllers: [SectionController],
    providers: [SectionService],
    exports: [SectionService],
})
export class SectionModule { }
