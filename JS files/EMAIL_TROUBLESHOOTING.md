# Email Troubleshooting Guide

## 🚨 **Why You're Not Receiving Emails**

### **1. Gmail App Password Issues**
The most common cause is an expired or incorrect Gmail app password.

**Solution:**
1. Go to your Google Account settings
2. Navigate to Security → 2-Step Verification → App passwords
3. Generate a new app password for "Mail"
4. Update the password in your server configuration

### **2. Server Not Running**
Your backend server might not be deployed or running.

**Check if server is running:**
```bash
# Test if your API is accessible
curl https://api.ksmenterprises.sbs/api/health
```

### **3. Email Configuration Problems**
The email configuration might have issues.

## 🔧 **Quick Fixes**

### **Fix 1: Update Gmail App Password**

1. **Go to Google Account:**
   - Visit: https://myaccount.google.com/
   - Click "Security"

2. **Enable 2-Step Verification:**
   - Turn on 2-Step Verification if not already enabled

3. **Generate App Password:**
   - Go to "App passwords"
   - Select "Mail" and "Other (Custom name)"
   - Name it "KSM Website"
   - Copy the generated password

4. **Update Server Configuration:**
   - Replace the current password in server.js
   - Deploy the updated server

### **Fix 2: Test Email Configuration**

Use the test endpoint to verify email is working:

```bash
curl -X POST https://api.ksmenterprises.sbs/api/test-email
```

### **Fix 3: Check Email Settings**

1. **Check Spam Folder:**
   - Look in your spam/junk folder
   - Mark emails as "Not Spam" if found

2. **Check Email Filters:**
   - Look for any filters that might be blocking emails

3. **Check Email Forwarding:**
   - Ensure emails aren't being forwarded elsewhere

## 📧 **Alternative Email Solutions**

### **Option 1: Use Environment Variables**

Create a `.env` file on your server:

```env
EMAIL_USER=saboormadiha@gmail.com
EMAIL_PASSWORD=your_new_app_password
NODE_ENV=production
```

### **Option 2: Use Different Email Service**

If Gmail continues to have issues, consider:

1. **Outlook/Hotmail**
2. **Yahoo Mail**
3. **Custom SMTP server**

### **Option 3: Use Email Service Providers**

1. **SendGrid**
2. **Mailgun**
3. **AWS SES**

## 🧪 **Testing Steps**

### **Step 1: Test Server Health**
```bash
curl https://api.ksmenterprises.sbs/api/health
```

### **Step 2: Test Email Sending**
```bash
curl -X POST https://api.ksmenterprises.sbs/api/test-email
```

### **Step 3: Test Order Endpoint**
```bash
curl -X POST https://api.ksmenterprises.sbs/api/order \
  -H "Content-Type: application/json" \
  -d '{
    "orderSummary": {
      "orderNumber": "TEST-123",
      "items": "Test Product x1 - Rs. 1000",
      "total": 1000
    },
    "customerInfo": {
      "name": "Test Customer",
      "email": "test@example.com",
      "phone": "+923234890184",
      "address": "Test Address",
      "paymentMethod": "cod"
    }
  }'
```

## 🔍 **Debugging Checklist**

- [ ] Gmail 2-Step Verification enabled
- [ ] App password generated and updated
- [ ] Server is running and accessible
- [ ] API endpoints responding correctly
- [ ] No firewall blocking email ports
- [ ] Email not in spam folder
- [ ] Correct email address (saboormadiha@gmail.com)

## 📞 **Immediate Actions**

1. **Check your spam folder** for any test emails
2. **Generate a new Gmail app password**
3. **Test the email endpoint** using the curl commands above
4. **Check server logs** for any error messages
5. **Verify the server is running** and accessible

## 🆘 **If Still Not Working**

1. **Check server logs** for specific error messages
2. **Try a different email service** (Outlook, Yahoo)
3. **Use a third-party email service** (SendGrid, Mailgun)
4. **Contact your hosting provider** for email configuration help

## 📱 **WhatsApp Fallback**

Remember, if email fails, the system automatically falls back to WhatsApp:
- **WhatsApp Number:** +923234890184
- **Automatic fallback** when email fails
- **Complete order details** sent via WhatsApp

## 🔄 **Deployment Steps**

1. **Update server.js** with new email configuration
2. **Deploy to your hosting service**
3. **Test the health endpoint**
4. **Test email sending**
5. **Place a test order** to verify everything works 