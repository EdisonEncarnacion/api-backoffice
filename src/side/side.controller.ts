import { Controller, Get } from '@nestjs/common';
import { SideService } from './side.service';
import { Side } from './entities/side.entity';

@Controller('side')
export class SideController {
    constructor(private readonly sideService: SideService) { }

    @Get()
    findAll(): Promise<Side[]> {
        return this.sideService.findAll();
    }
}
