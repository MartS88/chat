import {Controller, Get, Param, Query} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {ApiService} from './api.service';


@ApiTags('Api')
@Controller('api')
export class ApiController {

  constructor(private readonly apiService: ApiService) {
  }

  @ApiOperation({summary: 'Get protocols'})
  @ApiResponse({status: 200, description: 'Protocols fetched successfully'})
  @ApiResponse({status: 400, description: 'Bad Request'})
  @ApiResponse({status: 500, description: 'Internal Server Error'})
  @Get('protocols')
  async fetchProtocols() {
    try {
      const protocols = await this.apiService.getProtocols();
      return {success: true, data: protocols.data};
    } catch (error) {
      return {success: false, error: error.message};
    }
  }

  @ApiOperation({summary: 'Get chains'})
  @ApiResponse({status: 200, description: 'Chains fetched successfully'})
  @ApiResponse({status: 400, description: 'Bad Request'})
  @ApiResponse({status: 500, description: 'Internal Server Error'})
  @Get('chains')
  async fetchChains() {
    try {
      const chains = await this.apiService.getChains();
      return {success: true, data: chains.data};
    } catch (error) {
      return {success: false, error: error.message};
    }
  }

  @ApiOperation({summary: 'Get Dex'})
  @ApiResponse({status: 200, description: `Dex's fetched successfully`})
  @ApiResponse({status: 400, description: 'Bad Request'})
  @ApiResponse({status: 500, description: 'Internal Server Error'})
  @Get('dex')
  async fetchDex() {
    try {
      const dex = await this.apiService.getDex();
      return {success: true, data: dex.data};
    } catch (error) {
      return {success: false, error: error.message};
    }
  }

  @ApiOperation({summary: 'Get Pools'})
  @ApiResponse({status: 200, description: `Pools fetched successfully`})
  @ApiResponse({status: 400, description: 'Bad Request'})
  @ApiResponse({status: 500, description: 'Internal Server Error'})
  @Get('pools')
  async fetchPools() {
    try {
      const pools = await this.apiService.getPools();
      return {success: true, data: pools.data};
    } catch (error) {
      return {success: false, error: error.message};
    }
  }

  @ApiOperation({summary: 'Get coins'})
  @ApiResponse({status: 200, description: `Coins fetched successfully`})
  @ApiResponse({status: 400, description: 'Bad Request'})
  @ApiResponse({status: 500, description: 'Internal Server Error'})
  @Get('/coins')
  async fetchCoinsList(@Query('limit') limit?: string): Promise<any> {
    try {
      const coinsList = await this.apiService.getCoinList(limit || '1000');
      return {success: true, data: coinsList.data};
    } catch (error) {
      return {error: error.message};
    }
  }

  @ApiOperation({summary: 'Get coin'})
  @ApiResponse({status: 200, description: `Coin fetched successfully`})
  @ApiResponse({status: 400, description: 'Bad Request'})
  @ApiResponse({status: 500, description: 'Internal Server Error'})
  @Get('coins/:coinId')
  async fetchCoinById(@Param('coinId') coinId: string): Promise<any> {
    try {
      const coin = await this.apiService.getCoinById(coinId);
      return {success: true, data: coin.data};
    } catch (error) {
      return {error: error.message};
    }
  }

  @ApiOperation({summary: 'Get markets'})
  @ApiResponse({status: 200, description: `Market fetched successfully`})
  @ApiResponse({status: 400, description: 'Bad Request'})
  @ApiResponse({status: 500, description: 'Internal Server Error'})
  @Get('markets')
  async fetchMarketsData(): Promise<any> {
    try {
      const markets = await this.apiService.getMarketsData();
      return {success: true, data: markets.data};
    } catch (error) {
      return {error: error.message};
    }
  }

  @ApiOperation({summary: `Get nft's`})
  @ApiResponse({status: 200, description: `Nft's fetched successfully`})
  @ApiResponse({status: 400, description: 'Bad Request'})
  @ApiResponse({status: 500, description: 'Internal Server Error'})
  @Get('nft')
  async fetchNft(@Query('limit') limit?: string): Promise<any> {
    try {
      const nft = await this.apiService.getNft(limit || '100');
      return {success: true, data: nft.data.data};
    } catch (error) {
      return {error: error.message};
    }
  }

  @ApiOperation({summary: 'Get news'})
  @ApiResponse({status: 200, description: `News fetched successfully`})
  @ApiResponse({status: 400, description: 'Bad Request'})
  @ApiResponse({status: 500, description: 'Internal Server Error'})
  @Get('/news')
  async fetchNews(@Query('limit') limit?: string): Promise<any> {
    try {
      const news = await this.apiService.getNews(limit || '100');
      return {success: true, data: news.data.result};
    } catch (error) {
      return {error: error.message};
    }
  }

  @ApiOperation({summary: 'Get fear & greed index'})
  @ApiResponse({status: 200, description: `Fear & greed index fetched successfully`})
  @ApiResponse({status: 400, description: 'Bad Request'})
  @ApiResponse({status: 500, description: 'Internal Server Error'})
  @Get('/fear')
  async fetchFearAndGreed(): Promise<any> {
    try {
      const fear = await this.apiService.getFearGreedHistory();
      return {success: true, data: fear.data.data};
    } catch (error) {
      return {error: error.message};
    }
  }
}
