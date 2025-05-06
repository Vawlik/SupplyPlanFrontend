import React from 'react';
import {Provider} from 'react-redux';
import {store} from './store';
import {ThemeProvider} from "./components/ThemeProvider.tsx";
import {AppRouter} from "./components/AppRouter.tsx";

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <ThemeProvider defaultTheme="light" storageKey="medical-supply-theme">
                <AppRouter/>
            </ThemeProvider>
        </Provider>
    );
};

export default App;
