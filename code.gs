/**
 * Energx Order Management - Google Apps Script
 * 
 * HOW TO USE:
 * 1. Create a new Google Sheet
 * 2. Go to Extensions > Apps Script
 * 3. Paste this code and update CONFIG below
 * 4. Deploy > New deployment > Web app > Anyone can access
 * 5. Copy the URL to your website's app.js
 */

// ============== UPDATE THESE VALUES ==============
const CONFIG = {
  // Get your spreadsheet ID from the URL: docs.google.com/spreadsheets/d/[THIS-IS-YOUR-ID]/edit
  SPREADSHEET_ID: '1eslfzhwiYL0Rjy8NgUxtOSNehOAStMtoZhSk1addTOY',  // Leave empty to use the spreadsheet this script is attached to
  
  SHEET_NAME: 'Orders',
  
  // Your email to receive order notifications
  ADMIN_EMAIL: 'your-email@gmail.com',  // <-- UPDATE THIS!
  
  // Email settings
  SEND_CUSTOMER_EMAIL: true,
  SEND_ADMIN_EMAIL: false,
  
  // Your Venmo username for payment instructions
  VENMO_USERNAME: '@YourVenmo'  // <-- UPDATE THIS!
};
// =================================================

// Product metadata used for emails and admin display
const PRODUCTS = {
  'Gorilla Mind': { caffeine: 200 },
  'Monster': { caffeine: 150 },
  'Monster Juice': { caffeine: 150 },
  'Redbull': { caffeine: 80 },
  'Bang': { caffeine: 300 },
  'C4': { caffeine: 200 },
  'ZOA': { caffeine: 160 },
  'Rockstar': { caffeine: 240 },
  'Ryse': { caffeine: 200 },
  'Alani': { caffeine: 200 },
  'Celsius': { caffeine: 200 },
  'Reign': { caffeine: 300 },
  'Ghost': { caffeine: 200 },
  'Bucked Up': { caffeine: 300 },
  'Bloom': { caffeine: 200 },
  'Guru': { caffeine: 140 },
  'Gorgie': { caffeine: 150 },
  'PHX': { caffeine: 200 },
  'LifeAid': { caffeine: 200 },
  'Lucky': { caffeine: 200 },
  'Accelerator': { caffeine: 200 },
  'Riot': { caffeine: 160 },
  'Redcon1': { caffeine: 200 },
  'Omni': { caffeine: 200 },
  'Bubblr': { caffeine: 69 }
};

/**
 * Handle incoming orders from website
 */
function doPost(e) {
  try {
    Logger.log('Received POST request');
    const data = JSON.parse(e.postData.contents);
    Logger.log('Order data: ' + JSON.stringify(data));
    
    // Save to spreadsheet
    const orderId = saveOrder(data);
    Logger.log('Order saved with ID: ' + orderId);
    
    // Send emails
    if (CONFIG.SEND_CUSTOMER_EMAIL && data.email) {
      sendCustomerEmail(data, orderId);
      Logger.log('Customer email sent to: ' + data.email);
    }
    
    if (CONFIG.SEND_ADMIN_EMAIL && CONFIG.ADMIN_EMAIL !== 'your-email@gmail.com') {
      sendAdminEmail(data, orderId);
      Logger.log('Admin email sent to: ' + CONFIG.ADMIN_EMAIL);
    }
    
    return ContentService
      .createTextOutput(JSON.stringify({ success: true, orderId: orderId }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    Logger.log('ERROR: ' + error.toString());
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Test endpoint
 */
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ 
      status: 'Energx API Running ⚡',
      time: new Date().toISOString()
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Save order to Google Sheet
 */
function saveOrder(data) {
  // Get or create spreadsheet
  let ss;
  if (CONFIG.SPREADSHEET_ID && CONFIG.SPREADSHEET_ID.length > 10) {
    ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
  } else {
    ss = SpreadsheetApp.getActiveSpreadsheet();
  }
  
  if (!ss) {
    throw new Error('Could not access spreadsheet. Check SPREADSHEET_ID in CONFIG.');
  }
  
  // Get or create Orders sheet
  let sheet = ss.getSheetByName(CONFIG.SHEET_NAME);
  
  if (!sheet) {
    sheet = ss.insertSheet(CONFIG.SHEET_NAME);
    setupSheet(sheet);
  }
  
  // Check if headers exist
  if (sheet.getLastRow() === 0) {
    setupSheet(sheet);
  }
  
  // Generate order ID
  const orderId = 'ENX-' + Date.now().toString(36).toUpperCase();
  
  // Format timestamp nicely
  const now = new Date();
  const timestamp = Utilities.formatDate(now, 'America/New_York', 'MMM dd, yyyy h:mm a');
  
  // Add the order row
  sheet.appendRow([
    orderId,
    timestamp,
    data.name || '',
    data.email || '',
    data.phone || '',
    (data.address || '').replace(/\n/g, ', '),
    (data.payment || '').toUpperCase(),
    data.caffeinePreferences || 'None',
    data.flavorPreferences || 'None',
    data.boxSize + ' cans',
    '$' + data.total,
    data.items || '',
    data.payment === 'venmo' ? 'Awaiting Payment' : 'Ready to Pack'
  ]);
  
  // Auto-fit columns
  try {
    sheet.autoResizeColumns(1, 11);
  } catch(e) {
    // Ignore resize errors
  }
  
  return orderId;
}

/**
 * Setup sheet with headers and formatting
 */
function setupSheet(sheet) {
  const headers = [
    'Order ID', 'Date', 'Name', 'Email', 'Phone', 
    'Address', 'Payment', 'Caffeine Prefs', 'Flavor Prefs', 'Box Size', 'Total', 'Items', 'Status'
  ];
  
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  
  // Style the header
  sheet.getRange(1, 1, 1, headers.length)
    .setFontWeight('bold')
    .setBackground('#7c3aed')
    .setFontColor('white')
    .setHorizontalAlignment('center');
  
  sheet.setFrozenRows(1);
  
  // Set column widths
  sheet.setColumnWidth(1, 120);  // Order ID
  sheet.setColumnWidth(2, 150);  // Date
  sheet.setColumnWidth(3, 150);  // Name
  sheet.setColumnWidth(4, 200);  // Email
  sheet.setColumnWidth(5, 120);  // Phone
  sheet.setColumnWidth(6, 250);  // Address
  sheet.setColumnWidth(7, 80);   // Payment
  sheet.setColumnWidth(8, 120);  // Caffeine Prefs
  sheet.setColumnWidth(9, 150);  // Flavor Prefs
  sheet.setColumnWidth(10, 80);  // Box Size
  sheet.setColumnWidth(11, 70);  // Total
  sheet.setColumnWidth(12, 300); // Items
  sheet.setColumnWidth(13, 140); // Status
}

/**
 * Send beautiful confirmation email to customer
 */
function sendCustomerEmail(data, orderId) {
  const subject = 'Your Energx Order is Confirmed! - ' + orderId;
  
  // Parse items into a nice list and include caffeine mg when available
  const itemsArray = (data.items || '').length ? data.items.split(', ') : [];
  const itemsHtml = itemsArray.map(item => {
    const parts = item.split(': ');
    const brand = (parts[0] || '').trim();
    const qty = (parts[1] || '').trim();
    const caffeine = PRODUCTS[brand] ? PRODUCTS[brand].caffeine : null;
    const caffeineHtml = caffeine ? `<div style="font-size:12px; color:#6b7280;">${caffeine}mg</div>` : '';
    return `
      <tr>
        <td style="padding: 12px 16px; border-bottom: 1px solid #e5e7eb; vertical-align: middle;">
          <div style="font-weight: 600; color: #1f2937;">${brand}</div>
          ${caffeineHtml}
        </td>
        <td style="padding: 12px 16px; border-bottom: 1px solid #e5e7eb; text-align: right; color: #6b7280; vertical-align: middle;">
          ${qty} cans
        </td>
      </tr>
    `;
  }).join('');
  
  const venmoSection = data.payment === 'venmo' ? `
    <div style="background: linear-gradient(135deg, #008cff 0%, #0052cc 100%); border-radius: 12px; padding: 24px; margin: 24px 0; color: white;">
      <h3 style="margin: 0 0 12px 0; font-size: 18px;">Complete Your Venmo Payment</h3>
      <p style="margin: 0 0 16px 0; opacity: 0.9;">Send <strong>$${data.total}</strong> to <strong>${CONFIG.VENMO_USERNAME}</strong></p>
      <div style="background: rgba(255,255,255,0.2); border-radius: 8px; padding: 12px; font-size: 14px;">
        <strong>Important:</strong> Include your order ID <strong>${orderId}</strong> in the payment note so we can match your payment!
      </div>
    </div>
  ` : `
    <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); border-radius: 12px; padding: 24px; margin: 24px 0; color: white;">
      <h3 style="margin: 0 0 8px 0; font-size: 18px;">Cash Payment</h3>
      <p style="margin: 0; opacity: 0.9;">Please have <strong>$${data.total}</strong> ready when we deliver your box!</p>
    </div>
  `;

  const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #f3f4f6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
    
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #a855f7 0%, #ec4899 100%); border-radius: 16px 16px 0 0; padding: 40px 32px; text-align: center;">
      <h1 style="margin: 0; color: white; font-size: 32px; font-weight: 700;">ENERGX</h1>
      <p style="margin: 8px 0 0 0; color: rgba(255,255,255,0.9); font-size: 16px;">Your order has been confirmed!</p>
    </div>
    
    <!-- Main Content -->
    <div style="background: white; padding: 32px; border-radius: 0 0 16px 16px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
      
      <p style="font-size: 18px; color: #1f2937; margin: 0 0 24px 0;">
        Hey <strong>${data.name}</strong>!
      </p>
      
      <p style="color: #4b5563; line-height: 1.6; margin: 0 0 32px 0;">
        Thanks for your order! We're pumped to get your energy drinks to you. Here's everything you need to know:
      </p>
      
      <!-- Order Info Card -->
      <div style="background: #f9fafb; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 0 0 16px 0;">
              <p style="margin: 0; color: #6b7280; font-size: 14px;">Order ID</p>
              <p style="margin: 4px 0 0 0; color: #a855f7; font-weight: 700; font-size: 18px;">${orderId}</p>
            </td>
            <td style="padding: 0 0 16px 0; text-align: right;">
              <p style="margin: 0; color: #6b7280; font-size: 14px;">Total</p>
              <p style="margin: 4px 0 0 0; color: #1f2937; font-weight: 700; font-size: 24px;">$${data.total}</p>
            </td>
          </tr>
        </table>
        <div style="border-top: 1px solid #e5e7eb; padding-top: 16px;">
          <p style="margin: 0; color: #6b7280; font-size: 14px;">Box Size</p>
          <p style="margin: 4px 0 0 0; color: #1f2937; font-weight: 600;">${data.boxSize} cans</p>
        </div>
        ${(data.caffeinePreferences && data.caffeinePreferences !== 'None') || (data.flavorPreferences && data.flavorPreferences !== 'None') ? `
        <div style="border-top: 1px solid #e5e7eb; padding-top: 16px; margin-top: 16px;">
          ${data.caffeinePreferences && data.caffeinePreferences !== 'None' ? `
          <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 14px;">Caffeine Preferences</p>
          <p style="margin: 0 0 12px 0; color: #1f2937; font-weight: 600;">${data.caffeinePreferences}</p>
          ` : ''}
          ${data.flavorPreferences && data.flavorPreferences !== 'None' ? `
          <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 14px;">Flavor Preferences</p>
          <p style="margin: 0; color: #1f2937; font-weight: 600;">${data.flavorPreferences}</p>
          ` : ''}
        </div>
        ` : ''}
      </div>
      
      <!-- Items Table -->
      <h3 style="margin: 0 0 16px 0; color: #1f2937; font-size: 16px;">Your Drinks</h3>
      <table style="width: 100%; border-collapse: collapse; background: #f9fafb; border-radius: 8px; overflow: hidden; margin-bottom: 24px;">
        ${itemsHtml}
      </table>
      
      <!-- Delivery Address -->
      <div style="background: #f9fafb; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
        <h3 style="margin: 0 0 8px 0; color: #1f2937; font-size: 16px;">Delivery Address</h3>
        <p style="margin: 0; color: #4b5563; line-height: 1.6;">${(data.address || '').replace(/\n/g, '<br>')}</p>
      </div>
      
      <!-- Payment Section -->
      ${venmoSection}
      
      <!-- Footer -->
      <div style="text-align: center; padding-top: 24px; border-top: 1px solid #e5e7eb; margin-top: 32px;">
        <p style="color: #6b7280; font-size: 14px; margin: 0 0 8px 0;">Questions? Just reply to this email!</p>
        <p style="color: #1f2937; font-weight: 600; margin: 0;">Stay energized!</p>
      </div>
      
    </div>
    
    <!-- Email Footer -->
    <div style="text-align: center; padding: 24px;">
      <p style="color: #9ca3af; font-size: 12px; margin: 0;">© 2025 Energx • Premium Energy Drinks</p>
    </div>
    
  </div>
</body>
</html>
`;

  // Plain text fallback
  const plainText = `
ENERGX ORDER CONFIRMED
========================

Hey ${data.name}!

Thanks for your order! Here are your details:

Order ID: ${orderId}
Box Size: ${data.boxSize} cans
Total: $${data.total}
${(data.caffeinePreferences && data.caffeinePreferences !== 'None') ? `
Caffeine Preferences: ${data.caffeinePreferences}` : ''}${(data.flavorPreferences && data.flavorPreferences !== 'None') ? `
Flavor Preferences: ${data.flavorPreferences}` : ''}

YOUR DRINKS:
${itemsArray.map(item => '- ' + item).join('\n')}

DELIVERY ADDRESS:
${data.address}

${data.payment === 'venmo' 
  ? `VENMO PAYMENT:\nSend $${data.total} to ${CONFIG.VENMO_USERNAME}\nInclude order ID ${orderId} in the note!`
  : `CASH PAYMENT:\nPlease have $${data.total} ready for delivery.`
}

Questions? Reply to this email!

Stay energized!
The Energx Team
`;

  GmailApp.sendEmail(data.email, subject, plainText, {
    htmlBody: htmlBody,
    name: 'Energx'
  });
}

/**
 * Send notification to admin
 */
function sendAdminEmail(data, orderId) {
  const subject = 'NEW ORDER: ' + orderId + ' - $' + data.total + ' (' + data.payment.toUpperCase() + ')';
  
  const htmlBody = `
<!DOCTYPE html>
<html>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 20px; background: #f3f4f6;">
  <div style="max-width: 500px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
    
    <div style="background: linear-gradient(135deg, #a855f7, #ec4899); padding: 20px; color: white;">
      <h2 style="margin: 0;">New Order Received!</h2>
    </div>
    
    <div style="padding: 24px;">
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px 0; color: #6b7280;">Order ID</td>
          <td style="padding: 8px 0; font-weight: 600; color: #a855f7;">${orderId}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #6b7280;">Customer</td>
          <td style="padding: 8px 0; font-weight: 600;">${data.name}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #6b7280;">Email</td>
          <td style="padding: 8px 0;"><a href="mailto:${data.email}">${data.email}</a></td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #6b7280;">Phone</td>
          <td style="padding: 8px 0;">${data.phone || 'Not provided'}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #6b7280;">Address</td>
          <td style="padding: 8px 0;">${(data.address || '').replace(/\n/g, ', ')}</td>
        </tr>
        <tr style="border-top: 1px solid #e5e7eb;">
          <td style="padding: 12px 0 8px 0; color: #6b7280;">Box Size</td>
          <td style="padding: 12px 0 8px 0; font-weight: 600;">${data.boxSize} cans</td>
        </tr>
        ${(data.caffeinePreferences && data.caffeinePreferences !== 'None') ? `
        <tr>
          <td style="padding: 8px 0; color: #6b7280;">Caffeine Prefs</td>
          <td style="padding: 8px 0; font-weight: 600;">${data.caffeinePreferences}</td>
        </tr>
        ` : ''}
        ${(data.flavorPreferences && data.flavorPreferences !== 'None') ? `
        <tr>
          <td style="padding: 8px 0; color: #6b7280;">Flavor Prefs</td>
          <td style="padding: 8px 0; font-weight: 600;">${data.flavorPreferences}</td>
        </tr>
        ` : ''}
        <tr>
          <td style="padding: 8px 0; color: #6b7280;">Payment</td>
          <td style="padding: 8px 0; font-weight: 600;">${data.payment === 'venmo' ? 'Venmo' : 'Cash'}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #6b7280;">Total</td>
          <td style="padding: 8px 0; font-weight: 700; font-size: 20px; color: #10b981;">$${data.total}</td>
        </tr>
      </table>
      
      <div style="background: #f9fafb; border-radius: 8px; padding: 16px; margin-top: 16px;">
        <strong>Items:</strong><br>
        ${data.items.split(', ').map(it => {
          const parts = it.split(': ');
          const brand = (parts[0] || '').trim();
          const qty = (parts[1] || '').trim();
          const caffeine = PRODUCTS[brand] ? PRODUCTS[brand].caffeine : null;
          return `${brand} ${caffeine ? '(' + caffeine + 'mg)' : ''}: ${qty} cans`;
        }).join('<br>')}
      </div>
    </div>
    
  </div>
</body>
</html>
`;

  const plainText = `
NEW ENERGX ORDER!
=================
Order ID: ${orderId}
Customer: ${data.name}
Email: ${data.email}
Phone: ${data.phone || 'N/A'}
Address: ${data.address}

Box: ${data.boxSize} cans
Total: $${data.total}
Payment: ${data.payment.toUpperCase()}
${(data.caffeinePreferences && data.caffeinePreferences !== 'None') ? `Caffeine Prefs: ${data.caffeinePreferences}
` : ''}${(data.flavorPreferences && data.flavorPreferences !== 'None') ? `Flavor Prefs: ${data.flavorPreferences}
` : ''}
Items: ${data.items}
`;

  GmailApp.sendEmail(CONFIG.ADMIN_EMAIL, subject, plainText, {
    htmlBody: htmlBody,
    name: 'Energx Orders'
  });
}

/**
 * TEST FUNCTION - Run this to test your setup!
 * Go to Run > testSetup
 */
function testSetup() {
  Logger.log('Testing Energx Order System...');
  
  // Test spreadsheet access
  let ss;
  try {
    if (CONFIG.SPREADSHEET_ID && CONFIG.SPREADSHEET_ID.length > 10) {
      ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
      Logger.log('✅ Spreadsheet found: ' + ss.getName());
    } else {
      ss = SpreadsheetApp.getActiveSpreadsheet();
      Logger.log('✅ Using active spreadsheet: ' + ss.getName());
    }
  } catch (e) {
    Logger.log('❌ Could not access spreadsheet: ' + e.message);
    return;
  }
  
  // Create test order
  const testData = {
    name: 'Test Customer',
    email: Session.getActiveUser().getEmail(), // Send to yourself
    phone: '555-123-4567',
    address: '123 Energy Street\nBoost City, EN 12345',
    payment: 'cash',
    caffeinePreferences: 'medium, high',
    flavorPreferences: 'citrus, tropical',
    boxSize: 12,
    total: 25,
    items: 'Monster: 4, Red Bull: 4, Celsius: 4',
    timestamp: new Date().toISOString()
  };
  
  // Save to sheet
  const orderId = saveOrder(testData);
  Logger.log('✅ Test order saved: ' + orderId);
  
  // Check if admin email is configured
  if (CONFIG.ADMIN_EMAIL === 'your-email@gmail.com') {
    Logger.log('⚠️ Update ADMIN_EMAIL in CONFIG to receive notifications!');
  } else {
    Logger.log('✅ Admin email configured: ' + CONFIG.ADMIN_EMAIL);
  }
  
  Logger.log('');
  Logger.log('🎉 Setup test complete! Check your spreadsheet for the test order.');
  Logger.log('📧 To test emails, update the email in testData and uncomment the email lines below.');
  
  // Uncomment these to test emails:
  // sendCustomerEmail(testData, orderId);
  // sendAdminEmail(testData, orderId);
}
