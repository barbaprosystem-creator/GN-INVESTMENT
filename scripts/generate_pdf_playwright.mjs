import { chromium } from 'playwright-core';
import path from 'path';

(async () => {
    try {
        console.log('Launching Edge browser...');
        const browser = await chromium.launch({
            executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
            headless: true
        });
        const page = await browser.newPage();
        
        const htmlPath = 'file:///C:/TRABAJO/GN%20INVESTMENT/GN-INVESTMENT/factura_dame_la_letra.html';
        console.log(`Navigating to ${htmlPath}...`);
        await page.goto(htmlPath, { waitUntil: 'networkidle' });
        
        const pdfPath = 'C:\\TRABAJO\\GN INVESTMENT\\GN-INVESTMENT\\Factura_Dame_la_Letra.pdf';
        console.log(`Saving PDF to ${pdfPath}...`);
        await page.pdf({
            path: pdfPath,
            format: 'A4',
            printBackground: true,
            margin: {
                top: '20px',
                right: '20px',
                bottom: '20px',
                left: '20px'
            }
        });
        
        await browser.close();
        console.log('PDF generated successfully!');
    } catch (error) {
        console.error('Error generating PDF:', error);
    }
})();
