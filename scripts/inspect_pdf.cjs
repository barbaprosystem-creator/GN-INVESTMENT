const fs = require('fs');

try {
  const buf = fs.readFileSync('C:\\TRABAJO\\barba construction\\Factura_Barba_Construction.pdf');
  const str = buf.toString('latin1');
  
  // Extract all text in parentheses or stream text
  const textMatches = str.match(/\(([^)]+)\)/g) || [];
  const cleanTexts = textMatches.map(t => t.slice(1, -1));
  
  fs.writeFileSync('C:\\TRABAJO\\GN INVESTMENT\\GN-INVESTMENT\\scripts\\extracted_invoice.txt', 
    'RAW LENGTH: ' + buf.length + '\n\n' +
    'TEXTS FOUND:\n' + cleanTexts.join('\n') + '\n\n' +
    'RAW SNIPPET:\n' + str.substring(0, 3000)
  );
  console.log('Inspection complete.');
} catch (e) {
  fs.writeFileSync('C:\\TRABAJO\\GN INVESTMENT\\GN-INVESTMENT\\scripts\\extracted_invoice.txt', 'Error: ' + e.message);
}
