# Local CMS Usage Guide

## Overview

The Info Hub includes a comprehensive **Local Content Management System (CMS)** that allows you to edit all website content directly in your browser without any coding knowledge. All changes are saved locally in your browser's storage.

## Accessing the CMS

1. **Navigate to the Admin Panel**: 
   - Click the "Admin" button in the navigation bar, OR
   - Go directly to: `http://localhost:5173/admin`

2. **Login**: No login required - the CMS is accessible to anyone with the URL (for demonstration purposes)

## How the CMS Works

### Content Storage
- All content is stored in your browser's **localStorage**
- Changes persist across browser sessions
- Each time you save, content is updated immediately
- To reset to defaults, clear your browser's localStorage

### Navigation
The CMS is organized into **5 main sections** matching your website pages:

1. **Landing Page** - Homepage content
2. **About** - Transformation details
3. **Portfolio** - Initiative portfolio
4. **Playbook** - Framework guides
5. **Contact** - Contact information

## Editing Content

### Basic Editing
1. **Select a tab** (Landing, About, Portfolio, etc.)
2. **Find the field** you want to edit
3. **Type your changes** directly in the input field
4. **Click "Save Changes"** at the top right
5. **Click "View Site"** to see your changes

### Adding New Items
- Look for **"+ Add [Item]"** buttons
- Click to create a new item
- Fill in the fields
- Save your changes

### Removing Items
- Find the item you want to remove
- Click the **trash icon** (🗑️) next to it
- Save your changes

## Detailed Editing Guide by Page

### 1. Landing Page

**Hero Section:**
- Edit the main title and subtitle
- Update call-to-action button text

**Stats:**
- Edit existing stats (icon, label, value)
- Add new stats with the "+ Add Stat" button
- Remove stats with the trash icon

**News Items:**
- Edit title, content, author, date, category
- Add new news items
- Remove news items
- Adjust likes count

### 2. About Page

**Hero Section:**
- Edit title and subtitle

**Vision & Mission:**
- Edit the vision statement
- Edit the mission statement

**Business Goals:**
- Edit goal descriptions
- Update progress percentages (0-100)
- Add/remove goals

**Timeline:**
- Edit phase names, periods, and descriptions
- Change status (Completed, In Progress, Planned)
- Add/remove timeline phases

**Team Members:**
- Edit name, role, and department
- Add/remove team members

**Values & Metrics:**
- Enter values separated by commas
- Enter metrics separated by commas

### 3. Portfolio Page

**Hero Section:**
- Edit title and subtitle

**Portfolio Tabs:**
- **Add new tabs** (e.g., "Innovation", "Sustainability")
- Edit tab ID, label, and description
- Remove tabs (be careful - this affects which initiatives are shown)

**Initiatives:**
- Edit all initiative details:
  - Title, description, category
  - **Tab assignment** (which tab it appears under)
  - Status, team size, start date, impact
  - Knowledge items and resources
- Add/remove initiatives

**Important**: When adding initiatives, make sure to assign them to a tab using the "Tab" dropdown.

### 4. Playbook Page

**Hero Section:**
- Edit title and subtitle

**Frameworks:**
- Edit framework title, icon (emoji), and description
- Add/remove frameworks
- Edit sections within frameworks:
  - Section titles and content
  - Add new sections with "+ Add Section"

### 5. Contact Page

**Hero Section:**
- Edit title and subtitle

**Contact Information:**
- Edit email, phone, office address
- Add/remove contact methods

**Team Members:**
- Edit name, role, and email
- Add/remove team members

**Response Times:**
- Edit response time messages for High, Medium, and Low urgency

## Tips & Best Practices

### Saving Your Work
- **Always click "Save Changes"** after making edits
- The button will turn green and show "Saved!" when successful
- Changes are immediately saved to localStorage

### Viewing Changes
- Click **"View Site"** to see your changes
- The page will reload to show updated content
- You may need to refresh if changes don't appear immediately

### Adding Portfolio Tabs
1. Go to Portfolio tab in admin
2. Click "+ Add Tab"
3. Enter:
   - **Tab ID**: Use lowercase with hyphens (e.g., "innovation", "sustainability")
   - **Label**: The display name (e.g., "Innovation", "Sustainability")
   - **Description**: Brief description shown under the tab
4. Save changes
5. Assign initiatives to the new tab using the "Tab" dropdown

### Managing Initiatives
- Each initiative must be assigned to a tab
- Use the "Tab" dropdown when editing initiatives
- Categories are free-form - use whatever makes sense for your organization
- Status options: Active, Planning, Completed

### Content Structure
- **Hero sections** appear at the top of each page
- **Arrays** (like news items, initiatives) can be reordered by editing
- **Text fields** support multiple lines
- **Numbers** (like progress, team size) should be valid numbers

## Troubleshooting

### Changes Not Appearing?
1. Make sure you clicked "Save Changes"
2. Click "View Site" to reload
3. Hard refresh the page (Ctrl+F5 or Cmd+Shift+R)
4. Check browser console for errors

### Lost Your Changes?
- Content is stored in localStorage
- If you clear browser data, content resets to defaults
- Consider exporting your content (see below)

### Can't Add Items?
- Make sure you're in the correct tab
- Check that the "+ Add" button is visible
- Try refreshing the admin panel

## Advanced: Exporting/Importing Content

### Export Content
1. Open browser DevTools (F12)
2. Go to Application/Storage tab
3. Find "Local Storage" → your domain
4. Find key: `rptContentData`
5. Copy the JSON value
6. Save to a text file

### Import Content
1. Copy your saved JSON
2. Open browser DevTools (F12)
3. Go to Console tab
4. Run: `localStorage.setItem('rptContentData', '[paste your JSON here]')`
5. Refresh the admin panel

## Need Help?

- All fields have labels explaining what they're for
- Required fields are marked with asterisks (*)
- Hover over buttons to see tooltips
- The CMS mirrors the website structure exactly

## Quick Reference

| Action | How To |
|--------|--------|
| Edit text | Click field, type, Save |
| Add item | Click "+ Add [Item]" button |
| Remove item | Click trash icon (🗑️) |
| Save changes | Click "Save Changes" button |
| View site | Click "View Site" button |
| Change page | Click tab at top (Landing, About, etc.) |

---

**Remember**: This is a local CMS - changes are stored in your browser only. For production, you'd want to connect this to a backend database or headless CMS service.

