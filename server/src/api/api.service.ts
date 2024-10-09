import {Injectable, NotFoundException} from '@nestjs/common';
import axios from 'axios';

const sdk = require('api')('@coinstatsopenapi/v1.0#8fc3kgx93i1locyjj6r');

@Injectable()
export class ApiService {
  private readonly options = {
    headers: {
      accept: 'application/json',
      'X-API-KEY': '7k1O2YikvElOhT9sXIYbqMSHTXXxd8jIgcPrs7TQKNc='
    }
  };



  async getProtocols(): Promise<any> {
    const protocols = await axios.get('https://api.llama.fi/protocols');
    return protocols;
  }

  async getChains(): Promise<any> {
    const chains = await axios.get('https://api.llama.fi/v2/chains');
    return chains;
  }


  async getDex(): Promise<any> {
    const dex = await axios.get('https://api.llama.fi/overview/dexs?excludeTotalDataChart=true&excludeTotalDataChartBreakdown=true&dataType=dailyVolume');
    return dex;
  }

  async getPools():Promise<any>{
    const pools = await axios.get('https://yields.llama.fi/pools');
    return pools
  }
  async getCoinList(limit: string): Promise<any> {
    try {
      const response = await axios.get(`https://openapiv1.coinstats.app/coins?limit=${limit}`,this.options)
      return response;
    } catch (error) {
      console.error('Error fetching coin list:', error);
      throw new Error('Unable to fetch coin list');
    }
  }

  async getCoinById(coinId: string): Promise<any> {
    try {

      const response = await axios.get(`https://openapiv1.coinstats.app/coins/coinId/${coinId}`,this.options)
      return response;
    } catch (error) {
      if (error.statusCode === 404) {
        throw new NotFoundException(`Coin with ID ${coinId} not found`);
      } else {
        console.error(`Error fetching coin with ID ${coinId}:`, error);
        throw new Error('Unable to fetch coin details');
      }
    }
  }

  async getMarketsData(): Promise<any> {
    try {

      const response = await axios.get('https://openapiv1.coinstats.app/markets',this.options)
      return response;
    } catch (error) {
      console.error('Error fetching Markets Data', error);
      throw new Error('Unable to fetch Markets Data');
    }
  }



  async getNft(limit: string): Promise<any> {
    try {

      const response = await axios.get(`https://openapiv1.coinstats.app/nft/trending?limit=${limit}`,this.options)
      return response;
    } catch (error) {
      console.error('Error fetching nft data', error);
      throw new Error('Unable to fetch nft data');
    }
  }

  async getNews(limit: string): Promise<any> {
    try {

      const response = await axios.get(`https://openapiv1.coinstats.app/news?limit=${limit}`,this.options)
      return response;
    } catch (error) {
      console.error('Error fetching news data', error);
      throw new Error('Unable to fetch news data');
    }
  }

  async getFearGreedHistory():Promise<any>{
    const response = await axios.get('https://api.alternative.me/fng/?limit=10')
    return response
  }


}
