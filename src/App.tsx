import './styles/variables.css';
import { useKpa } from './context/KpaContext';
import Sidebar from './components/Layout/Sidebar';
import PropertyDataForm from './pages/PropertyData/PropertyDataForm';
import BuildingDataForm from './pages/BuildingData/BuildingDataForm';
import CalculationBMF from './pages/CalculationBMF/CalculationBMF';

function App() {
  const { currentPage } = useKpa();

  return (
    <>
      <Sidebar />
      <main style={{ flex: 1, display: 'flex' }}>
        {currentPage === 'grundstueck' && <PropertyDataForm />}
        {currentPage === 'gebaeude' && <BuildingDataForm />}
        {currentPage === 'berechnung' && <CalculationBMF />}
      </main>
    </>
  );
}

export default App;
