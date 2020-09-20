import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { readFileSync } from 'fs';
import { join } from 'path';
// import pokemon from './resources/pokemon/pokemon.json';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/pokemon')
  getPokemon(): any {
    const path = join(__dirname, '..', 'resources/pokemon/pokemon.json');
    return readFileSync(path, 'utf8');
  }
}
