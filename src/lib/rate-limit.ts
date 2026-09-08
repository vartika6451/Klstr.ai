export class RateLimiter {
  private windowMs: number;
  private maxRequests: number;
  private requests: Map<string, number[]> = new Map();

  constructor(windowMs: number, maxRequests: number) {
    this.windowMs = windowMs;
    this.maxRequests = maxRequests;
  }

  limit(ip: string): { success: boolean, retryAfter: number } {
    const now = Date.now();
    const windowStart = now - this.windowMs;

    let timestamps = this.requests.get(ip) || [];
    // prune old requests
    timestamps = timestamps.filter(t => t > windowStart);

    if (timestamps.length >= this.maxRequests) {
      const oldest = timestamps[0];
      const retryAfter = Math.ceil((oldest + this.windowMs - now) / 1000);
      this.requests.set(ip, timestamps);
      return { success: false, retryAfter };
    }

    timestamps.push(now);
    this.requests.set(ip, timestamps);
    return { success: true, retryAfter: 0 };
  }
}

// NOTE: For real multi-user production traffic, swap this in-memory limiter 
// for Redis or Upstash, since this state does not persist across serverless instances.
export const chatRateLimit = new RateLimiter(60 * 1000, 20); // 20 msgs per minute
export const uploadRateLimit = new RateLimiter(60 * 1000, 10); // 10 uploads per minute
