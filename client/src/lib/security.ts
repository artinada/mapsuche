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
 * HSTS (HTTP Strict Transport Security) utilities and monitoring
 */
export const hstsUtils = {
  /**
   * Check if HSTS is properly configured
   */
  checkHSTSStatus: (): Promise<{
    isEnabled: boolean;
    maxAge: number | null;
    includeSubdomains: boolean;
    preload: boolean;
    stage: string;
  }> => {
    return new Promise((resolve) => {
      if (typeof window === 'undefined') {
        resolve({
          isEnabled: false,
          maxAge: null,
          includeSubdomains: false,
          preload: false,
          stage: 'unknown'
        });
        return;
      }

      // Check if we're already on HTTPS
      const isHTTPS = window.location.protocol === 'https:';
      
      // Make a test request to check HSTS headers
      fetch(window.location.origin, { method: 'HEAD' })
        .then(response => {
          const hstsHeader = response.headers.get('Strict-Transport-Security');
          
          if (!hstsHeader) {
            resolve({
              isEnabled: false,
              maxAge: null,
              includeSubdomains: false,
              preload: false,
              stage: 'not-configured'
            });
            return;
          }

          // Parse HSTS header
          const maxAgeMatch = hstsHeader.match(/max-age=(\d+)/);
          const maxAge = maxAgeMatch ? parseInt(maxAgeMatch[1]) : null;
          const includeSubdomains = hstsHeader.includes('includeSubDomains');
          const preload = hstsHeader.includes('preload');

          // Determine deployment stage based on max-age
          let stage = 'unknown';
          if (maxAge) {
            if (maxAge <= 3600) stage = 'stage-1-testing';
            else if (maxAge <= 86400) stage = 'stage-2-short';
            else if (maxAge <= 604800) stage = 'stage-3-medium';
            else if (maxAge <= 2592000) stage = 'stage-4-extended';
            else if (maxAge >= 31536000) stage = 'stage-5-production';
          }

          resolve({
            isEnabled: true,
            maxAge,
            includeSubdomains,
            preload,
            stage
          });
        })
        .catch(() => {
          resolve({
            isEnabled: false,
            maxAge: null,
            includeSubdomains: false,
            preload: false,
            stage: 'error'
          });
        });
    });
  },

  /**
   * Monitor HSTS effectiveness
   */
  monitorHSTS: (): void => {
    if (typeof window === 'undefined') return;

    // Check if user tried to access via HTTP
    if (window.location.protocol === 'http:' && window.location.hostname !== 'localhost') {
      console.warn('HSTS Warning: Site accessed via HTTP instead of HTTPS');
      
      // In production, you might want to log this to your monitoring service
      if (process.env.NODE_ENV === 'production') {
        // Example: Send to logging service
        // logService.warn('HSTS bypass detected', { 
        //   url: window.location.href,
        //   userAgent: navigator.userAgent,
        //   timestamp: new Date().toISOString()
        // });
      }
    }

    // Check HSTS status on page load
    hstsUtils.checkHSTSStatus().then(status => {
      console.log('HSTS Status:', status);
      
      // Log warnings for suboptimal configurations
      if (status.isEnabled && status.maxAge && status.maxAge < 86400) {
        console.warn('HSTS Warning: max-age is less than 1 day, consider increasing for better security');
      }
      
      if (status.isEnabled && !status.includeSubdomains) {
        console.info('HSTS Info: includeSubDomains not set, consider enabling for comprehensive protection');
      }
      
      if (status.isEnabled && !status.preload && status.maxAge && status.maxAge >= 31536000) {
        console.info('HSTS Info: preload not set, consider enabling for HSTS preload list inclusion');
      }
    });
  },

  /**
   * Validate HSTS configuration for security best practices
   */
  validateHSTSConfig: (config: {
    maxAge: number;
    includeSubdomains: boolean;
    preload: boolean;
  }): {
    isValid: boolean;
    warnings: string[];
    recommendations: string[];
  } => {
    const warnings: string[] = [];
    const recommendations: string[] = [];

    // Check max-age
    if (config.maxAge < 3600) {
      warnings.push('max-age is less than 1 hour - too short for effective protection');
    } else if (config.maxAge < 86400) {
      recommendations.push('Consider increasing max-age to at least 1 day for better protection');
    } else if (config.maxAge < 31536000) {
      recommendations.push('Consider increasing max-age to 1 year for production deployment');
    }

    // Check includeSubdomains
    if (!config.includeSubdomains) {
      recommendations.push('Consider enabling includeSubDomains for comprehensive subdomain protection');
    }

    // Check preload
    if (!config.preload && config.maxAge >= 31536000) {
      recommendations.push('Consider enabling preload for HSTS preload list inclusion');
    }

    return {
      isValid: warnings.length === 0,
      warnings,
      recommendations
    };
  },

  /**
   * Get HSTS deployment recommendations based on current stage
   */
  getDeploymentRecommendations: (currentStage: string): {
    nextStage: string;
    timeframe: string;
    actions: string[];
    risks: string[];
  } => {
    const stages = {
      'stage-1-testing': {
        nextStage: 'stage-2-short',
        timeframe: '24-48 hours after successful testing',
        actions: [
          'Monitor for any HTTPS-related issues',
          'Check all site functionality works correctly',
          'Verify no mixed content warnings',
          'Test on different browsers and devices'
        ],
        risks: [
          'Minimal risk due to short max-age',
          'Easy to recover if issues arise'
        ]
      },
      'stage-2-short': {
        nextStage: 'stage-3-medium',
        timeframe: '1 week after successful short-term deployment',
        actions: [
          'Monitor analytics for any drop in traffic',
          'Check for any user-reported issues',
          'Validate all external integrations work',
          'Consider enabling includeSubDomains if using subdomains'
        ],
        risks: [
          'Users will be forced to HTTPS for 1 day',
          'Recovery requires waiting for header expiration'
        ]
      },
      'stage-3-medium': {
        nextStage: 'stage-4-extended',
        timeframe: '2-3 weeks after successful medium-term deployment',
        actions: [
          'Comprehensive security audit',
          'Performance monitoring',
          'User experience validation',
          'Prepare for longer commitment'
        ],
        risks: [
          'Users will be forced to HTTPS for 1 week',
          'Longer recovery time if issues arise'
        ]
      },
      'stage-4-extended': {
        nextStage: 'stage-5-production',
        timeframe: '1-2 months after successful extended deployment',
        actions: [
          'Final security review',
          'Enable includeSubDomains if not already enabled',
          'Consider enabling preload',
          'Prepare for HSTS preload list submission'
        ],
        risks: [
          'Users will be forced to HTTPS for 1 month',
          'Significant commitment to HTTPS-only'
        ]
      },
      'stage-5-production': {
        nextStage: 'hsts-preload-list',
        timeframe: 'After 6+ months of stable operation',
        actions: [
          'Submit to HSTS preload list',
          'Monitor for any security issues',
          'Regular security audits',
          'Keep certificates up to date'
        ],
        risks: [
          'Users will be forced to HTTPS for 1 year',
          'Very difficult to recover from issues',
          'Preload list submission is permanent'
        ]
      }
    };

    return stages[currentStage as keyof typeof stages] || {
      nextStage: 'unknown',
      timeframe: 'unknown',
      actions: ['Review HSTS configuration'],
      risks: ['Unknown configuration state']
    };
  }
};

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