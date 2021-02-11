import React, { useEffect, useState } from 'react';
import { ResizableBox, ResizableBoxProps } from 'react-resizable';

import './resizable.css';

interface ResizableProps {
    direction: 'horizontal' | 'vertical';
}

const Resizable: React.FC<ResizableProps> = ({
    direction,
    children,
}): React.ReactElement => {
    const [innerHeight, setInnerHeight] = useState(window.innerHeight);
    const [innerWidth, setInnerWidth] = useState(window.innerWidth);
    const [width, setWidth] = useState(window.innerWidth * 0.75);
    let resizableProps: ResizableBoxProps;

    useEffect(() => {
        let timer: any;

        const listener = () => {
            if (timer) {
                clearTimeout(timer);
            }

            timer = setTimeout(() => {
                setInnerHeight(window.innerHeight);
                setInnerWidth(window.innerWidth);

                if (window.innerWidth * 0.75 < width) {
                    setWidth(window.innerWidth * 0.75);
                }
            }, 100);
        };

        window.addEventListener('resize', listener);

        return () => window.removeEventListener('resize', listener);
    }, []);

    if (direction === 'vertical') {
        resizableProps = {
            height: 300,
            width: Infinity,
            resizeHandles: ['s'],
            maxConstraints: [Infinity, innerHeight * 0.9],
            minConstraints: [Infinity, 24],
        };
    } else {
        resizableProps = {
            width,
            height: Infinity,
            resizeHandles: ['e'],
            maxConstraints: [innerWidth * 0.75, Infinity],
            minConstraints: [innerWidth * 0.2, Infinity],
            className: 'resize-horizontal',
            onResizeStop: (event, data) => {
                setWidth(data.size.width);
            },
        };
    }

    return <ResizableBox {...resizableProps}>{children}</ResizableBox>;
};

export default Resizable;
