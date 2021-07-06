import { AuthInterceptor } from './auth.interceptor';

describe('Interceptor', () => {
  it('should create an instance', () => {
    expect(new AuthInterceptor()).toBeTruthy();
  });
});
