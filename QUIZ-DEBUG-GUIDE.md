# Quiz & Google Sheets Debug Guide

## ✅ ISSUE FIXED: Form Validation Error

**Problem:** "An invalid form control with name='website' is not focusable" error
**Solution:** ✅ **FIXED!** - Disabled HTML5 validation and implemented custom JavaScript validation

## � URGENT: Update Your Google Apps Script

**The CORS error means your Google Apps Script needs to be updated. Follow these steps:**

### Step 1: Update Your Script
1. Go to https://script.google.com
2. Open your existing project
3. **Replace ALL the code** with the updated code above
4. Click **Save** (Ctrl+S)

### Step 2: Redeploy the Script
1. Click **Deploy** → **Manage deployments**
2. Click the **Edit** (pencil) icon next to your deployment
3. Under "Version", select **New version**
4. Click **Deploy**
5. **Copy the new Web App URL** (it might be different)

### Step 3: Update the Website (if URL changed)
If you got a new Web App URL, update it in your website:
- Open the `index.html` file
- Find the line with `GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/...'`
- Replace with your new URL

### Step 4: Test Again
1. Refresh your browser at http://localhost:8000
2. Try the quiz again
3. The CORS error should be gone!

## �🔍 Quick Troubleshooting Steps

### 1. Test the Website Locally
The server should be running at: http://localhost:8000

1. Open the website in your browser
2. Open browser Developer Tools (F12)
3. Go to Console tab
4. Click "Take Strategy Quiz" button
5. Fill out the quiz and submit
6. Watch the console for any errors

✅ **The quiz should now submit without validation errors!**

### 2. Test Google Sheets Connection
In the browser console, run:
```javascript
testGoogleSheets()
```

This will test your Google Apps Script connection and show detailed error messages.

### 3. Check Google Apps Script Setup

#### Verify Your Script is Deployed:
1. Go to https://script.google.com
2. Open your project
3. Click "Deploy" > "Manage deployments"
4. Make sure it's deployed as a "Web app"
5. Ensure "Execute as" is set to "Me"
6. Ensure "Who has access" is set to "Anyone"

#### Test Your Script Directly:
Visit this URL in your browser:
```
https://script.google.com/macros/s/AKfycbxFDNyUW6hIS7Ul-z3WXphy9UYCyCdt3CGWiOt6HDyw6goETDnqQAxjJI_1E7kHvtrp/exec
```

You should see either:
- A response with `{"status":"error","message":"No data received"}` (this is good - means script is working)
- OR your actual response format

If you see an error page, your script isn't deployed correctly.

### 4. Common Issues & Solutions

#### Issue: "Quiz button doesn't respond"
**Solution:** Check browser console for JavaScript errors. Make sure all scripts are loaded.

#### Issue: "Google Sheets not receiving data"
**Solutions:**
1. Verify your Google Apps Script is deployed correctly
2. Check that the spreadsheet is connected to the script
3. Run `testGoogleSheets()` in console for detailed error info
4. Make sure your Google Apps Script has the correct permissions

#### Issue: "Calendly widget doesn't load"
**Solutions:**
1. Check that Calendly scripts are loaded (should see them in Network tab)
2. Verify your Calendly URL is correct: `https://calendly.com/jeremiah-harcharran-qrd_/30min`
3. Check browser console for Calendly-related errors

## 🛠 Google Apps Script Code (UPDATED - CORS Fixed)

**❗ IMPORTANT: Replace your entire Google Apps Script with this updated code:**

```javascript
function doPost(e) {
  try {
    // Get the active spreadsheet (must be bound to this script)
    const sheet = SpreadsheetApp.getActiveSheet();
    
    // If no data in first row, add headers
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Timestamp', 'Full Name', 'Email', 'Platform', 'Niche', 
        'Website', 'Ad Spend', 'CTR', 'Conversion Rate', 'Timezone', 
        'Referrer', 'User Agent'
      ]);
    }
    
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Validate required fields
    if (!data.email || !data.fullName) {
      throw new Error('Missing required fields: name and email');
    }
    
    // Prepare row data in the same order as headers
    const rowData = [
      data.timestamp || new Date().toISOString(),
      data.fullName || '',
      data.email || '',
      data.platform || '',
      data.niche || '',
      data.website || '',
      data.adSpend || '',
      data.ctr || '',
      data.conversionRate || '',
      data.timezone || '',
      data.referrer || '',
      data.userAgent || ''
    ];
    
    // Append to sheet
    sheet.appendRow(rowData);
    
    // Auto-resize columns for better readability
    sheet.autoResizeColumns(1, rowData.length);
    
    // Return success response with CORS headers
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'success',
        message: 'Data saved successfully',
        timestamp: new Date().toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeader('Access-Control-Allow-Origin', '*')
      .setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
      .setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
      .setHeader('Access-Control-Max-Age', '3600');
      
  } catch (error) {
    // Log error for debugging
    console.error('Error in doPost:', error);
    
    // Return error response with CORS headers
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'error',
        message: error.toString(),
        timestamp: new Date().toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeader('Access-Control-Allow-Origin', '*')
      .setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
      .setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  }
}

// Handle preflight OPTIONS requests (CRITICAL FOR CORS)
function doOptions() {
  return ContentService
    .createTextOutput('')
    .setHeader('Access-Control-Allow-Origin', '*')
    .setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
    .setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    .setHeader('Access-Control-Max-Age', '3600');
}

// Handle GET requests (for testing)
function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({
      status: 'success',
      message: 'Google Apps Script is working! Use POST to submit data.',
      timestamp: new Date().toISOString()
    }))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeader('Access-Control-Allow-Origin', '*');
}
```

## 📋 Step-by-Step Testing

1. **Load the website** - http://localhost:8000
2. **Open Developer Tools** (F12) → Console tab
3. **Click "Take Strategy Quiz"** - Quiz modal should open
4. **Fill out all steps** - Each step should advance automatically or with Continue button
5. **Submit final step** - Watch console for messages:
   - "Starting Google Sheets submission with data: ..."
   - "Formatted sheet data: ..."
   - "Response status: 200" (or error code)
   - Either success or error messages

## 🆘 If Still Not Working

1. **Share the console errors** - Copy any red error messages from browser console
2. **Test the Google Apps Script URL directly** in browser
3. **Check Google Apps Script logs** - In script.google.com, go to Executions tab
4. **Verify permissions** - Make sure the script can access your spreadsheet

## 📞 Fallback Solution

Even if Google Sheets fails, the quiz will still show Calendly booking as a fallback, so you can still capture leads through meeting bookings.
