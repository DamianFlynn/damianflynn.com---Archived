@echo off

:: ----------------------
:: KUDU Deployment Script
:: ----------------------

:: Prerequisites
:: -------------

:: Verify node.js installed
where node 2>nul >nul
IF %ERRORLEVEL% NEQ 0 (
  echo Missing node.js executable, please install node.js, if already installed make sure it can be reached from current environment.
  goto error
)

:: Setup
:: -----

setlocal enabledelayedexpansion

SET ARTIFACTS=%~dp0%artifacts

IF NOT DEFINED DEPLOYMENT_SOURCE (
  SET DEPLOYMENT_SOURCE=%~dp0%.
)

IF NOT DEFINED DEPLOYMENT_TARGET (
  SET DEPLOYMENT_TARGET=%ARTIFACTS%\wwwroot
)


::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
:: Deployment
:: ----------

echo Handling node.js deployment.
echo "Checking for node.js module list at %DEPLOYMENT_SOURCE%\package.json"

:: 1. Install npm packages
IF EXIST "%DEPLOYMENT_SOURCE%\package.json" (
  echo Installing node.js packages
  call npm install --save-dev
  IF !ERRORLEVEL! NEQ 0 goto error
)


echo Compiling Static Site

:: 2. Build Static Site
IF EXIST "%DEPLOYMENT_SOURCE%\build.js" (
  echo Launching Metalsmith build script
  call node build.js
  IF !ERRORLEVEL! NEQ 0 goto error
)

echo Staging Static Site

:: 3. Move files which have changed
echo "Updating Web Folder %DEPLOYMENT_TARGET% content"
Robocopy %DEPLOYMENT_SOURCE%\build %DEPLOYMENT_TARGET% /MIR /Z /W:5


::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

goto end

:error
echo An error has occured during web site deployment.
exit /b 1

:end
echo Finished successfully.
