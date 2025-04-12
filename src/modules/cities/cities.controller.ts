import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { City } from './entities/city.entity';

import { CreateCityDto } from './dtos/create-cities/create-city.dto';

import { DeleteCitiesService } from './services/delete-cities/delete-cities.service';
import { DeleteCityService } from './services/delete-cities/delete-city.service';
import { GetCitiesService } from './services/get-cities/get-cities.service';
import { GetCityService } from './services/get-city/get-city.service';
import { PostCitiesService } from './services/post-cities/post-cities.service';
import { PostCityService } from './services/post-city/post-city.service';

@ApiTags('Cities')
@Controller('cities')
export class CitiesController {
  constructor(
    private readonly postCitiesService: PostCitiesService,
    private readonly postCityService: PostCityService,
    private readonly getCityService: GetCityService,
    private readonly getCitiesService: GetCitiesService,
    private readonly deleteCityService: DeleteCityService,
    private readonly deleteCitiesService: DeleteCitiesService,
  ) { }

  @Post('one')
  // @ApiCreatedResponse({
  //   description: 'City created successfully.',
  //   type: City,
  // })
  @ApiOperation({
    summary: 'Create a new city',
    description: 'Creates a new city in the database.',
  })
  @ApiResponse({
    status: 200,
    description: 'Retorna uma mensagem fixa para testes',
    type: String,
  })
  @ApiBody({
    description: 'Dados da cidade a ser criada',
    type: CreateCityDto,
  })
  async createCity(@Body() createCityDto: CreateCityDto): Promise<City> {
    // Logic to create a new city
    const newCity = await this.postCityService.execute(createCityDto);

    return newCity;
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Cities created successfully.',
    type: [City],
  })
  async createCities(@Body() createCityDto: CreateCityDto[]): Promise<City[]> {
    // Logic to create multiple cities
    const newCities = await this.postCitiesService.execute(createCityDto);

    return newCities;
  }

  @Get('all')
  async getAllCities(): Promise<City[]> {
    const cities = await this.getCitiesService.execute();

    return cities;
  }

  @Get('ibge_code/:ibge_code')
  async getCityByIbgeCode(@Param('ibge_code') ibge_code: string): Promise<City | null> {
    const city = await this.getCityService.executeByIbgeCode(ibge_code);

    return city;
  }

  @Delete(':id')
  async deleteCity(@Param('id') id: number): Promise<void> {
    await this.deleteCityService.execute(id);
  }

  @Delete('all')
  async deleteAllCities(): Promise<void> {
    await this.deleteCitiesService.execute();
  }
}
