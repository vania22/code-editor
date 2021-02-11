import React, { useRef, useEffect } from 'react';
import './preview.css';

interface PreviewProps {
    code: string;
}

const Preview: React.FC<PreviewProps> = ({ code }) => {
    const iframe = useRef<any>();

    useEffect(() => {
        iframe.current.srcdoc = html;
        setTimeout(() => {
            iframe.current.contentWindow.postMessage(code, '*');
        }, 50);
    }, [code]);

    return (
        <div className="preview-wrapper">
            <iframe
                ref={iframe}
                title="code"
                srcDoc={html}
                sandbox="allow-scripts"
            />
        </div>
    );
};

const html = `
        <html>
            <head>
            </head>
            <body>
                <div id="root"></div>
                <script>
                    window.addEventListener('message', (e) => {
                        try {
                            eval(e.data)
                        } catch (e) {
                            const root = document.querySelector("#root");
                            let errorDiv = document.createElement("pre");
                            errorDiv.textContent = e;
                            errorDiv.style.color = "red";
                            root.appendChild(errorDiv);
                            
                            console.error(e);
                        }
                    }, false)
                </script>
            </body>
        </html>
    `;

export default Preview;
