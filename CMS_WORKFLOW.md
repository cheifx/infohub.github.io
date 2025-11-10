# CMS Workflow Guide

## How to Update Content on GitHub Pages

The Admin panel now includes export functionality that allows you to update content on the live GitHub Pages site.

### Step-by-Step Process

#### 1. Edit Content in Admin Panel
- Go to: `https://cheifx.github.io/infohub.github.io/admin`
- Make your content changes using the Admin panel
- Click **"Save Changes"** to save to localStorage (for local preview)

#### 2. Export Content
- Click the **"Export"** button in the Admin panel
- This downloads a `content.js` file with all your changes

#### 3. Update Your Local Repository
- Replace `src/data/content.js` with the downloaded file
- Or manually copy the content from the exported file

#### 4. Commit and Push
```bash
cd "/Volumes/Che SD/03_Digital Assets/rptInfoHub"
git add src/data/content.js
git commit -m "Update content from Admin panel"
git push https://YOUR_TOKEN@github.com/cheifx/infohub.github.io.git main
```

#### 5. Automatic Deployment
- GitHub Actions will automatically build and deploy
- Wait 2-3 minutes
- Your changes will be live at: `https://cheifx.github.io/infohub.github.io/`

### Alternative: Copy to Clipboard
- Click the **Copy** button (clipboard icon) in Admin panel
- This copies the content JSON to your clipboard
- Paste it into `src/data/content.js` manually

## Notes

- **Local Changes**: "Save Changes" saves to localStorage (browser only)
- **Live Site Changes**: Export → Update file → Push to GitHub
- The Admin panel works on both local development and GitHub Pages
- All content changes require a git push to go live

## Quick Reference

| Action | Button | Result |
|--------|--------|--------|
| Save locally | "Save Changes" | Saves to localStorage |
| Export for GitHub | "Export" | Downloads content.js file |
| Copy JSON | Copy icon | Copies to clipboard |

