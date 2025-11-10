# Complete Step-by-Step Guide to Push to GitHub

## Step 1: Open Terminal and Navigate to Project

1. Open Terminal (or your terminal app)
2. Copy and paste this command to navigate to your project:

```bash
cd "/Volumes/Che SD/03_Digital Assets/rptInfoHub"
```

3. Press Enter
4. Verify you're in the right place by running:
```bash
pwd
```
You should see: `/Volumes/Che SD/03_Digital Assets/rptInfoHub`

## Step 2: Verify Git Status

Check what needs to be pushed:

```bash
git status
```

You should see "On branch main" and "Your branch is ahead of 'origin/main' by X commits"

## Step 3: Push Using Your Personal Access Token

**IMPORTANT:** Replace `YOUR_TOKEN_HERE` with your actual Personal Access Token from GitHub.

Run this command (copy the entire line):

```bash
git push https://YOUR_TOKEN_HERE@github.com/cheifx/infohub.github.io.git main
```

**Example:** If your token is `ghp_abc123xyz456`, the command would be:
```bash
git push https://ghp_abc123xyz456@github.com/cheifx/infohub.github.io.git main
```

## Alternative: If the above doesn't work, try this:

```bash
git push -u origin main
```

Then when prompted:
- **Username:** Type `cheifx` and press Enter
- **Password:** Paste your Personal Access Token and press Enter (it won't show as you type, that's normal)

## Step 4: Verify Push Success

After pushing, you should see output like:
```
Enumerating objects: X, done.
Counting objects: 100% (X/X), done.
Writing objects: 100% (X/X), done.
To https://github.com/cheifx/infohub.github.io.git
 * [new branch]      main -> main
Branch 'main' set up to track remote branch 'main' from 'origin'.
```

## Step 5: Check GitHub Actions

1. Go to: https://github.com/cheifx/infohub.github.io/actions
2. You should see a workflow running called "Deploy to GitHub Pages"
3. Wait 2-3 minutes for it to complete
4. Look for a green checkmark ✅

## Step 6: Access Your Site

Once deployment completes:
- Go to: https://cheifx.github.io/infohub.github.io/

## Troubleshooting

**If you get "fatal: could not read Username":**
- Make sure you're using the token in the URL correctly
- Check that there are no spaces in your token

**If you get "remote: Invalid username or password":**
- Double-check your token is correct
- Make sure the token has `repo` permissions
- Try generating a new token

**If nothing happens:**
- Make sure you're in the correct directory (use `pwd` to check)
- Try the alternative method with `git push -u origin main`

