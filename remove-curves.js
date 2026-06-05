const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

walkDir('./app/components', function(filePath) {
    if (filePath.endsWith('.tsx')) {
        let content = fs.readFileSync(filePath, 'utf8');
        let modified = false;
        
        // Split into lines
        let lines = content.split('\n');
        for (let i = 0; i < lines.length; i++) {
            let line = lines[i];
            // Check if it's an image container (Link or div with overflow-hidden and aspect or bg-gray-100)
            if ((line.includes('<Link') || line.includes('<div')) && line.includes('overflow-hidden')) {
                // remove rounded-* classes
                let newLine = line.replace(/rounded-(xl|2xl|lg|md|sm|full)/g, 'rounded-none');
                if (line !== newLine) {
                    lines[i] = newLine;
                    modified = true;
                }
            }
        }
        
        if (modified) {
            fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
            console.log('Updated', filePath);
        }
    }
});
