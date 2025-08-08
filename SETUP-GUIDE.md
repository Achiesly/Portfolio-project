# Website Setup Guide
## Jeremiah Harcharran - Performance Creative Architect

### 🚀 Quick Start Checklist
- [ ] Set up Google Sheets integration
- [ ] Update Calendly username
- [ ] Upload media files
- [ ] Test all functionality
- [ ] Deploy to hosting platform

---

## 📊 Google Sheets Integration Setup

### Step 1: Create Google Apps Script
1. Go to [script.google.com](https://script.google.com)
2. Click "New Project"
3. Replace the default code with the contents of `google-apps-script-code.js`
4. Save the project (give it a name like "Quiz Lead Capture")

### Step 2: Create Google Sheets
1. Go to [sheets.google.com](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "Quiz Leads" or similar
4. Copy the Sheet ID from the URL (the long string between `/d/` and `/edit`)

### Step 3: Connect Script to Sheet
1. In your Apps Script project, click the "Resources" menu
2. Select "Advanced Google Services" (or use the new interface)
3. Go back to your script and replace `getActiveSheet()` with your specific sheet if needed

### Step 4: Deploy as Web App
1. In Apps Script, click "Deploy" → "New deployment"
2. Choose type: "Web app"
3. Execute as: "Me"
4. Who has access: "Anyone"
5. Click "Deploy"
6. **Copy the Web App URL** - you'll need this!

### Step 5: Update HTML File
1. Open `final v2.html`
2. Find the line: `const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_SCRIPT_WEB_APP_URL_HERE';`
3. Replace `'YOUR_GOOGLE_SCRIPT_WEB_APP_URL_HERE'` with your actual Web App URL

---

## 📅 Calendly Integration Setup

### Update Calendly Username
In `final v2.html`, find and replace **both** instances of `your-calendly-username`:

1. **Popup widget** (around line ~580):
   ```javascript
   url: 'https://calendly.com/your-calendly-username/30min'
   ```

2. **Inline widget** (around line ~615):
   ```javascript
   url: 'https://calendly.com/your-calendly-username/30min'
   ```

Replace `your-calendly-username` with your actual Calendly username.

---

## 🎨 Media Files Setup

### Upload Your Media Files
Replace the placeholder files in these folders:

#### `/media/hero/`
- `hero-background.mp4` - Main hero section background video
- `hero-thumbnail.jpg` - Video thumbnail/poster image

#### `/media/about/`
- `profile-photo.jpg` - Your professional headshot
- `office-photo.jpg` - Your workspace or office photo
- `team-photo.jpg` - Team photo (if applicable)

#### `/media/services/`
- `creative-strategy-icon.jpg` - Creative Strategy service visual
- `ad-creative-optimization-icon.jpg` - Ad optimization visual
- `performance-analytics-icon.jpg` - Analytics service visual
- `brand-development-icon.jpg` - Branding service visual

#### `/media/portfolio/`
- `project1-thumbnail.jpg` through `project6-thumbnail.jpg`
- `project1-full.jpg` through `project6-full.jpg`

### Image Specifications
- **Hero Background**: 1920x1080 (MP4 format, under 5MB)
- **Hero Thumbnail**: 1920x1080 (JPG format)
- **Profile Photo**: 400x400 (JPG format, professional headshot)
- **Service Icons**: 300x200 (JPG format, high quality)
- **Portfolio Images**: 600x400 (JPG format, optimized for web)

---

## 🧪 Testing Your Setup

### Test Google Sheets Integration
1. Open your website in a browser
2. Complete the quiz form
3. Submit the form
4. Check your Google Sheets for the new row
5. Verify Calendly popup appears after submission

### Test Calendly Integration
1. Click "Book a Call" buttons
2. Verify Calendly popup loads correctly
3. Test the inline Calendly widget in the quiz results

### Test Responsive Design
1. Test on mobile devices
2. Test on tablets
3. Test on different desktop screen sizes

---

## 🌐 Deployment Options

### Option 1: Hostinger
1. Upload `final v2.html` as `index.html`
2. Upload entire `/media/` folder
3. Configure domain and SSL

### Option 2: GoDaddy
1. Use File Manager in cPanel
2. Upload to `public_html` folder
3. Rename `final v2.html` to `index.html`

### Option 3: Netlify (Alternative)
1. Drag and drop entire folder to Netlify
2. Rename `final v2.html` to `index.html`
3. Free hosting with custom domain options

---

## 🔧 Troubleshooting

### Google Sheets Not Working?
- Check the Web App URL is correct
- Ensure Apps Script deployment permissions are set to "Anyone"
- Check browser console for error messages
- Verify Google Sheets exists and is accessible

### Calendly Not Loading?
- Confirm Calendly username is correct
- Check your Calendly availability settings
- Verify your meeting link is active

### Media Files Not Loading?
- Check file paths match the folder structure
- Ensure images are optimized for web
- Verify file extensions match the HTML references

---

## 📞 Support

If you encounter issues:
1. Check browser console for error messages
2. Test each component individually
3. Verify all URLs and usernames are correct
4. Ensure Google Sheets permissions are properly set

---

**Next Steps**: Complete the checklist above, then your website will be fully functional and ready to capture leads and book meetings!
