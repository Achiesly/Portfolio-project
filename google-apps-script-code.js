function doPost(e) {
  // Set CORS headers for all responses
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json'
  };
  
  try {
    // Check if request has data
    if (!e || (!e.parameter && !e.postData)) {
      throw new Error('No data received in request');
    }
    
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
    
    // Parse the incoming data (handle both FormData and direct JSON)
    let data;
    if (e.parameter && e.parameter.data) {
      // Data sent as FormData
      data = JSON.parse(e.parameter.data);
    } else if (e.postData && e.postData.contents) {
      // Data sent as JSON
      data = JSON.parse(e.postData.contents);
    } else {
      throw new Error('No valid data found in request');
    }
    
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
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'success',
        message: 'Data saved successfully',
        timestamp: new Date().toISOString()
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

// Handle preflight OPTIONS requests (CRITICAL FOR CORS)
function doOptions() {
  return ContentService
    .createTextOutput('')
    .setMimeType(ContentService.MimeType.TEXT);
}

// Handle GET requests (for testing)
function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({
      status: 'success',
      message: 'Google Apps Script is working! Use POST to submit data.',
      timestamp: new Date().toISOString()
    }))
    .setMimeType(ContentService.MimeType.JSON);
}