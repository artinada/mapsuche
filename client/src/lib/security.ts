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
  
  return html.replace(tagRegex, (_, slash, tag) => {
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
 * COOP (Cross-Origin Opener Policy) utilities and monitoring
 */
export const coopUtils = {
  /**
   * Check if COOP headers are properly configured
   */
  checkCOOPStatus: (): Promise<{
    isEnabled: boolean;
    policy: string | null;
    coepEnabled: boolean;
    coepPolicy: string | null;
    crossOriginIsolated: boolean;
  }> => {
    return new Promise((resolve) => {
      if (typeof window === 'undefined') {
        resolve({
          isEnabled: false,
          policy: null,
          coepEnabled: false,
          coepPolicy: null,
          crossOriginIsolated: false
        });
        return;
      }

      // Make a test request to check COOP headers
      fetch(window.location.origin, { method: 'HEAD' })
        .then(response => {
          const coopHeader = response.headers.get('Cross-Origin-Opener-Policy');
          const coepHeader = response.headers.get('Cross-Origin-Embedder-Policy');
          
          resolve({
            isEnabled: !!coopHeader,
            policy: coopHeader,
            coepEnabled: !!coepHeader,
            coepPolicy: coepHeader,
            crossOriginIsolated: window.crossOriginIsolated || false
          });
        })
        .catch(() => {
          resolve({
            isEnabled: false,
            policy: null,
            coepEnabled: false,
            coepPolicy: null,
            crossOriginIsolated: window.crossOriginIsolated || false
          });
        });
    });
  },

  /**
   * Monitor COOP effectiveness and potential bypass attempts
   */
  monitorCOOP: (): void => {
    if (typeof window === 'undefined') return;

    // Check COOP status on page load
    coopUtils.checkCOOPStatus().then(status => {
      // Only log detailed security info in production or when debugging
      const shouldLog = process.env.NODE_ENV === 'production' || 
                       window.location.search.includes('debug=security');
      
      if (shouldLog) {
        console.log('COOP Status:', status);
        
        if (!status.isEnabled) {
          console.warn('COOP Warning: Cross-Origin Opener Policy not configured');
        } else {
          console.log(`COOP Policy: ${status.policy}`);
        }

        if (!status.coepEnabled) {
          console.warn('COEP Warning: Cross-Origin Embedder Policy not configured');
        } else {
          console.log(`COEP Policy: ${status.coepPolicy}`);
        }

        if (status.crossOriginIsolated) {
          console.log('Cross-Origin Isolation: Enabled - Enhanced security features available');
        } else {
          console.info('Cross-Origin Isolation: Disabled - Some security features may be limited');
        }
      }
    });

    // Monitor for potential opener manipulation attempts
    if (window.opener && window.opener !== window) {
      console.warn('COOP Warning: Window has opener reference - potential security risk');
      
      // In production, log this for security monitoring
      if (process.env.NODE_ENV === 'production') {
        // Example: Send to security monitoring service
        // securityLogger.warn('Potential opener manipulation detected', {
        //   referrer: document.referrer,
        //   userAgent: navigator.userAgent,
        //   timestamp: new Date().toISOString()
        // });
      }
    }

    // Check for cross-origin window access attempts
    const originalOpen = window.open;
    window.open = function(...args) {
      const newWindow = originalOpen.apply(window, args);
      
      if (newWindow) {
        // Only log detailed security info in production or when debugging
        const shouldLog = process.env.NODE_ENV === 'production' || 
                         window.location.search.includes('debug=security');
        
        // Monitor for cross-origin access attempts
        try {
          // This will throw if COOP is working correctly for cross-origin windows
          const testAccess = newWindow.location.href;
          if (shouldLog) {
            console.log('Window access allowed:', testAccess);
          }
        } catch (error) {
          if (shouldLog) {
            console.log('COOP: Cross-origin window access properly blocked');
          }
        }
      }
      
      return newWindow;
    };
  },

  /**
   * Validate COOP configuration for security best practices
   */
  validateCOOPConfig: (config: {
    coopPolicy: string;
    coepPolicy: string;
  }): {
    isValid: boolean;
    warnings: string[];
    recommendations: string[];
  } => {
    const warnings: string[] = [];
    const recommendations: string[] = [];

    // Validate COOP policy
    const validCOOPPolicies = ['same-origin', 'same-origin-allow-popups', 'unsafe-none'];
    if (!validCOOPPolicies.includes(config.coopPolicy)) {
      warnings.push(`Invalid COOP policy: ${config.coopPolicy}`);
    } else if (config.coopPolicy === 'unsafe-none') {
      warnings.push('COOP policy "unsafe-none" provides no protection');
    } else if (config.coopPolicy === 'same-origin-allow-popups') {
      recommendations.push('Consider using "same-origin" for maximum security if popups are not needed');
    }

    // Validate COEP policy
    const validCOEPPolicies = ['require-corp', 'credentialless', 'unsafe-none'];
    if (!validCOEPPolicies.includes(config.coepPolicy)) {
      warnings.push(`Invalid COEP policy: ${config.coepPolicy}`);
    } else if (config.coepPolicy === 'unsafe-none') {
      warnings.push('COEP policy "unsafe-none" provides no protection');
    }

    // Check for optimal combination
    if (config.coopPolicy === 'same-origin' && config.coepPolicy === 'require-corp') {
      recommendations.push('Excellent: COOP and COEP configured for maximum cross-origin isolation');
    }

    return {
      isValid: warnings.length === 0,
      warnings,
      recommendations
    };
  },

  /**
   * Test cross-origin isolation capabilities
   */
  testCrossOriginIsolation: (): {
    isIsolated: boolean;
    availableFeatures: string[];
    limitations: string[];
  } => {
    if (typeof window === 'undefined') {
      return {
        isIsolated: false,
        availableFeatures: [],
        limitations: ['Not in browser environment']
      };
    }

    const availableFeatures: string[] = [];
    const limitations: string[] = [];

    // Check if cross-origin isolated
    const isIsolated = window.crossOriginIsolated || false;

    if (isIsolated) {
      // Check for enhanced features available with cross-origin isolation
      if ('SharedArrayBuffer' in window) {
        availableFeatures.push('SharedArrayBuffer');
      }
      
      if ('performance' in window && 'measureUserAgentSpecificMemory' in performance) {
        availableFeatures.push('High-precision memory measurement');
      }
      
      if ('performance' in window && 'now' in performance) {
        // High-resolution timers are more precise with cross-origin isolation
        availableFeatures.push('High-resolution performance timers');
      }
    } else {
      limitations.push('SharedArrayBuffer not available');
      limitations.push('High-precision memory APIs not available');
      limitations.push('Some performance APIs have reduced precision');
    }

    return {
      isIsolated,
      availableFeatures,
      limitations
    };
  }
};

/**
 * Clickjacking protection utilities and monitoring
 */
export const clickjackingUtils = {
  /**
   * Check if clickjacking protection headers are properly configured
   */
  checkClickjackingProtection: (): Promise<{
    xfoEnabled: boolean;
    xfoPolicy: string | null;
    cspFrameAncestors: boolean;
    cspFrameAncestorsPolicy: string | null;
    frameSourceBlocked: boolean;
    protectionLevel: 'none' | 'partial' | 'full';
  }> => {
    return new Promise((resolve) => {
      if (typeof window === 'undefined') {
        resolve({
          xfoEnabled: false,
          xfoPolicy: null,
          cspFrameAncestors: false,
          cspFrameAncestorsPolicy: null,
          frameSourceBlocked: false,
          protectionLevel: 'none'
        });
        return;
      }

      // Make a test request to check headers
      fetch(window.location.origin, { method: 'HEAD' })
        .then(response => {
          const xfoHeader = response.headers.get('X-Frame-Options');
          const cspHeader = response.headers.get('Content-Security-Policy');
          
          // Parse CSP for frame-ancestors directive
          let frameAncestorsPolicy = null;
          let cspFrameAncestors = false;
          let frameSourceBlocked = false;
          
          if (cspHeader) {
            const frameAncestorsMatch = cspHeader.match(/frame-ancestors\s+([^;]+)/);
            if (frameAncestorsMatch) {
              frameAncestorsPolicy = frameAncestorsMatch[1].trim();
              cspFrameAncestors = true;
            }
            
            // Check if frame-src is blocked
            const frameSrcMatch = cspHeader.match(/frame-src\s+([^;]+)/);
            if (frameSrcMatch && frameSrcMatch[1].includes("'none'")) {
              frameSourceBlocked = true;
            }
          }

          // Determine protection level
          let protectionLevel: 'none' | 'partial' | 'full' = 'none';
          if (xfoHeader || cspFrameAncestors) {
            if ((xfoHeader && (xfoHeader.toLowerCase() === 'deny' || xfoHeader.toLowerCase() === 'sameorigin')) &&
                (cspFrameAncestors && (frameAncestorsPolicy === "'none'" || frameAncestorsPolicy === "'self'"))) {
              protectionLevel = 'full';
            } else {
              protectionLevel = 'partial';
            }
          }

          resolve({
            xfoEnabled: !!xfoHeader,
            xfoPolicy: xfoHeader,
            cspFrameAncestors,
            cspFrameAncestorsPolicy: frameAncestorsPolicy,
            frameSourceBlocked,
            protectionLevel
          });
        })
        .catch(() => {
          resolve({
            xfoEnabled: false,
            xfoPolicy: null,
            cspFrameAncestors: false,
            cspFrameAncestorsPolicy: null,
            frameSourceBlocked: false,
            protectionLevel: 'none'
          });
        });
    });
  },

  /**
   * Monitor for clickjacking attempts and frame embedding
   */
  monitorClickjacking: (): void => {
    if (typeof window === 'undefined') return;

    // Check if page is being framed
    const isFramed = window.self !== window.top;
    
    if (isFramed) {
      console.warn('Clickjacking Warning: Page is being displayed in a frame/iframe');
      
      // Try to break out of frame (defense mechanism)
      try {
        if (window.top && window.top.location) {
          window.top.location = window.location;
        }
      } catch (error) {
        // This is expected if proper clickjacking protection is in place
        console.log('Clickjacking Protection: Frame breakout blocked (this is good)');
      }
      
      // Log potential clickjacking attempt in production
      if (process.env.NODE_ENV === 'production') {
        // Example: Send to security monitoring service
        // securityLogger.warn('Potential clickjacking attempt detected', {
        //   referrer: document.referrer,
        //   userAgent: navigator.userAgent,
        //   timestamp: new Date().toISOString(),
        //   frameLevel: window.frames.length
        // });
      }
    }

    // Check clickjacking protection status on page load
    clickjackingUtils.checkClickjackingProtection().then(status => {
      // Only log detailed security info in production or when debugging
      const shouldLog = process.env.NODE_ENV === 'production' || 
                       window.location.search.includes('debug=security');
      
      if (shouldLog) {
        console.log('Clickjacking Protection Status:', status);
        
        if (status.protectionLevel === 'none') {
          console.error('Clickjacking Error: No protection configured');
        } else if (status.protectionLevel === 'partial') {
          console.warn('Clickjacking Warning: Partial protection - consider strengthening');
        } else {
          console.log('Clickjacking Protection: Full protection enabled');
        }

        // Provide specific recommendations
        if (!status.xfoEnabled && !status.cspFrameAncestors) {
          console.warn('Recommendation: Enable X-Frame-Options or CSP frame-ancestors directive');
        } else if (!status.xfoEnabled) {
          console.info('Recommendation: Consider adding X-Frame-Options header for older browser support');
        } else if (!status.cspFrameAncestors) {
          console.info('Recommendation: Consider adding CSP frame-ancestors for modern browser support');
        }
      }
    });

    // Monitor for dynamic iframe creation attempts
    const originalCreateElement = document.createElement;
    document.createElement = function(tagName: string) {
      const element = originalCreateElement.call(document, tagName);
      
      if (tagName.toLowerCase() === 'iframe') {
        // Only log detailed security info in production or when debugging
        const shouldLog = process.env.NODE_ENV === 'production' || 
                         window.location.search.includes('debug=security');
        
        if (shouldLog) {
          console.log('Iframe Creation: New iframe element created');
        }
        
        // Monitor iframe load events
        element.addEventListener('load', () => {
          if (shouldLog) {
            console.log('Iframe Loaded:', (element as HTMLIFrameElement).src);
          }
        });
        
        element.addEventListener('error', () => {
          if (shouldLog) {
            console.log('Iframe Error: Failed to load (possibly blocked by frame-ancestors)');
          }
        });
      }
      
      return element;
    };
  },

  /**
   * Validate clickjacking protection configuration
   */
  validateClickjackingConfig: (config: {
    xfoPolicy: string;
    frameAncestorsPolicy: string;
  }): {
    isValid: boolean;
    warnings: string[];
    recommendations: string[];
  } => {
    const warnings: string[] = [];
    const recommendations: string[] = [];

    // Validate X-Frame-Options policy
    const validXFOPolicies = ['DENY', 'SAMEORIGIN'];
    const xfoUpper = config.xfoPolicy.toUpperCase();
    
    if (!validXFOPolicies.includes(xfoUpper) && !xfoUpper.startsWith('ALLOW-FROM')) {
      warnings.push(`Invalid X-Frame-Options policy: ${config.xfoPolicy}`);
    } else if (xfoUpper.startsWith('ALLOW-FROM')) {
      warnings.push('ALLOW-FROM directive is deprecated and not supported by all browsers');
      recommendations.push('Use CSP frame-ancestors instead of X-Frame-Options ALLOW-FROM');
    } else if (xfoUpper === 'SAMEORIGIN') {
      recommendations.push('Consider using DENY for maximum protection if same-origin framing is not needed');
    }

    // Validate CSP frame-ancestors policy
    if (config.frameAncestorsPolicy) {
      if (config.frameAncestorsPolicy === "'none'") {
        recommendations.push('Excellent: frame-ancestors \'none\' provides maximum clickjacking protection');
      } else if (config.frameAncestorsPolicy === "'self'") {
        recommendations.push('Good: frame-ancestors \'self\' allows same-origin framing only');
      } else if (config.frameAncestorsPolicy.includes('*')) {
        warnings.push('frame-ancestors with wildcard (*) provides minimal protection');
      }
    } else {
      recommendations.push('Consider adding CSP frame-ancestors directive for modern browser support');
    }

    // Check for conflicting policies
    if (xfoUpper === 'SAMEORIGIN' && config.frameAncestorsPolicy === "'none'") {
      warnings.push('Conflicting policies: X-Frame-Options SAMEORIGIN vs frame-ancestors \'none\'');
      recommendations.push('Align both policies for consistent behavior');
    }

    return {
      isValid: warnings.length === 0,
      warnings,
      recommendations
    };
  },

  /**
   * Test clickjacking protection effectiveness
   */
  testClickjackingProtection: (): Promise<{
    canBeFramed: boolean;
    frameBreakoutWorks: boolean;
    protectionEffective: boolean;
    testResults: string[];
  }> => {
    return new Promise((resolve) => {
      if (typeof window === 'undefined') {
        resolve({
          canBeFramed: false,
          frameBreakoutWorks: false,
          protectionEffective: false,
          testResults: ['Not in browser environment']
        });
        return;
      }

      const testResults: string[] = [];
      
      // Test 1: Check if currently framed
      const isCurrentlyFramed = window.self !== window.top;
      testResults.push(`Currently framed: ${isCurrentlyFramed}`);

      // Test 2: Test frame breakout capability
      let frameBreakoutWorks = false;
      if (isCurrentlyFramed) {
        try {
          if (window.top && window.top.location) {
            // If this doesn't throw, frame breakout is possible (bad)
            frameBreakoutWorks = true;
            testResults.push('Frame breakout: Possible (protection may be insufficient)');
          }
        } catch (error) {
          // This is expected with proper protection
          frameBreakoutWorks = false;
          testResults.push('Frame breakout: Blocked (good protection)');
        }
      } else {
        testResults.push('Frame breakout: Not applicable (not currently framed)');
      }

      // Test 3: Create test iframe to check if our own content can be framed
      const testIframe = document.createElement('iframe');
      testIframe.style.display = 'none';
      testIframe.src = window.location.origin;
      
      let canBeFramed = false;
      
      const loadTimeout = setTimeout(() => {
        testResults.push('Iframe test: Timeout (likely blocked by protection)');
        document.body.removeChild(testIframe);
        
        resolve({
          canBeFramed: false,
          frameBreakoutWorks,
          protectionEffective: !canBeFramed && !frameBreakoutWorks,
          testResults
        });
      }, 3000);

      testIframe.onload = () => {
        clearTimeout(loadTimeout);
        canBeFramed = true;
        testResults.push('Iframe test: Loaded successfully (protection may be insufficient)');
        document.body.removeChild(testIframe);
        
        resolve({
          canBeFramed,
          frameBreakoutWorks,
          protectionEffective: !canBeFramed && !frameBreakoutWorks,
          testResults
        });
      };

      testIframe.onerror = () => {
        clearTimeout(loadTimeout);
        canBeFramed = false;
        testResults.push('Iframe test: Failed to load (good protection)');
        document.body.removeChild(testIframe);
        
        resolve({
          canBeFramed,
          frameBreakoutWorks,
          protectionEffective: !canBeFramed && !frameBreakoutWorks,
          testResults
        });
      };

      document.body.appendChild(testIframe);
    });
  },

  /**
   * Get clickjacking protection recommendations
   */
  getProtectionRecommendations: (currentConfig: {
    hasXFO: boolean;
    hasFrameAncestors: boolean;
    xfoPolicy?: string;
    frameAncestorsPolicy?: string;
  }): {
    level: 'basic' | 'enhanced' | 'maximum';
    recommendations: string[];
    implementation: string[];
  } => {
    if (!currentConfig.hasXFO && !currentConfig.hasFrameAncestors) {
      // No protection
      return {
        level: 'basic',
        recommendations: [
          'Implement X-Frame-Options header for basic protection',
          'Add CSP frame-ancestors directive for modern browsers',
          'Consider using DENY policy for maximum security'
        ],
        implementation: [
          'Server: Add "X-Frame-Options: DENY" header',
          'CSP: Add "frame-ancestors \'none\'" directive',
          'Client: Add meta tag fallback'
        ]
      };
    } else if (currentConfig.hasXFO && currentConfig.hasFrameAncestors) {
      // Full protection
      return {
        level: 'maximum',
        recommendations: [
          'Excellent: Both X-Frame-Options and CSP frame-ancestors configured',
          'Monitor for any framing attempts',
          'Regularly test protection effectiveness'
        ],
        implementation: [
          'Current configuration provides maximum protection',
          'Consider adding client-side monitoring',
          'Implement security event logging'
        ]
      };
    } else {
      // Partial protection
      return {
        level: 'enhanced',
        recommendations: [
          currentConfig.hasXFO ? 'Add CSP frame-ancestors for modern browser support' : 'Add X-Frame-Options for legacy browser support',
          'Implement both methods for comprehensive protection',
          'Test effectiveness across different browsers'
        ],
        implementation: [
          currentConfig.hasXFO ? 'CSP: Add "frame-ancestors \'none\'" directive' : 'Server: Add "X-Frame-Options: DENY" header',
          'Ensure both headers are consistent',
          'Add monitoring and testing capabilities'
        ]
      };
    }
  }
};

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
      // Only log detailed security info in production or when debugging
      const shouldLog = process.env.NODE_ENV === 'production' || 
                       window.location.search.includes('debug=security');
      
      if (shouldLog) {
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