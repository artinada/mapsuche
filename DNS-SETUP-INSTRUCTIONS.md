# 📧 Email Forwarding Setup for mapsuche.de

## ✅ **What's Already Done**

I've successfully set up the AWS infrastructure for you:

1. **✅ AWS Lambda Function**: `mapsuche-email-forwarder` (deployed)
2. **✅ SES Rule Set**: `mapsuche-email-forwarding` (active)
3. **✅ SES Receipt Rule**: `forward-all-emails-simple` (configured)
4. **✅ Email Verification**: `artinada@gmail.com` (check your Gmail inbox)
5. **✅ S3 Bucket**: `mapsuche-emails-1750500609` (created for backup)

---

## 🎯 **CRITICAL: DNS Records You Must Add**

### **1. MX Record (Required for Email Receiving)**
```
Type: MX
Name: @ (or leave blank for root domain)
Value: 10 inbound-smtp.eu-central-1.amazonaws.com
Priority: 10
TTL: 300
```

### **2. Domain Verification TXT Record**
```
Type: TXT
Name: _amazonses.mapsuche.de
Value: [GET THIS FROM AWS SES CONSOLE]
TTL: 300
```

**🚨 To get the verification token:**
1. Go to [AWS SES Console](https://eu-central-1.console.aws.amazon.com/sesv2/home?region=eu-central-1#/verified-identities)
2. Click on `mapsuche.de`
3. Copy the verification token from the "DomainKeys Identified Mail (DKIM)" section

**OR run this command:**
```bash
aws ses get-identity-verification-attributes --identities mapsuche.de --region eu-central-1
```

---

## 📋 **How to Add DNS Records**

### **If using a domain registrar (like GoDaddy, Namecheap, etc.):**

1. **Log into your domain registrar's control panel**
2. **Navigate to DNS Management / DNS Settings**
3. **Add the MX record:**
   - Record Type: `MX`
   - Host/Name: `@` or leave blank
   - Points to: `10 inbound-smtp.eu-central-1.amazonaws.com`
   - Priority: `10`
   - TTL: `300`

4. **Add the TXT record:**
   - Record Type: `TXT`
   - Host/Name: `_amazonses.mapsuche.de`
   - Value: `[the verification token from AWS]`
   - TTL: `300`

### **If using Cloudflare:**

1. **Go to Cloudflare Dashboard → DNS**
2. **Add MX Record:**
   - Type: `MX`
   - Name: `@`
   - Mail server: `inbound-smtp.eu-central-1.amazonaws.com`
   - Priority: `10`
   - TTL: `Auto`

3. **Add TXT Record:**
   - Type: `TXT`
   - Name: `_amazonses.mapsuche.de`
   - Content: `[verification token]`
   - TTL: `Auto`

---

## ⏱️ **Timeline & Testing**

### **After Adding DNS Records:**
- **DNS Propagation**: 15-30 minutes (sometimes up to 24 hours)
- **Domain Verification**: Usually within 15 minutes after DNS propagation

### **Testing Email Forwarding:**
1. **Wait for DNS propagation**
2. **Send a test email to:** `test@mapsuche.de`
3. **Check your Gmail:** `artinada@gmail.com`
4. **You should receive:** `[mapsuche.de] [Original Subject]`

---

## 🔧 **Verification Commands**

### **Check if domain is verified:**
```bash
aws ses get-identity-verification-attributes --identities mapsuche.de --region eu-central-1
```

### **Check DNS propagation:**
```bash
nslookup -type=MX mapsuche.de
nslookup -type=TXT _amazonses.mapsuche.de
```

### **Test email sending:**
```bash
aws ses send-email \
  --source noreply@mapsuche.de \
  --destination ToAddresses=artinada@gmail.com \
  --message Subject='{Data="Test Email"}',Body='{Text={Data="This is a test"}}' \
  --region eu-central-1
```

---

## 📞 **Email Addresses That Will Work**

Once DNS is configured, **ALL** of these will forward to `artinada@gmail.com`:

- `contact@mapsuche.de`
- `info@mapsuche.de`
- `support@mapsuche.de`
- `hello@mapsuche.de`
- `anything@mapsuche.de`

---

## 🎉 **Final Result**

**When someone sends email to ANY address @mapsuche.de:**

1. **AWS SES receives it**
2. **Lambda function processes it**
3. **Email forwarded to artinada@gmail.com with:**
   - Subject: `[mapsuche.de] Original Subject`
   - From info included in email body
   - Reply-To set to original sender

---

## 🆘 **Need Help?**

If you need assistance with DNS setup:
1. **Check your domain registrar's help documentation**
2. **Contact your hosting provider's support**
3. **Or let me know your domain registrar and I can provide specific instructions**

**Current Status:** AWS setup complete ✅ | DNS setup pending ⏳ 