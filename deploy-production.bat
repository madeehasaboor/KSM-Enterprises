@echo off
echo ========================================
echo   Auto Champain Production Deployment
echo ========================================
echo.

echo Creating production deployment package...
echo.

REM Create production directory
if exist "production" rmdir /s /q "production"
mkdir "production"

REM Copy essential files
echo Copying HTML files...
copy "*.html" "production\"
copy "index\*.html" "production\index\"

echo Copying CSS files...
xcopy "css" "production\css\" /E /I /Y

echo Copying JavaScript files...
copy "*.js" "production\"
copy "index\*.js" "production\index\"

echo Copying assets...
xcopy "brand logos" "production\brand logos\" /E /I /Y
xcopy "products" "production\products\" /E /I /Y

echo Copying configuration files...
copy "package.json" "production\"
copy "server.js" "production\"
copy "database.sql" "production\"
copy "env.example" "production\"
copy "Procfile" "production\"

echo.
echo ========================================
echo   Production package created!
echo ========================================
echo.
echo Next steps:
echo 1. Upload the 'production' folder to your hosting
echo 2. Install Node.js on your hosting server
echo 3. Run 'npm install' on the server
echo 4. Start the server with 'node server.js'
echo 5. Configure your domain to point to the server
echo.
echo Files are ready in: production\
pause 