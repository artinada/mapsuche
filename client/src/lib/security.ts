// Security utilities for XSS prevention and input sanitization

/**
 * Sanitize user input to prevent XSS attacks
 * This is used as an additional layer of protection alongside CSP
 */
export const sanitizeInput = (input: string): string => {
  if (typeof input !== 'string') return '';
  
  return input
    // Remove HTML tags
    .replace(/<[^>]*>/g, '')
    // Remove JavaScript protocol
    .replace(/javascript:/gi, '')
    // Remove data URLs
    .replace(/data:/gi, '')
    // Remove vbscript protocol
    .replace(/vbscript:/gi, '')
    // Remove onload, onclick, etc.
    .replace(/on\w+\s*=/gi, '')
    // Trim whitespace
    .trim();
};

/**
 * Sanitize HTML content for safe display
 * Used for user-generated content that needs to be displayed
 */
export const sanitizeHTML = (html: string): string => {
  if (typeof html !== 'string') return '';
  
  // Allow only safe HTML tags and attributes
  const allowedTags = ['p', 'br', 'strong', 'em', 'u', 'b', 'i'];
  const tagRegex = /<(\/?)([\w]+)([^>]*)>/gi;
  
  return html.replace(tagRegex, (match, slash, tag, attributes) => {
    const tagLower = tag.toLowerCase();
    
    // Only allow whitelisted tags
    if (!allowedTags.includes(tagLower)) {
      return '';
    }
    
    // Remove all attributes for security
    return `<${slash}${tagLower}>`;
  });
};

/**
 * Validate email format with additional security checks
 */
export const isValidEmail = (email: string): boolean => {
  if (typeof email !== 'string') return false;
  
  // Basic email regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  // Additional security checks
  const hasValidLength = email.length <= 254; // RFC 5321 limit
  const noScriptTags = !/<script/i.test(email);
  const noJavaScript = !/javascript:/i.test(email);
  
  return emailRegex.test(email) && hasValidLength && noScriptTags && noJavaScript;
};

/**
 * Validate phone number format
 */
export const isValidPhone = (phone: string): boolean => {
  if (typeof phone !== 'string') return false;
  
  // Allow international phone numbers with basic format validation
  const phoneRegex = /^[\+]?[\d\s\-\(\)]{7,20}$/;
  const noScriptTags = !/<script/i.test(phone);
  
  return phoneRegex.test(phone) && noScriptTags;
};

/**
 * Validate URL format and check for malicious protocols
 */
export const isValidURL = (url: string): boolean => {
  if (typeof url !== 'string') return false;
  
  try {
    const urlObj = new URL(url);
    
    // Only allow safe protocols
    const allowedProtocols = ['http:', 'https:', 'mailto:'];
    
    return allowedProtocols.includes(urlObj.protocol);
  } catch {
    return false;
  }
};

/**
 * Generate a secure nonce for CSP
 */
export const generateNonce = (): string => {
  if (typeof window !== 'undefined' && window.crypto) {
    const array = new Uint8Array(16);
    window.crypto.getRandomValues(array);
    return btoa(String.fromCharCode(...array));
  }
  
  // Fallback for environments without crypto API
  return Math.random().toString(36).substr(2, 16);
};

/**
 * Content Security Policy violation handler
 */
export const handleCSPViolation = (event: SecurityPolicyViolationEvent): void => {
  console.warn('CSP Violation:', {
    blockedURI: event.blockedURI,
    violatedDirective: event.violatedDirective,
    originalPolicy: event.originalPolicy,
    documentURI: event.documentURI,
    sourceFile: event.sourceFile,
    lineNumber: event.lineNumber,
    columnNumber: event.columnNumber,
  });
  
  // In production, you might want to send this to your logging service
  if (process.env.NODE_ENV === 'production') {
    // Example: Send to logging service
    // logService.error('CSP Violation', { event });
  }
};

/**
 * Initialize CSP violation reporting
 */
export const initCSPReporting = (): void => {
  if (typeof window !== 'undefined') {
    window.addEventListener('securitypolicyviolation', handleCSPViolation);
  }
};

/**
 * Rate limiting for form submissions
 */
class RateLimiter {
  private attempts: Map<string, number[]> = new Map();
  private readonly maxAttempts: number;
  private readonly windowMs: number;

  constructor(maxAttempts = 5, windowMs = 300000) { // 5 attempts per 5 minutes
    this.maxAttempts = maxAttempts;
    this.windowMs = windowMs;
  }

  isAllowed(identifier: string): boolean {
    const now = Date.now();
    const attempts = this.attempts.get(identifier) || [];
    
    // Remove old attempts outside the window
    const recentAttempts = attempts.filter(time => now - time < this.windowMs);
    
    if (recentAttempts.length >= this.maxAttempts) {
      return false;
    }
    
    // Add current attempt
    recentAttempts.push(now);
    this.attempts.set(identifier, recentAttempts);
    
    return true;
  }
}

export const formRateLimiter = new RateLimiter();

/**
 * Secure local storage wrapper
 */
export const secureStorage = {
  setItem: (key: string, value: string): void => {
    try {
      // Sanitize the key and value
      const sanitizedKey = sanitizeInput(key);
      const sanitizedValue = sanitizeInput(value);
      
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(sanitizedKey, sanitizedValue);
      }
    } catch (error) {
      console.warn('Failed to set localStorage item:', error);
    }
  },
  
  getItem: (key: string): string | null => {
    try {
      const sanitizedKey = sanitizeInput(key);
      
      if (typeof window !== 'undefined' && window.localStorage) {
        const value = window.localStorage.getItem(sanitizedKey);
        return value ? sanitizeInput(value) : null;
      }
      
      return null;
    } catch (error) {
      console.warn('Failed to get localStorage item:', error);
      return null;
    }
  },
  
  removeItem: (key: string): void => {
    try {
      const sanitizedKey = sanitizeInput(key);
      
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.removeItem(sanitizedKey);
      }
    } catch (error) {
      console.warn('Failed to remove localStorage item:', error);
    }
  }
}; 