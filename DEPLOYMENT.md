# Deployment Guide for GitHub Pages

## Quick Fix for Git Push Authentication

Since `git push` is waiting for authentication, you have two options:

### Option 1: Use Personal Access Token (Recommended)

1. **Create a Personal Access Token:**
   - Go to: https://github.com/settings/tokens
   - Click "Generate new token" → "Generate new token (classic)"
   - Give it a name like "rptInfoHub Deployment"
   - Select scopes: `repo` (full control of private repositories)
   - Click "Generate token"
   - **Copy the token immediately** (you won't see it again!)

2. **Push using the token:**
   ```bash
   git push -u origin main
   ```
   - When prompted for **Username**: enter `cheifx`
   - When prompted for **Password**: paste your Personal Access Token (not your GitHub password)

### Option 2: Switch to SSH (Alternative)

1. **Check if you have SSH keys:**
   ```bash
   ls -al ~/.ssh
   ```

2. **If no SSH key exists, generate one:**
   ```bash
   ssh-keygen -t ed25519 -C "your_email@example.com"
   # Press Enter to accept default location
   # Optionally set a passphrase
   ```

3. **Add SSH key to GitHub:**
   ```bash
   cat ~/.ssh/id_ed25519.pub
   # Copy the output
   ```
   - Go to: https://github.com/settings/keys
   - Click "New SSH key"
   - Paste your public key and save

4. **Change remote to SSH:**
   ```bash
   git remote set-url origin git@github.com:cheifx/infohub.github.io.git
   git push -u origin main
   ```

## GitHub Pages Configuration

### Step 1: Enable GitHub Pages
1. Go to: https://github.com/cheifx/infohub.github.io/settings/pages
2. Under **"Source"**, select: **"GitHub Actions"** (not "Deploy from a branch")
3. Click **Save**

### Step 2: Verify Deployment
1. Go to: https://github.com/cheifx/infohub.github.io/actions
2. Wait for the workflow to complete (should take 2-3 minutes)
3. Check for green checkmarks ✅

### Step 3: Access Your Site
After deployment completes, your site will be available at:
- **https://cheifx.github.io/infohub.github.io/**

## Troubleshooting

### If you see 404:
1. **Check Actions tab** - Make sure the workflow ran successfully
2. **Wait 1-2 minutes** - GitHub Pages can take time to propagate
3. **Clear browser cache** - Try incognito/private mode
4. **Check the URL** - Make sure you're using the full path: `/infohub.github.io/`

### If deployment fails:
1. Check the Actions tab for error messages
2. Make sure `package.json` has all dependencies
3. Verify Node.js version in workflow (currently set to 18)

## After First Deployment

Once deployed, every time you push to `main`, GitHub Actions will automatically:
1. Build your React app
2. Deploy to GitHub Pages
3. Make it live within 1-2 minutes

No manual steps needed after the initial setup!

