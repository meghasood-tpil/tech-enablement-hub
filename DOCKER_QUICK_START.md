# 🐳 Docker Quick Start - 3 Commands!

## What You Need

**Only Docker** - No Node.js required!

**Install Docker Desktop:** https://www.docker.com/products/docker-desktop/

---

## 🚀 Three Commands to Run Your App

```bash
# 1. Go to project folder
cd /Users/megha.sood/tech-enablement-hub

# 2. Build and start with Docker
docker-compose up -d

# 3. Open in browser
# Go to: http://localhost:3000
```

**That's it! Your app is running!** 🎉

---

## 📋 What Just Happened?

Docker:
- ✅ Created a container with Node.js 18
- ✅ Installed all dependencies automatically
- ✅ Built your React frontend
- ✅ Started your Express backend
- ✅ Made it accessible at http://localhost:3000

**All without installing Node.js on your Mac!**

---

## 🛠️ Essential Commands

### View Status
```bash
docker-compose ps
```

### View Logs
```bash
docker-compose logs -f
```
(Press Ctrl+C to exit)

### Stop Application
```bash
docker-compose down
```

### Restart Application
```bash
docker-compose restart
```

### Update After Code Changes
```bash
docker-compose up -d --build
```

---

## 📊 Adding Google Sheets

1. **Get credentials.json** (see SETUP_GOOGLE_SHEETS.md)

2. **Place in:** `/Users/megha.sood/tech-enablement-hub/server/credentials.json`

3. **Restart Docker:**
```bash
docker-compose restart
```

**Done!** Google Sheets integration will work automatically.

---

## ✅ Verify It's Working

**Check health:**
```bash
curl http://localhost:3000/api/health
```

**Should return:**
```json
{"status":"ok","message":"Tech Enablement Hub API is running"}
```

**Open browser:**
http://localhost:3000

You should see your Tech Enablement Hub dashboard! 🎉

---

## 🐛 Troubleshooting

### "Port is already allocated"

Someone is using port 3000.

**Quick fix:**
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Try again
docker-compose up -d
```

**Or change port in docker-compose.yml:**
```yaml
ports:
  - "8080:5000"  # Use 8080 instead
```
Then access: http://localhost:8080

### "Cannot connect to Docker daemon"

Docker Desktop isn't running.

**Fix:**
1. Open Docker Desktop app
2. Wait for whale icon to appear in menu bar
3. Try command again

### Build fails

**Try clean build:**
```bash
docker-compose down
docker-compose up -d --build
```

---

## 🎯 Complete Setup Checklist

- [ ] Docker Desktop installed
- [ ] Docker Desktop running (whale icon visible)
- [ ] Ran: `docker-compose up -d`
- [ ] Can access: http://localhost:3000
- [ ] Dashboard loads successfully
- [ ] Features work (test Program Planner, Banner Creator)
- [ ] (Optional) Google Sheets credentials added

---

## 📖 Need More Help?

See full guide: **DOCKER_SETUP.md**

---

## 💡 Why Docker?

**Benefits:**
- ✅ No Node.js installation needed
- ✅ Consistent environment (works everywhere)
- ✅ Easy to deploy to servers
- ✅ Isolated from your system
- ✅ One command to run everything

**Perfect when Node.js isn't allowed!**

---

**Your Tech Enablement Hub is ready to run with Docker!** 🚀🐳

Just: `docker-compose up -d` → Open http://localhost:3000
