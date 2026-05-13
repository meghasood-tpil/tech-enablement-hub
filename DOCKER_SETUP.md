# Docker Setup Guide

## 🐳 Running Tech Enablement Hub with Docker

No Node.js installation needed! Just Docker.

---

## Prerequisites

### Install Docker Desktop

**If Docker is allowed on your machine:**

1. **Download:** https://www.docker.com/products/docker-desktop/
2. **Install** Docker Desktop for Mac
3. **Open** Docker Desktop (whale icon in menu bar should appear)
4. **Verify:**
```bash
docker --version
docker-compose --version
```

**If Docker is NOT allowed either:**
- Ask IT to install Docker Desktop
- Or use cloud-based solutions (see bottom of this guide)

---

## 🚀 Quick Start (3 Commands)

### Option 1: Using Docker Compose (Easiest)

```bash
# Navigate to project
cd /Users/megha.sood/tech-enablement-hub

# Build and start
docker-compose up -d

# Access the app
# Open browser: http://localhost:3000
```

**That's it!** Your app is running! 🎉

### Check Status

```bash
# View running containers
docker-compose ps

# View logs
docker-compose logs -f

# Stop the app
docker-compose down
```

---

## 📋 Option 2: Using Docker CLI

If you prefer manual Docker commands:

### Build the Image

```bash
cd /Users/megha.sood/tech-enablement-hub

docker build -t tech-enablement-hub .
```

### Run the Container

```bash
docker run -d \
  --name tech-enablement-hub \
  -p 3000:5000 \
  -v $(pwd)/server/credentials.json:/app/server/credentials.json:ro \
  -v tech-data:/app/server/data \
  -v tech-uploads:/app/server/uploads \
  tech-enablement-hub
```

### Access the App

Open browser: **http://localhost:3000**

---

## 🎯 What Docker Does

**Container includes:**
- ✅ Node.js 18 (already installed)
- ✅ Your complete application
- ✅ All dependencies (npm packages)
- ✅ Frontend (built React app)
- ✅ Backend (Express server)

**You don't need to install anything except Docker!**

---

## 📊 Google Sheets Integration with Docker

### Setup

1. **Get credentials.json** (follow SETUP_GOOGLE_SHEETS.md)
2. **Place it in:** `/Users/megha.sood/tech-enablement-hub/server/credentials.json`
3. **Restart Docker:**
```bash
docker-compose restart
```

**Docker will automatically mount the credentials file!**

---

## 🔧 Common Commands

### Start the App
```bash
docker-compose up -d
```
`-d` = detached mode (runs in background)

### Stop the App
```bash
docker-compose down
```

### View Logs (Real-time)
```bash
docker-compose logs -f
```
Press `Ctrl+C` to exit logs

### Restart the App
```bash
docker-compose restart
```

### Rebuild After Code Changes
```bash
docker-compose up -d --build
```

### Stop and Remove Everything (Clean Slate)
```bash
docker-compose down -v
```
`-v` = remove volumes (data will be deleted!)

### Check Container Status
```bash
docker-compose ps
```

### Access Container Shell
```bash
docker-compose exec tech-enablement-hub sh
```
Type `exit` to leave

---

## 📂 Data Persistence

Docker stores your data in volumes:

- **Program data:** `tech-data` volume
- **Uploaded files:** `tech-uploads` volume

**Data survives container restarts!**

### Backup Data
```bash
# Backup data volume
docker run --rm -v tech-data:/data -v $(pwd):/backup alpine tar czf /backup/data-backup.tar.gz -C /data .

# Backup uploads
docker run --rm -v tech-uploads:/uploads -v $(pwd):/backup alpine tar czf /backup/uploads-backup.tar.gz -C /uploads .
```

### Restore Data
```bash
# Restore data
docker run --rm -v tech-data:/data -v $(pwd):/backup alpine tar xzf /backup/data-backup.tar.gz -C /data

# Restore uploads
docker run --rm -v tech-uploads:/uploads -v $(pwd):/backup alpine tar xzf /backup/uploads-backup.tar.gz -C /uploads
```

---

## 🐛 Troubleshooting

### Port Already in Use

**Error:** `port is already allocated`

**Fix:**
```bash
# Find what's using port 3000
lsof -ti:3000

# Stop it
lsof -ti:3000 | xargs kill -9

# Or use different port in docker-compose.yml:
# Change "3000:5000" to "8080:5000"
# Then access: http://localhost:8080
```

### Container Won't Start

**Check logs:**
```bash
docker-compose logs
```

**Common issues:**
- Docker Desktop not running → Start it
- Port conflict → Change port in docker-compose.yml
- Build failed → Check error messages

### Google Sheets Not Working

**Fix:**
```bash
# Verify credentials file exists
ls server/credentials.json

# Check if mounted in container
docker-compose exec tech-enablement-hub ls /app/server/credentials.json

# If not found, restart:
docker-compose restart
```

### Rebuild from Scratch

If something's broken:
```bash
# Stop and remove everything
docker-compose down -v

# Remove images
docker rmi tech-enablement-hub

# Rebuild and start fresh
docker-compose up -d --build
```

---

## 🔍 Health Check

Docker automatically monitors your app:

```bash
# Check health status
docker inspect --format='{{.State.Health.Status}}' tech-enablement-hub
```

**Should show:** `healthy`

**Manual health check:**
```bash
curl http://localhost:3000/api/health
```

**Should return:** `{"status":"ok","message":"Tech Enablement Hub API is running"}`

---

## 📊 Monitoring

### View Resource Usage
```bash
docker stats tech-enablement-hub
```

### View Processes
```bash
docker-compose top
```

---

## 🚢 Deploying to Server

### Export Image

```bash
# Save image to file
docker save tech-enablement-hub > tech-hub.tar

# Copy to server (via scp, USB, etc.)

# On server, load image:
docker load < tech-hub.tar

# Run it:
docker run -d -p 3000:5000 tech-enablement-hub
```

### Using Docker Registry

```bash
# Tag image
docker tag tech-enablement-hub your-registry.com/tech-hub:latest

# Push to registry
docker push your-registry.com/tech-hub:latest

# On server, pull and run:
docker pull your-registry.com/tech-hub:latest
docker run -d -p 3000:5000 your-registry.com/tech-hub:latest
```

---

## 🌐 Cloud Deployment Options

If you can't run Docker locally:

### 1. AWS ECS (Elastic Container Service)
- Upload Docker image
- Run as container
- Auto-scaling available

### 2. Google Cloud Run
- Deploy Docker container
- Serverless (pay per use)
- Simple deployment

### 3. Azure Container Instances
- Quick container deployment
- No orchestration needed

### 4. Heroku
```bash
# Install Heroku CLI
# Login
heroku login

# Create app
heroku create tech-enablement-hub

# Deploy
heroku container:push web
heroku container:release web
```

### 5. Railway.app
- Connect GitHub
- Auto-detects Docker
- Free tier available

---

## 📝 docker-compose.yml Explained

```yaml
services:
  tech-enablement-hub:
    build: .                    # Build from Dockerfile
    ports:
      - "3000:5000"            # Host:Container port mapping
    volumes:
      - ./server/credentials.json:/app/server/credentials.json  # Mount credentials
      - tech-data:/app/server/data              # Persist data
      - tech-uploads:/app/server/uploads        # Persist uploads
    environment:
      - NODE_ENV=production    # Production mode
      - PORT=5000             # Internal port
    restart: unless-stopped   # Auto-restart on failure
```

---

## ⚙️ Advanced Configuration

### Environment Variables

Edit `docker-compose.yml` to add:

```yaml
environment:
  - NODE_ENV=production
  - PORT=5000
  - GOOGLE_SHEET_ID=your-default-sheet-id  # Optional
  - AUTO_REFRESH=true                      # Optional
```

### Custom Port

Change first number in `docker-compose.yml`:

```yaml
ports:
  - "8080:5000"  # Access at http://localhost:8080
```

### Multiple Instances

Run multiple containers:

```bash
# Instance 1
docker run -d --name hub-1 -p 3001:5000 tech-enablement-hub

# Instance 2
docker run -d --name hub-2 -p 3002:5000 tech-enablement-hub
```

---

## 🎯 Production Checklist

Before deploying to production:

- [ ] Docker Desktop installed and running
- [ ] Application builds successfully
- [ ] Can access at http://localhost:3000
- [ ] All features work (test each one)
- [ ] Google Sheets credentials configured (if using)
- [ ] Data volumes configured for persistence
- [ ] Backup strategy in place
- [ ] Health checks passing
- [ ] Logs are accessible

---

## 💡 Pro Tips

1. **Development vs Production:**
   - Development: `npm run dev` (live reload)
   - Production: Docker (optimized, stable)

2. **Logs:**
   - Always check logs first: `docker-compose logs -f`

3. **Updates:**
   - Update code → Rebuild: `docker-compose up -d --build`

4. **Backups:**
   - Regular backups of volumes
   - Keep credentials.json backed up securely

5. **Performance:**
   - Docker image is optimized (~200MB)
   - Health checks ensure uptime
   - Restart policy handles crashes

---

## 🆘 Still Can't Use Docker?

If neither Node.js nor Docker are allowed:

### Alternative Solutions:

1. **Cloud IDEs:**
   - StackBlitz.com (Node.js in browser)
   - Replit.com (Node.js in browser)
   - GitHub Codespaces (Node.js in cloud)

2. **Request from IT:**
   - Docker is industry standard
   - Used by enterprises (including Salesforce)
   - Safer than direct installations

3. **Remote Server:**
   - Get access to dev VM/server
   - Install Docker there
   - Access via web browser

4. **Pre-built Deployment:**
   - Someone with Docker builds it
   - Deploys to cloud (Heroku/Railway)
   - You access via URL

---

## 📞 Support

**Need help?**
- Check logs: `docker-compose logs`
- Verify Docker is running: `docker ps`
- Health check: `curl http://localhost:3000/api/health`

**All error messages are descriptive and guide you to solutions!**

---

## ✅ Quick Command Reference

```bash
# Start
docker-compose up -d

# Stop
docker-compose down

# Logs
docker-compose logs -f

# Restart
docker-compose restart

# Rebuild
docker-compose up -d --build

# Status
docker-compose ps

# Shell access
docker-compose exec tech-enablement-hub sh
```

---

**Your Docker setup is ready! Just run `docker-compose up -d` and you're live!** 🚀🐳
