# How to Install Docker Desktop on Mac

## 📥 Installation Steps (10 minutes)

### Step 1: Download Docker Desktop

1. **Go to:** https://www.docker.com/products/docker-desktop/

2. **Click the big blue "Download for Mac" button**

3. **Choose your Mac type:**
   - **Mac with Intel chip:** Click "Mac with Intel chip"
   - **Mac with Apple chip (M1/M2/M3):** Click "Mac with Apple silicon"

   **Don't know which you have?**
   - Click Apple logo () in top-left corner
   - Select "About This Mac"
   - Look at "Chip" or "Processor":
     - If it says "Apple M1/M2/M3" → Download Apple silicon version
     - If it says "Intel" → Download Intel version

4. **Wait for download** (file is ~500MB, takes 2-5 minutes)
   - File name: `Docker.dmg`

---

### Step 2: Install Docker Desktop

1. **Find the downloaded file:**
   - Usually in your Downloads folder
   - File: `Docker.dmg`

2. **Double-click `Docker.dmg`**
   - A window opens showing Docker.app

3. **Drag Docker icon to Applications folder**
   - You'll see: Docker whale icon → Applications folder
   - Drag and drop Docker → Applications

4. **Wait for copy to finish** (30 seconds)

5. **Close the Docker.dmg window**

6. **Eject the Docker disk image** (optional cleanup)
   - Right-click Docker in Finder sidebar → Eject

---

### Step 3: Start Docker Desktop

1. **Open Applications folder**
   - Finder → Go → Applications
   - Or: `Cmd + Shift + A`

2. **Find and double-click "Docker"**
   - Look for the blue whale icon 🐳

3. **First launch - Security prompt:**
   - macOS will say "Docker is an app downloaded from the Internet"
   - Click **"Open"**

4. **Accept the terms:**
   - Read (or scroll through) the service agreement
   - Click **"Accept"**

5. **Grant permissions if asked:**
   - Docker needs privileged access
   - Enter your **Mac password**
   - Click **"OK"** or **"Install"**

6. **Docker starts up** (takes 1-2 minutes first time)
   - You'll see Docker whale icon 🐳 in your menu bar (top-right)
   - When ready, the whale icon will be solid (not animated)

---

### Step 4: Verify Installation

1. **Check menu bar:**
   - Look for whale icon 🐳 in top-right
   - Should be solid blue/white (not blinking)

2. **Open Terminal:**
   - `Cmd + Space`
   - Type "Terminal"
   - Press Enter

3. **Run these commands:**

```bash
# Check Docker version
docker --version

# Check Docker Compose version
docker-compose --version

# Test Docker works
docker run hello-world
```

**Expected output:**

```
docker --version
Docker version 24.0.x, build xxxxx

docker-compose --version
Docker Compose version v2.20.x

docker run hello-world
...
Hello from Docker!
This message shows that your installation appears to be working correctly.
...
```

**If you see these messages → Docker is working! ✅**

---

## ✅ Installation Complete!

Now you can run your Tech Enablement Hub:

```bash
cd /Users/megha.sood/tech-enablement-hub
docker-compose up -d
```

Then open: **http://localhost:3000**

---

## 🎯 What You Should See

### In Menu Bar (top-right):
- 🐳 Whale icon (solid, not animated)
- Click it to see Docker Desktop menu

### Docker Desktop Window:
- Shows running containers
- Dashboard with stats
- Settings/preferences

---

## 🐛 Troubleshooting

### "Docker Desktop requires macOS 11 or newer"

**Your macOS is too old.**

**Options:**
1. Update macOS (if possible)
2. Use older Docker version:
   - Go to: https://docs.docker.com/desktop/release-notes/
   - Download older compatible version
3. Use cloud alternatives (StackBlitz, Replit)

---

### "Cannot connect to Docker daemon"

Docker Desktop isn't running.

**Fix:**
1. Look for whale icon 🐳 in menu bar
2. If not there → Open Docker from Applications
3. Wait for whale to appear and become solid
4. Try your command again

---

### Whale icon keeps animating/blinking

Docker is still starting up.

**Fix:**
- Wait 1-2 minutes
- When it stops animating → Docker is ready
- Then run your commands

---

### "Docker Desktop failed to start"

**Try:**
1. Quit Docker Desktop (Right-click whale → Quit)
2. Wait 10 seconds
3. Open Docker Desktop again
4. Wait for startup

**Still not working?**
1. Restart your Mac
2. Open Docker Desktop again

---

### Permission denied errors

**Fix:**
```bash
# Add your user to docker group (if needed)
sudo usermod -aG docker $USER

# Or run with sudo (not recommended)
sudo docker-compose up -d
```

---

### "Port is already allocated"

Something else is using port 3000.

**Fix:**
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Then try again
docker-compose up -d
```

---

## 📋 Post-Installation Checklist

After installing, verify:

- [ ] Whale icon 🐳 visible in menu bar
- [ ] Icon is solid (not animated)
- [ ] `docker --version` shows version number
- [ ] `docker-compose --version` shows version number
- [ ] `docker run hello-world` succeeds
- [ ] Docker Desktop app opens without errors

**All checked?** You're ready! ✅

---

## 🎓 Docker Desktop Basics

### Starting Docker
- Docker Desktop auto-starts when you login
- Or: Open from Applications folder

### Stopping Docker
- Right-click whale icon → Quit Docker Desktop

### Checking Status
- Click whale icon in menu bar
- Shows: Running containers, updates, settings

### Settings
- Click whale icon → Settings
- Adjust: Memory, CPU, disk space

---

## 💡 Docker Desktop Features

Once installed, you get:

- ✅ Docker Engine (runs containers)
- ✅ Docker Compose (multi-container apps)
- ✅ Docker CLI (command-line tools)
- ✅ Dashboard (visual interface)
- ✅ Kubernetes (optional)

**Everything you need to run your Tech Enablement Hub!**

---

## 🚀 Next Steps After Installation

1. ✅ Docker Desktop installed and running
2. ✅ Whale icon visible in menu bar
3. ✅ Terminal commands work

**Now run your app:**

```bash
cd /Users/megha.sood/tech-enablement-hub
docker-compose up -d
```

**Open browser:** http://localhost:3000

**See full guide:** `DOCKER_QUICK_START.md`

---

## 🆘 Still Having Issues?

### Check Docker Desktop Dashboard:
1. Click whale icon → Dashboard
2. Look for error messages
3. Check "Troubleshoot" section

### Check System Requirements:
- macOS 11 or newer
- At least 4GB RAM (8GB recommended)
- At least 20GB free disk space

### Alternative if Installation Fails:
- Use Docker Desktop alternatives (Colima, Rancher Desktop)
- Use cloud-based solutions (StackBlitz, Replit)
- Request IT support for installation

---

## 📖 Official Documentation

**Need more help?**
- Docker Desktop docs: https://docs.docker.com/desktop/
- Mac installation guide: https://docs.docker.com/desktop/install/mac-install/

---

## ✅ Quick Visual Check

**Installation successful when you see:**

```
Terminal:
~ % docker --version
Docker version 24.0.6, build ed223bc

~ % docker-compose --version  
Docker Compose version v2.20.2

Menu bar:
🐳 ← Whale icon (solid blue/white)
```

**You're ready to run your Tech Enablement Hub!** 🎉🐳

---

**Installation time: ~10 minutes total**
- Download: 2-5 min
- Install: 2 min  
- First launch: 2-3 min
- Verification: 1 min
