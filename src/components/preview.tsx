import React, { useRef, useEffect } from 'react';
import './preview.css';

interface PreviewProps {
    code: string;
    error: string;
}

const Preview: React.FC<PreviewProps> = ({ code, error }) => {
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
            {error && <pre className="preview-error">{error}</pre>}
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
                    const handleError = (e) => {
                            const root = document.querySelector("#root");
                            let errorDiv = document.createElement("pre");
                            errorDiv.textContent = e;
                            errorDiv.style.color = "red";
                            root.appendChild(errorDiv);
                            
                            console.error(e);
                        }
                        
                    window.addEventListener('error', (e) => {
                        e.preventDefault()
                        handleError(e.error)
                    });


                    window.addEventListener('message', (e) => {
                        try {
                            eval(e.data)
                        } catch (e) {
                            handleError(e)
                        }
                    }, false)
                </script>
            </body>
        </html>
    `;

export default Preview;
