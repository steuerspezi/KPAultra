import React from 'react';
import styles from './BuildingDataForm.module.css';
import { useKpa } from '../../context/KpaContext';

const BuildingDataForm: React.FC = () => {
    const { propertyData, setPropertyData } = useKpa();

    const handleInputChange = (field: string, value: string | number) => {
        setPropertyData({ [field]: value });
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>Gebäudedaten erfassen</h1>
                <p className={styles.subtitle}>Geben Sie hier die spezifischen Daten für die Wertermittlung des Gebäudes ein.</p>
            </header>

            <div className={styles.card}>
                <div className={styles.formSection}>
                    <h2 className={styles.sectionTitle}>Normalherstellungskosten (NHK 2010)</h2>
                    <div className={styles.grid}>
                        <div className={styles.formGroup}>
                            <label htmlFor="nhkBaseValue" className={styles.label}>NHK 2010 Basiswert</label>
                            <div className={styles.inputWrapper}>
                                <input
                                    type="number"
                                    id="nhkBaseValue"
                                    className={styles.input}
                                    placeholder="0,00"
                                    value={propertyData.nhkBaseValue}
                                    onChange={(e) => handleInputChange('nhkBaseValue', parseFloat(e.target.value) || 0)}
                                />
                                <span className={styles.unit}>€/m²</span>
                            </div>
                            <small className={styles.helpText}>Basiswert nach Anlage 1 zum BMF-Schreiben.</small>
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="constructionPriceIndex" className={styles.label}>Baupreisindex</label>
                            <div className={styles.inputWrapper}>
                                <input
                                    type="number"
                                    id="constructionPriceIndex"
                                    className={styles.input}
                                    placeholder="1,00"
                                    step="0.01"
                                    value={propertyData.constructionPriceIndex}
                                    onChange={(e) => handleInputChange('constructionPriceIndex', parseFloat(e.target.value) || 0)}
                                />
                                <span className={styles.unit}>Faktor</span>
                            </div>
                            <small className={styles.helpText}>Anpassung an das Preisniveau zum Stichtag.</small>
                        </div>
                    </div>
                </div>

                <div className={styles.formSection}>
                    <h2 className={styles.sectionTitle}>Nutzungsdauer & Alter</h2>
                    <div className={styles.grid}>
                        <div className={styles.formGroup}>
                            <label htmlFor="totalUsefulLife" className={styles.label}>Gesamtnutzungsdauer (GND)</label>
                            <div className={styles.inputWrapper}>
                                <input
                                    type="number"
                                    id="totalUsefulLife"
                                    className={styles.input}
                                    value={propertyData.totalUsefulLife}
                                    onChange={(e) => handleInputChange('totalUsefulLife', parseInt(e.target.value) || 0)}
                                />
                                <span className={styles.unit}>Jahre</span>
                            </div>
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Derzeitiges Alter (info)</label>
                            <div className={styles.infoField}>
                                {new Date().getFullYear() - propertyData.buildYear} Jahre
                            </div>
                            <small className={styles.helpText}>Berechnet aus Baujahr {propertyData.buildYear}.</small>
                        </div>
                    </div>
                </div>

                <div className={styles.infoBox}>
                    <div className={styles.infoIcon}>💡</div>
                    <div className={styles.infoText}>
                        Die hier eingegebenen Werte fließen direkt in die "Berechnung Sachwert" ein. Die NHK-Werte können Sie den offiziellen Tabellen des BMF entnehmen.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BuildingDataForm;
