interface RateLimitEntry {
  count: number;
  resetTime: number;
  blocked: boolean;
}

// Simple in-memory rate limiting with cleanup
const requests = new Map<string, RateLimitEntry>();

export function isRateLimited(
  identifier: string, 
  limit: number = 5, 
  windowMs: number = 60000,
  blockDuration: number = 300000 // 5 minutes block
): boolean {
  if (!identifier) {
    console.warn('Rate limiting: No identifier provided');
    return false;
  }

  const now = Date.now();
  const userRequests = requests.get(identifier);

  // Check if user is currently blocked
  if (userRequests?.blocked && now < userRequests.resetTime) {
    return true;
  }

  if (!userRequests || now > userRequests.resetTime) {
    requests.set(identifier, { 
      count: 1, 
      resetTime: now + windowMs,
      blocked: false 
    });
    return false;
  }

  if (userRequests.count >= limit) {
    // Block the user for a longer period
    userRequests.blocked = true;
    userRequests.resetTime = now + blockDuration;
    console.warn(`Rate limit exceeded for ${identifier}. Blocked for ${blockDuration}ms`);
    return true;
  }

  userRequests.count++;
  return false;
}

export function getRateLimitInfo(identifier: string): { 
  remaining: number; 
  resetTime: number; 
  blocked: boolean; 
} | null {
  const userRequests = requests.get(identifier);
  if (!userRequests) {
    return null;
  }

  return {
    remaining: Math.max(0, 5 - userRequests.count),
    resetTime: userRequests.resetTime,
    blocked: userRequests.blocked,
  };
}
// Clean up old entries periodically
const cleanup = () => {
  const now = Date.now();
  let cleaned = 0;
  
  for (const [key, value] of requests.entries()) {
    if (now > value.resetTime) {
      requests.delete(key);
      cleaned++;
    }
  }
  
  if (cleaned > 0) {
    console.log(`Rate limit cleanup: removed ${cleaned} expired entries`);
  }
};

// Run cleanup every 5 minutes
setInterval(cleanup, 300000);

// Initial cleanup
cleanup();