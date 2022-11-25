import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class PaginationMiddleware implements NestMiddleware {
  use(req: PaginationRequest, res: Response, next: () => void) {
    console.log('🚀in the mid 🍬')
    const { limit = '3', page = '1' } = req.query;
    req.paginate = { limit, page};
    next();
  }
}

interface PaginationRequest extends Request {
  paginate: {
    limit: any;
    page: any;
  };
}
