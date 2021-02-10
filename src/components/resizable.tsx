import React from 'react';
import { ResizableBox, ResizableBoxProps } from 'react-resizable';

import './resizable.css';

interface ResizableProps {
    direction: 'horizontal' | 'vertical';
}

const Resizable: React.FC<ResizableProps> = ({
    direction,
    children,
}): React.ReactElement => {
    let resizableProps: ResizableBoxProps;

    if (direction === 'vertical') {
        resizableProps = {
            height: 300,
            width: Infinity,
            resizeHandles: ['s'],
            maxConstraints: [Infinity, window.innerHeight * 0.9],
            minConstraints: [Infinity, 24],
        };
    } else {
        resizableProps = {
            height: Infinity,
            width: window.innerWidth * 0.75,
            resizeHandles: ['e'],
            maxConstraints: [window.innerWidth * 0.75, Infinity],
            minConstraints: [window.innerWidth * 0.2, Infinity],
            className: 'resize-horizontal',
        };
    }

    return <ResizableBox {...resizableProps}>{children}</ResizableBox>;
};

export default Resizable;
