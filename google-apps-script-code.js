/**
 * Google Apps Script for Quiz Lead Capture
 * Website: Jeremiah Harcharran - Performance Creative Architect
 * 
 * SETUP INSTRUCTIONS:
 * 1. Go to script.google.com
 * 2. Create a new project
 * 3. Delete the default code and paste this entire file
 * 4. Create a new Google Sheets file (or use existing one)
 * 5. Copy the Google Sheets ID from the URL
 * 6. Go back to Apps Script and click "Deploy" > "New deployment"
 * 7. Choose "Web app" as the type
 * 8. Set Execute as: "Me"
 * 9. Set Who has access: "Anyone"
 * 10. Click Deploy and copy the Web App URL
 * 11. Update GOOGLE_SCRIPT_URL in your HTML file with this URL
 */

function doPost(e) {
  try {
    // Get the active spreadsheet (must be bound to this script)
    const sheet = SpreadsheetApp.getActiveSheet();
    
    // If no data in first row, add headers
    if (sheet.getLastRow() === 0) {
      const headers = [
        'Timestamp', 'Full Name', 'Email', 'Platform', 
        'Niche', 'Website', 'Ad Spend', 'CTR', 
        'Conversion Rate', 'Timezone', 'Referrer', 'User Agent'
      ];
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      
      // Format headers
      sheet.getRange(1, 1, 1, headers.length)
           .setBackground('#4285F4')
           .setFontColor('white')
           .setFontWeight('bold');
    }
    
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Validate required fields
    if (!data.email || !data.fullName) {
      throw new Error('Missing required fields: email and fullName');
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
    
    // Optional: Send email notification (uncomment if needed)
    /*
    MailApp.sendEmail({
      to: 'your-email@example.com',
      subject: 'New Quiz Lead: ' + data.fullName,
      body: 'New lead captured:\n\n' + 
            'Name: ' + data.fullName + '\n' +
            'Email: ' + data.email + '\n' +
            'Platform: ' + data.platform + '\n' +
            'Niche: ' + data.niche + '\n' +
            'Website: ' + data.website + '\n' +
            'Ad Spend: $' + data.adSpend + '\n\n' +
            'View full data: ' + SpreadsheetApp.getActiveSpreadsheet().getUrl()
    });
    */
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'success',
        message: 'Lead captured successfully',
        timestamp: new Date().toISOString(),
        rowNumber: sheet.getLastRow()
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Log error for debugging
    console.error('Error in doPost:', error);
    
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'error',
        message: error.toString(),
        timestamp: new Date().toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Test function for development
function testSubmission() {
  const testData = {
    timestamp: new Date().toISOString(),
    fullName: 'John Doe',
    email: 'john@example.com',
    platform: 'Facebook/Instagram',
    niche: 'E-commerce',
    website: 'https://example.com',
    adSpend: '15000',
    ctr: '2.8',
    conversionRate: '4.2',
    timezone: 'America/New_York',
    referrer: 'https://google.com',
    userAgent: 'Mozilla/5.0...'
  };
  
  const mockEvent = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };
  
  const result = doPost(mockEvent);
  Logger.log(result.getContent());
  return result.getContent();
}

// Function to set up triggers (optional)
function setupTriggers() {
  // Delete existing triggers
  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(trigger => ScriptApp.deleteTrigger(trigger));
  
  // Add any recurring triggers if needed
  // ScriptApp.newTrigger('someFunction').timeBased().everyHours(1).create();
}
