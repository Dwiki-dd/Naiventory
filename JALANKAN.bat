@echo off
title Naiventory Server
echo ================================
echo   NAIVENTORY - Menghidupkan Server...
echo ================================
cd /d e:\naiventory
start "" "http://localhost:3000"
npm run dev
pause
