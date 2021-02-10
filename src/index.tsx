import ReactDOM from 'react-dom';
import { useState } from 'react';
import 'bulmaswatch/superhero/bulmaswatch.min.css';

import CodeCell from './components/code-cell';

const App = () => {
    // const [_, __] = useState('');

    return (
        <div>
            <CodeCell />
        </div>
    );
};

ReactDOM.render(<App />, document.querySelector('#root'));
