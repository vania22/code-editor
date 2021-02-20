import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './state';

import 'bulmaswatch/superhero/bulmaswatch.min.css';

import CellList from './components/cell-list';

const App = () => {
    return (
        <Provider store={store}>
            <div>
                <CellList />
            </div>
        </Provider>
    );
};

render(<App />, document.querySelector('#root'));
