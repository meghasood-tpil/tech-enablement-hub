# GitHub Codespaces Setup Guide

## 🌐 Run Your Tech Enablement Hub in the Cloud

**No local installation needed! Node.js pre-installed!**

---

## ✅ What You Get with Codespaces

- ✅ Node.js 18 already installed
- ✅ Full VS Code editor in browser
- ✅ 60 hours/month FREE
- ✅ Access from anywhere
- ✅ Share with team easily
- ✅ Professional development environment

---

## 🚀 Setup Steps (15 minutes)

### Step 1: Create GitHub Account (2 minutes)

**If you already have GitHub account → Skip to Step 2**

1. **Go to:** https://github.com
2. **Click:** "Sign up"
3. **Enter:**
   - Email address
   - Password
   - Username
4. **Verify email** and complete setup

---

### Step 2: Create Repository (3 minutes)

1. **Login to GitHub:** github.com

2. **Click the "+" icon** (top-right) → **"New repository"**

3. **Fill in details:**
   ```
   Repository name: tech-enablement-hub
   Description: Centralized Tech Program Management Hub for T&P APAC
   
   ☑️ Public (or Private if you prefer)
   ☐ Don't check "Add a README"
   ```

4. **Click "Create repository"**

---

### Step 3: Upload Your Project Files (5 minutes)

You'll see a new empty repository. Now upload your files:

#### Option A: Upload via Web Interface (Easier)

1. **Click:** "uploading an existing file"

2. **Open Finder** on your Mac:
   - Navigate to: `/Users/megha.sood/tech-enablement-hub`

3. **Select and drag these folders/files** to GitHub:
   ```
   ✅ client/                    (entire folder)
   ✅ server/                    (entire folder)
   ✅ package.json
   ✅ README.md
   ✅ .gitignore
   ✅ All .md documentation files
   ```

4. **Important files to upload:**
   - `package.json` (root)
   - `client/package.json`
   - `client/src/` (entire folder with all components)
   - `client/public/`
   - `server/index.js`
   - All documentation files

5. **Scroll down, click "Commit changes"**

6. **Repeat for any remaining files** (GitHub uploads in batches)

#### Option B: Using Git CLI (If comfortable)

```bash
cd /Users/megha.sood/tech-enablement-hub

# Initialize git (if not already)
git init

# Add GitHub remote
git remote add origin https://github.com/YOUR_USERNAME/tech-enablement-hub.git

# Add all files
git add .

# Commit
git commit -m "Initial commit: Tech Enablement Hub"

# Push
git branch -M main
git push -u origin main
```

---

### Step 4: Launch Codespace (2 minutes)

1. **Go to your repository** on GitHub

2. **Click the green "Code" button**

3. **Click "Codespaces" tab**

4. **Click "Create codespace on main"**

5. **Wait 1-2 minutes** while Codespace sets up
   - You'll see: "Setting up your codespace..."
   - When done, you'll see VS Code interface in browser!

---

### Step 5: Run Your Application (3 minutes)

You now have a VS Code editor in your browser. Let's run the app:

1. **Open Terminal in Codespace:**
   - Click menu: Terminal → New Terminal
   - Or press: `` Ctrl + ` ``

2. **Install dependencies:**
   ```bash
   # Install server dependencies
   npm install
   
   # Install client dependencies
   cd client
   npm install
   cd ..
   ```

3. **Start the application:**
   ```bash
   npm run dev
   ```

4. **Wait for startup** (~30 seconds)

You'll see:
```
🚀 Tech Enablement Hub server running on port 5000
📊 API Health: http://localhost:5000/api/health
webpack compiled successfully
```

---

### Step 6: Access Your App

**Codespaces will automatically detect ports and show notification:**

```
┌──────────────────────────────────────────┐
│ Your application running on port 3000    │
│ is available.                            │
│                                          │
│ [Open in Browser]  [Make Public]        │
└──────────────────────────────────────────┘
```

**Click "Open in Browser"**

**Or manually:**
1. Look for "PORTS" tab at bottom of screen
2. Find port 3000
3. Click the 🌐 globe icon next to it
4. Your app opens in new tab!

**URL will look like:**
`https://username-tech-enablement-hub-xxxxx-3000.app.github.dev`

---

## 🎉 Success! Your App is Running!

You should now see your Tech Enablement Hub dashboard!

Test the features:
- ✅ Click "Program Planner"
- ✅ Click "Banner Creator"
- ✅ Click "Reports"
- ✅ Everything works!

---

## 📊 Google Sheets Integration in Codespaces

To enable Google Sheets real-time reports:

1. **Get credentials.json** (follow SETUP_GOOGLE_SHEETS.md)

2. **Upload to Codespace:**
   - In Codespaces file explorer (left sidebar)
   - Right-click `server/` folder
   - Click "Upload..."
   - Select your `credentials.json` file

3. **Restart the app:**
   ```bash
   # Press Ctrl+C to stop
   npm run dev
   ```

4. **Test Google Sheets** in Reports page!

---

## 🔧 Common Codespaces Commands

### Stop the app:
```bash
Ctrl + C
```

### Restart the app:
```bash
npm run dev
```

### View logs:
Already visible in the terminal!

### Install new package:
```bash
npm install package-name
```

### Pull latest changes from GitHub:
```bash
git pull
```

---

## 💡 Codespaces Tips

### Keep Codespace Running:
- Codespaces auto-stops after 30 min of inactivity
- Your work is saved automatically
- Restart anytime: Go to repo → Code → Resume codespace

### Share Your App:
1. Go to PORTS tab
2. Right-click port 3000
3. Select "Port Visibility" → "Public"
4. Share the URL with your team!

### Save Your Work:
All changes in Codespace files are reflected in your GitHub repo.

**Commit changes:**
```bash
git add .
git commit -m "Update: description of changes"
git push
```

### Open Existing Codespace:
1. Go to github.com
2. Click your profile → "Your codespaces"
3. Click on your codespace to resume

---

## 📱 Access from Anywhere

### From Another Computer:
1. Go to github.com
2. Navigate to your repository
3. Code → Codespaces → Click your codespace
4. App loads instantly!

### From iPad/Tablet:
Same as above - works in any browser!

### From Phone:
Use GitHub mobile app or browser

---

## 🎯 Codespaces Free Tier

**GitHub Free Account:**
- ✅ 60 hours/month of codespace usage (2-core)
- ✅ 15 GB storage
- ✅ More than enough for this project!

**Usage Tips:**
- Stop codespace when not using (auto-stops after 30 min)
- Your 60 hours refresh monthly
- Upgrade if you need more

**Check usage:**
- Settings → Billing → Codespaces

---

## 🐛 Troubleshooting

### "npm: command not found"

**Shouldn't happen** - Node.js is pre-installed in Codespaces

**If it does:**
```bash
# Check Node.js version
node --version

# If missing, Codespace might need restart
# Go to Command Palette (Cmd/Ctrl + Shift + P)
# Type: "Codespaces: Rebuild Container"
```

### Port 3000 not showing

**Check terminal output:**
- Should say "webpack compiled successfully"

**If not:**
```bash
# Stop with Ctrl+C
# Try again
npm run dev
```

**Manually access port:**
- PORTS tab → Add Port → Enter 3000
- Click globe icon

### Changes not saving

**Auto-save is enabled by default**

**To commit to GitHub:**
```bash
git add .
git commit -m "Your message"
git push
```

### Codespace is slow

**Your codespace might be underpowered**

**Upgrade machine type:**
1. Stop codespace
2. Go to repo → Code → Codespaces
3. Click "..." → Change machine type
4. Select 4-core (still free tier)

---

## 🔄 Development Workflow

### Daily Usage:

**Morning:**
```bash
1. Go to github.com → Your repo
2. Code → Open your codespace
3. Wait for load (~10 seconds)
4. Terminal → npm run dev
5. Start working!
```

**During Day:**
- Make changes in code
- See live updates in browser
- Test features
- Everything auto-saves

**End of Day:**
```bash
# Commit your work
git add .
git commit -m "Today's updates"
git push

# Codespace auto-stops after 30 min
# Or manually: Codespaces menu → Stop
```

---

## 🎓 Advanced: Multiple Environments

### Development (what you're doing):
- Your main codespace
- Make changes freely
- Test features

### Create Branches for Features:
```bash
# Create new branch
git checkout -b new-feature

# Make changes, then:
git add .
git commit -m "Add new feature"
git push origin new-feature

# Create Pull Request on GitHub
```

---

## 📊 Team Collaboration

### Share with Team:

**Option 1: Share Codespace URL**
1. PORTS tab → Port 3000
2. Right-click → Port Visibility → Public
3. Share the URL

**Option 2: Give GitHub Access**
1. Repository → Settings → Collaborators
2. Add team members
3. They can create their own codespaces

**Option 3: Deploy to Production**
- Use Railway, Render, or Vercel
- Connect GitHub repo
- Auto-deploys on every push!

---

## 🚀 Deploy to Production (Optional)

Once you've tested in Codespaces, deploy for team use:

### Using Railway (Easiest):
1. Go to railway.app
2. Sign in with GitHub
3. "New Project" → From GitHub repo
4. Select your `tech-enablement-hub` repo
5. Railway auto-deploys!
6. You get: `your-app.railway.app`

### Using Render:
1. Sign up at render.com
2. "New Web Service"
3. Connect GitHub repo
4. Render detects and deploys

---

## ✅ Setup Checklist

- [ ] GitHub account created
- [ ] Repository created
- [ ] Files uploaded to GitHub
- [ ] Codespace launched
- [ ] `npm install` completed (both root and client)
- [ ] `npm run dev` running
- [ ] App accessible at port 3000
- [ ] Dashboard loads successfully
- [ ] Features tested (Planner, Banner, Reports)
- [ ] (Optional) Google Sheets credentials added

**All checked?** You're fully set up! 🎉

---

## 💰 Cost Summary

**GitHub Codespaces Free Tier:**
- ✅ FREE for 60 hours/month (2-core)
- ✅ Plenty for your project
- ✅ Resets monthly

**If you exceed:**
- ~$0.18/hour for 2-core machine
- ~$0.36/hour for 4-core machine
- Storage: ~$0.07/GB per month

**For this project:** Free tier is more than enough!

---

## 📞 Need Help?

### Codespaces Documentation:
https://docs.github.com/en/codespaces

### Your Codespaces Dashboard:
https://github.com/codespaces

### GitHub Support:
Settings → Support

---

## 🎯 Quick Reference

### Start Working:
1. github.com → Your repo
2. Code → Codespaces → Click yours
3. Terminal → `npm run dev`
4. PORTS tab → Click globe on 3000

### Stop Working:
1. Ctrl+C to stop app
2. Commit changes: `git add . && git commit -m "Updates" && git push`
3. Codespaces menu → Stop

### Share with Team:
1. PORTS → Port 3000 → Visibility → Public
2. Share URL

---

## 🎉 You're All Set!

**Your Tech Enablement Hub is now running in the cloud!**

✅ No local installation needed  
✅ Access from anywhere  
✅ Share with team  
✅ Professional environment  
✅ All features working  

**Start managing your programs!** 🚀

---

**Next: Test all features and invite your team!**
