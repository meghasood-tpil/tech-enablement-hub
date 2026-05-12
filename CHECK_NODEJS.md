# How to Check if Node.js is Installed

## Quick Check (30 seconds)

### Step 1: Open Terminal

**Mac:** 
- Press `Cmd + Space`
- Type "Terminal"
- Press Enter

### Step 2: Check Node.js

Copy and paste this command:
```bash
node --version
```

**What you'll see:**

✅ **If installed:**
```
v18.17.0
```
(or any version like v16.x.x, v18.x.x, v20.x.x)

❌ **If NOT installed:**
```
command not found: node
```
or
```
zsh: command not found: node
```

### Step 3: Check npm (comes with Node.js)

```bash
npm --version
```

**What you'll see:**

✅ **If installed:**
```
9.6.7
```
(or similar version number)

---

## What You Need

**Minimum:** Node.js v16 or higher

**Recommended:** Node.js v18 LTS (Long Term Support)

---

## If NOT Installed

### Download Node.js (5 minutes)

1. **Go to:** https://nodejs.org/

2. **Download:**
   - Click the **green button** that says "LTS" (Recommended)
   - It will say something like "18.x.x LTS"

3. **Install:**
   - Open the downloaded `.pkg` file
   - Follow the installer (click Continue → Agree → Install)
   - Enter your Mac password when prompted
   - Click "Close" when done

4. **Verify Installation:**
   - Close Terminal (if open)
   - Open Terminal again
   - Run: `node --version`
   - Should show: `v18.x.x` ✅

---

## Quick Test Commands

Run these in Terminal to verify everything:

```bash
# Check Node.js version
node --version

# Check npm version
npm --version

# Check if Node.js works
node -e "console.log('Node.js works!')"
```

**Expected output:**
```
v18.17.0
9.6.7
Node.js works!
```

---

## After Installing Node.js

Now you can run your Tech Enablement Hub:

```bash
cd /Users/megha.sood/tech-enablement-hub
npm install
cd client && npm install && cd ..
npm run dev
```

---

## Common Issues

### "command not found" after installing

**Fix:** Close and reopen Terminal, then try again

### Old version (like v12 or v14)

**Fix:** 
1. Go to https://nodejs.org/
2. Download latest LTS version
3. Install (it will upgrade automatically)

### Permission errors when installing

**Fix:** You might need to use `sudo`:
```bash
sudo npm install
```

---

## Visual Guide

**Terminal window should look like this:**

```
Last login: Mon May 12 16:00:00 on ttys000
~ % node --version
v18.17.0
~ % npm --version
9.6.7
~ % ▊
```

The `v18.17.0` and `9.6.7` mean it's installed! ✅

---

## Next Steps After Confirming Node.js

Once you see Node.js is installed:

1. ✅ Go to your project folder
2. ✅ Run `npm install` commands
3. ✅ Start your app with `npm run dev`
4. ✅ Open http://localhost:3000

See **START_HERE.md** for full instructions!

---

**That's it! Takes just 30 seconds to check, 5 minutes to install if needed.** 🚀
