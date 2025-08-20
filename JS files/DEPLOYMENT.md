# Backend Deployment Guide

## Prerequisites
- Node.js 18+ installed
- Git repository set up
- Database (MySQL) hosted
- Email service configured

## Deployment Options

### 1. Render (Recommended - Free Tier Available)

**Step 1: Prepare Your Code**
- Ensure all dependencies are in `package.json`
- Add `engines` field (already done)
- Create environment variables file

**Step 2: Deploy on Render**
1. Go to [render.com](https://render.com) and sign up
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: ksm-backend
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Root Directory**: `frontend` (if deploying from root)

**Step 3: Set Environment Variables**
In Render dashboard, add these environment variables:
```
DB_HOST=your_mysql_host
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_NAME=your_mysql_database
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
NODE_ENV=production
```

**Step 4: Deploy**
- Click "Create Web Service"
- Render will automatically deploy your app
- Your API will be available at: `https://your-app-name.onrender.com`

### 2. Railway (Alternative - Free Tier Available)

**Step 1: Deploy on Railway**
1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Set the root directory to `frontend`

**Step 2: Configure Environment Variables**
Add the same environment variables as above in Railway dashboard.

**Step 3: Deploy**
- Railway will automatically detect Node.js and deploy
- Your API will be available at: `https://your-app-name.railway.app`

### 3. Heroku (Paid - More Features)

**Step 1: Install Heroku CLI**
```bash
npm install -g heroku
```

**Step 2: Login and Deploy**
```bash
heroku login
heroku create ksm-backend
git add .
git commit -m "Deploy to Heroku"
git push heroku main
```

**Step 3: Set Environment Variables**
```bash
heroku config:set DB_HOST=your_mysql_host
heroku config:set DB_USER=your_mysql_user
heroku config:set DB_PASSWORD=your_mysql_password
heroku config:set DB_NAME=your_mysql_database
heroku config:set EMAIL_USER=your_email@gmail.com
heroku config:set EMAIL_PASSWORD=your_app_password
heroku config:set NODE_ENV=production
```

### 4. Vercel (Serverless - Free Tier)

**Step 1: Install Vercel CLI**
```bash
npm install -g vercel
```

**Step 2: Deploy**
```bash
cd frontend
vercel
```

**Step 3: Configure Environment Variables**
In Vercel dashboard, add the environment variables.

## Database Setup

### Option 1: PlanetScale (MySQL - Free Tier)
1. Go to [planetscale.com](https://planetscale.com)
2. Create account and new database
3. Get connection details
4. Update environment variables

### Option 2: Railway Database
1. In Railway dashboard, add MySQL database
2. Get connection details
3. Update environment variables

### Option 3: AWS RDS (Paid)
1. Create MySQL RDS instance
2. Configure security groups
3. Get connection details

## Email Service Setup

### Gmail App Password
1. Enable 2-factor authentication on Gmail
2. Generate app password
3. Use app password in EMAIL_PASSWORD

### Alternative: SendGrid
1. Sign up at [sendgrid.com](https://sendgrid.com)
2. Get API key
3. Update email configuration in server.js

## Testing Your Deployment

After deployment, test your API endpoints:

```bash
# Test the order endpoint
curl -X POST https://your-app-url.com/api/order \
  -H "Content-Type: application/json" \
  -d '{
    "orderSummary": {
      "orderNumber": "TEST-001",
      "items": "Test item",
      "total": 100
    },
    "customerInfo": {
      "name": "Test Customer",
      "phone": "1234567890",
      "address": "Test Address",
      "email": "test@example.com"
    }
  }'
```

## Troubleshooting

### Common Issues:
1. **Port Issues**: Ensure PORT environment variable is set
2. **Database Connection**: Check database credentials and network access
3. **Email Issues**: Verify Gmail app password or SendGrid API key
4. **CORS Issues**: Frontend URL should be in CORS configuration

### Logs:
- Render: View logs in dashboard
- Railway: View logs in dashboard
- Heroku: `heroku logs --tail`
- Vercel: View logs in dashboard

## Security Considerations

1. **Environment Variables**: Never commit sensitive data to Git
2. **Database**: Use strong passwords and restrict access
3. **Email**: Use app passwords, not regular passwords
4. **CORS**: Configure CORS properly for production
5. **HTTPS**: All production deployments should use HTTPS

## Cost Estimation

- **Render**: Free tier available, paid plans start at $7/month
- **Railway**: Free tier available, paid plans start at $5/month
- **Heroku**: Paid plans start at $7/month
- **Vercel**: Free tier available, paid plans start at $20/month
- **PlanetScale**: Free tier available, paid plans start at $29/month

## Recommended Setup for Production

1. **Backend**: Render or Railway
2. **Database**: PlanetScale or Railway MySQL
3. **Email**: Gmail with app password or SendGrid
4. **Domain**: Custom domain (optional)

This setup provides a robust, scalable, and cost-effective solution for your e-commerce backend. 