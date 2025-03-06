import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import {ThemeProvider} from "./components/ThemeProvider.tsx";
import {MedicalSupplyPlanner} from "./components/medicalSupplyPlanner.tsx";

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <ThemeProvider defaultTheme="light" storageKey="medical-supply-theme">
                <MedicalSupplyPlanner />
            </ThemeProvider>
        </Provider>
    );
};

export default App;
