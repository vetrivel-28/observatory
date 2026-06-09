const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src');

const replacements = [
  { old: /#080c14/gi, new: '#050911' },
  { old: /#0a0e1a/gi, new: '#050911' }, // index.css bg
  { old: /#0d1b2a/gi, new: '#0a1628' },
  { old: /#0f1929/gi, new: '#0a1628' },
  { old: /#111827/gi, new: '#0a1628' }, // index.css card
  { old: /#1a2235/gi, new: '#1a2332' }, // index.css card hover -> new terminal header
  { old: /#06b6d4/gi, new: '#00d4ff' },
  { old: /#00e5ff/gi, new: '#00d4ff' }, // index.css accent
  { old: /#7c3aed/gi, new: '#a855f7' },
  { old: /#f59e0b/gi, new: '#fbbf24' },
  { old: /#94a3b8/gi, new: '#8892a4' },
  { old: /#64748b/gi, new: '#4a5568' },
  { old: /#f1f5f9/gi, new: '#e8eef5' },
  { old: /#e2e8f0/gi, new: '#e8eef5' }, // index.css text
  { old: /#374151/gi, new: '#4a5568' }  // index.css text-muted
];

function processDirectory(dirPath) {
  const files = fs.readdirSync(dirPath);

  files.forEach(file => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.css')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let originalContent = content;
      
      replacements.forEach(r => {
        content = content.replace(r.old, r.new);
      });

      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated colors in ${fullPath}`);
      }
    }
  });
}

processDirectory(directoryPath);
console.log('Global color replacement complete.');
