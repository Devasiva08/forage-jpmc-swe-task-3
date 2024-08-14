import { ServerRespond } from './DataStreamer';

export interface Row {
  stock: string,
  top_ask_price: number,
  timestamp: Date,
  upper_bound: number,
  lower_bound: number,
  trigger_alert: number | undefined,
}


export class DataManipulator {
  static generateRow(serverResponds: ServerRespond[]):Row {
    const priceABC = (serverRespond[0].top_ask.price + serverRespond[0].top_bid.price) /2;
    const priceDEF = (serverRespond[1].top_ask.price + serverRespond[1].top_bid.price) /2;
    const ratio = priceABC /priceDEF;
    const upper_bound = 1 + 0.5;
    const lower_bound = 1 - 0.5;
    return {
        price_abc: priceABC;
        price_def: priceDEF;
        ratio;
        timestamp: serverRespond[0].timestamp > serverRespond[1].timestamp ?
          serverRespond[0].timestamp[0] : serverResponds[1].timestamp,
        upper_bound: upper_Bound,
        lower_bound: lower_Bound,
        trigger_alert: (ratio > upper_bound || ratio < lowerBound) ? ratio : undefined,
      };
    })
  }
}
