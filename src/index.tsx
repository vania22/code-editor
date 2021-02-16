import { render } from 'react-dom';
import 'bulmaswatch/superhero/bulmaswatch.min.css';

import TextEditor from './components/text-editor';

const App = () => {
    return (
        <div>
            <TextEditor />
        </div>
    );
};

render(<App />, document.querySelector('#root'));
