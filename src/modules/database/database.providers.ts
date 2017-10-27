import { IConnection, createPool, IConnectionConfig } from 'mysql';
import { Config } from '../../config/index';

export const databaseProviders = [
  {
    provide: 'DbConnectionToken',
    useFactory: async (): Promise<IConnection> => {
      return await createPool(Config.DB as IConnectionConfig);
    }
  }
];