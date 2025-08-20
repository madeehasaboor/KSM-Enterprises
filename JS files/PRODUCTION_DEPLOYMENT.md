# 🚀 Production Deployment Guide for www.ksmenterprises.sbs

## 📋 Prerequisites

1. **Hosting Server** with Node.js support
2. **Domain Control** over www.ksmenterprises.sbs
3. **SSH Access** to your server (if VPS/Dedicated)
4. **cPanel/FTP Access** (if shared hosting)

## 🔧 Step-by-Step Deployment

### **Step 1: Prepare Your Files**

Run the deployment script:
```bash
deploy-production.bat
```

This creates a `production/` folder with all necessary files.

### **Step 2: Upload to Server**

#### **Option A: cPanel/Shared Hosting**
1. Upload the `production/` folder contents to your hosting
2. Place files in the `public_html/` or `www/` directory

#### **Option B: VPS/Dedicated Server**
1. Use SCP/SFTP to upload files:
```bash
scp -r production/* user@your-server:/var/www/ksmenterprises/
```

### **Step 3: Server Setup**

#### **Install Node.js (if not already installed)**
```bash
# Ubuntu/Debian
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# CentOS/RHEL
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum install -y nodejs
```

#### **Install Dependencies**
```bash
cd /var/www/ksmenterprises
npm install --production
```

### **Step 4: Environment Configuration**

1. Edit `production.env` with your actual values:
   - Database credentials
   - Email settings
   - Domain information

2. Rename to `.env`:
```bash
mv production.env .env
```

### **Step 5: Start the Server**

#### **Option A: Direct Start**
```bash
node server-production.js
```

#### **Option B: Using PM2 (Recommended)**
```bash
npm install -g pm2
pm2 start server-production.js --name "ksmenterprises"
pm2 startup
pm2 save
```

#### **Option C: Using Systemd**
Create `/etc/systemd/system/ksmenterprises.service`:
```ini
[Unit]
Description=KSM Enterprises Node.js App
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/www/ksmenterprises
ExecStart=/usr/bin/node server-production.js
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

Then:
```bash
sudo systemctl enable ksmenterprises
sudo systemctl start ksmenterprises
```

### **Step 6: Domain Configuration**

#### **DNS Settings**
Point your domain to your server IP:
- **A Record**: `@` → Your Server IP
- **A Record**: `www` → Your Server IP
- **CNAME**: `www` → `@`

#### **Nginx Configuration (if using Nginx)**
Create `/etc/nginx/sites-available/ksmenterprises`:
```nginx
server {
    listen 80;
    server_name www.ksmenterprises.sbs ksmenterprises.sbs;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable the site:
```bash
sudo ln -s /etc/nginx/sites-available/ksmenterprises /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

#### **Apache Configuration (if using Apache)**
Create virtual host configuration and enable mod_proxy.

### **Step 7: SSL Certificate (HTTPS)**

#### **Using Let's Encrypt (Free)**
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d www.ksmenterprises.sbs -d ksmenterprises.sbs
```

#### **Using cPanel SSL**
Enable SSL through your hosting control panel.

## 🧪 Testing

1. **Check server status**: `http://your-server-ip:3000`
2. **Test domain**: `https://www.ksmenterprises.sbs`
3. **Verify all pages load correctly**
4. **Check for 404 errors in browser console**

## 🔍 Troubleshooting

### **Common Issues:**

1. **Port 3000 blocked**: Configure firewall to allow port 3000
2. **Domain not resolving**: Check DNS propagation (can take 24-48 hours)
3. **SSL errors**: Ensure SSL certificate is properly installed
4. **File permissions**: Ensure web server can read your files

### **Debug Commands:**
```bash
# Check if server is running
netstat -tlnp | grep :3000

# Check server logs
pm2 logs ksmenterprises
# or
sudo journalctl -u ksmenterprises

# Test local access
curl http://localhost:3000
```

## 📞 Support

If you encounter issues:
1. Check server logs
2. Verify file permissions
3. Test local server access
4. Check DNS propagation
5. Verify hosting Node.js support

## 🎯 Success Indicators

✅ Domain resolves to your server  
✅ HTTPS works without errors  
✅ All pages load correctly  
✅ No 404 errors in console  
✅ Server responds on port 3000  
✅ Static files (CSS, images) load  

---

**Remember**: DNS changes can take 24-48 hours to propagate globally! 