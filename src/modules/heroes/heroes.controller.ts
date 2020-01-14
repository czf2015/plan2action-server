import { Controller } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { Hero } from './entities/hero.entity';
import { HeroesService } from './heroes.service';


@Crud({
  model: {
    type: Hero,
  },
  // join: {
  //   profile: {
  //     exclude: ['secret'],
  //   },
  //   faction: {
  //     eager: true,
  //     only: ['name'],
  //   },
  // },
})

@Controller('heroes')
export class HeroesController {
  constructor(public service: HeroesService) { }
}