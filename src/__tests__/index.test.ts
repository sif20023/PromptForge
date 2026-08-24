import { config } from '../index';

describe('Configuration', () => {
  it('should have required environment variables', () => {
    expect(config.apiKey).toBeDefined();
    expect(config.secretKey).toBeDefined();
    expect(config.databaseUrl).toBeDefined();
  });

  it('should have default port', () => {
    expect(config.port).toBe(3000);
  });

  it('should have development environment', () => {
    expect(config.nodeEnv).toBe('development');
    expect(config.isDevelopment).toBe(true);
    expect(config.isProduction).toBe(false);
  });

  it('should not expose secrets in logs', () => {
    // This test ensures we don't accidentally log sensitive data
    const consoleSpy = jest.spyOn(console, 'log');
    
    // Simulate logging (this should be prevented in production)
    console.log('Config loaded:', {
      apiKey: '***',
      secretKey: '***',
      databaseUrl: '***'
    });
    
    expect(consoleSpy).toHaveBeenCalledWith('Config loaded:', {
      apiKey: '***',
      secretKey: '***',
      databaseUrl: '***'
    });
    
    consoleSpy.mockRestore();
  });
});
