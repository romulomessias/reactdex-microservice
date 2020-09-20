import { Controller, Get, Header } from '@nestjs/common';
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
  @Header('content-type', 'application/json')
  @Header('transfer-encoding', 'chunked')
  // @Header('access-control-allow-origin', '*')
  getPokemon(): any {
    const path = join(__dirname, '..', 'resources/pokemon/pokemon.json');
    return readFileSync(path, 'utf8');
  }
}
