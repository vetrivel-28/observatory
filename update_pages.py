import os

pages_dir = 'src/pages'
pages = ['Projects.jsx', 'Skills.jsx', 'Achievements.jsx', 'Experience.jsx', 'Profiles.jsx', 'Contact.jsx']

for page in pages:
    path = os.path.join(pages_dir, page)
    if not os.path.exists(path):
        continue
    
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 1. Update imports
    content = content.replace("import React, { useState, useEffect, useRef } from 'react';", "import React, { useState, useEffect, useRef, useContext } from 'react';\nimport { NavigationContext } from '../App';")
    content = content.replace("import React, { useState, useEffect } from 'react';", "import React, { useState, useEffect, useContext } from 'react';\nimport { NavigationContext } from '../App';")
    content = content.replace("import { useState, useEffect } from 'react';", "import { useState, useEffect, useContext } from 'react';\nimport { NavigationContext } from '../App';")
    
    # 2. Update signature
    component_name = page.replace('.jsx', '')
    content = content.replace(f"export default function {component_name}({{ navigate }}) {{", f"export default function {component_name}() {{\n  const {{ navigate }} = useContext(NavigationContext);")
    content = content.replace(f"export default function {component_name}() {{", f"export default function {component_name}() {{\n  const {{ navigate }} = useContext(NavigationContext);")
    
    # fix double contexts if any
    content = content.replace("  const { navigate } = useContext(NavigationContext);\n  const { navigate } = useContext(NavigationContext);", "  const { navigate } = useContext(NavigationContext);")

    # 3. Handle specific replaces
    content = content.replace("onClick={() => navigate('Observatory')}", "onClick={() => navigate('/observatory')}")
    
    # Hide back button
    content = content.replace('className="clickable back-btn"', 'className="clickable back-btn" style={{display: "none"}}')
    
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

print('Updated component signatures.')
