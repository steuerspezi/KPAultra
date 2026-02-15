import React from 'react';
import styles from './PropertyDataForm.module.css';
import { useKpa } from '../../context/KpaContext';

const PROPERTY_TYPES = [
    "[EFH] freistehend, KG, EG, DG voll ausgebaut",
    "[EFH] freistehend, KG, EG, DG nicht ausgebaut",
    "[EFH] freistehend, KG, EG, Flachdach oder flach geneigtes Dach",
    "[EFH] freistehend, KG, EG, OG, DG voll ausgebaut",
    "[EFH] freistehend, KG, EG, OG, DG nicht ausgebaut",
    "[EFH] freistehend, KG, EG, OG, Flachdach oder flach geneigtes Dach",
    "[EFH] freistehend, EG, nicht unterkellert, DG voll ausgebaut",
    "[EFH] freistehend, EG, nicht unterkellert, DG nicht ausgebaut",
    "[EFH] freistehend, EG, nicht unterkellert, Flachdach oder flach geneigtes Dach",
    "[EFH] freistehend, EG, OG, nicht unterkellert, DG voll ausgebaut",
    "[EFH] freistehend, EG, OG, nicht unterkellert, DG nicht ausgebaut",
    "[EFH] freistehend, EG, OG, nicht unterkellert, Flachdach oder flach geneigtes Dach",
    "[ZFH] freistehend, KG, EG, DG voll ausgebaut",
    "[ZFH] freistehend, KG, EG, DG nicht ausgebaut",
    "[ZFH] freistehend, KG, EG, Flachdach oder flach geneigtes Dach",
    "[ZFH] freistehend, KG, EG, OG, DG voll ausgebaut",
    "[ZFH] freistehend, KG, EG, OG, DG nicht ausgebaut",
    "[ZFH] freistehend, KG, EG, OG, Flachdach oder flach geneigtes Dach",
    "[ZFH] freistehend, EG, nicht unterkellert, DG voll ausgebaut",
    "[ZFH] freistehend, EG, nicht unterkellert, DG nicht ausgebaut",
    "[ZFH] freistehend, EG, nicht unterkellert, Flachdach oder flach geneigtes Dach",
    "[ZFH] freistehend, EG, OG, nicht unterkellert, DG voll ausgebaut",
    "[ZFH] freistehend, EG, OG, nicht unterkellert, DG nicht ausgebaut",
    "[ZFH] freistehend, EG, OG, nicht unterkellert, Flachdach oder flach geneigtes Dach",
    "[EFH/ZFH] Doppel- und Reihenendh., KG, EG, DG voll ausgebaut",
    "[EFH/ZFH] Doppel- und Reihenendh., KG, EG, DG nicht ausgebaut",
    "[EFH/ZFH] Doppel- und Reihenendh., KG, EG, Flachdach oder flach geneigtes Dach",
    "[EFH/ZFH] Doppel- und Reihenendh., KG, EG, OG, DG voll ausgebaut",
    "[EFH/ZFH] Doppel- und Reihenendh., KG, EG, OG, DG nicht ausgebaut",
    "[EFH/ZFH] Doppel- und Reihenendh., KG, EG, OG, Flachdach oder flach geneigtes Dach",
    "[EFH/ZFH] Doppel- und Reihenendh., EG, nicht unterkellert, DG voll ausgebaut",
    "[EFH/ZFH] Doppel- und Reihenendh., EG, nicht unterkellert, DG nicht ausgebaut",
    "[EFH/ZFH] Doppel- und Reihenendh., EG, nicht unterkellert, Flachdach oder flach geneigtes Dach",
    "[EFH/ZFH] Doppel- und Reihenendh., EG, OG, nicht unterkellert, DG voll ausgebaut",
    "[EFH/ZFH] Doppel- und Reihenendh., EG, OG, nicht unterkellert, DG nicht ausgebaut",
    "[EFH/ZFH] Doppel- und Reihenendh., EG, OG, nicht unterkellert, Flachdach oder flach geneigtes Dach",
    "[EFH/ZFH] Reihenmittelh., KG, EG, DG voll ausgebaut",
    "[EFH/ZFH] Reihenmittelh., KG, EG, DG nicht ausgebaut",
    "[EFH/ZFH] Reihenmittelh., KG, EG, Flachdach oder flach geneigtes Dach",
    "[EFH/ZFH] Reihenmittelh., KG, EG, OG, DG voll ausgebaut",
    "[EFH/ZFH] Reihenmittelh., KG, EG, OG, DG nicht ausgebaut",
    "[EFH/ZFH] Reihenmittelh., KG, EG, OG, Flachdach oder flach geneigtes Dach",
    "[EFH/ZFH] Reihenmittelh., EG, nicht unterkellert, DG voll ausgebaut",
    "[EFH/ZFH] Reihenmittelh., EG, nicht unterkellert, DG nicht ausgebaut",
    "[EFH/ZFH] Reihenmittelh., EG, nicht unterkellert, Flachdach oder flach geneigtes Dach",
    "[EFH/ZFH] Reihenmittelh., EG, OG, nicht unterkellert, DG voll ausgebaut",
    "[EFH/ZFH] Reihenmittelh., EG, OG, nicht unterkellert, DG nicht ausgebaut",
    "[EFH/ZFH] Reihenmittelh., EG, OG, nicht unterkellert, Flachdach oder flach geneigtes Dach",
    "Mietwohngrundstücke (Mehrfamilienhäuser)",
    "Wohnungseigentum [WE]",
    "Teileigentum: Mietwohngrundstücke (Mehrfamilienhäuser)",
    "Ein- und Zweifamilienhäuser [EFH/ZFH] (ohne weitere Angaben)",
    "gemischt genutzte Grundstücke, Wohnhäuser mit Mischnutzung (gewerbl. Anteil < 50%)",
    "gemischt genutzte Grundstücke, Wohnhäuser mit Mischnutzung (gewerbl. Anteil > 50%)",
    "Geschäftsgrundstücke, Geschäftshäuser",
    "Geschäftsgrundstücke, Bürogebäude",
    "Geschäftsgrundstücke für gewerbliche Nutzung (z. B. SB-Verbrauchermärkte)",
    "Geschäftsgrundstücke für gewerbliche Nutzung (z. B. Lager-, Logistik- und Produktionshallen)",
    "Teileigentum: gemischt genutzte Grundstücke (gewerbl. Anteil < 50%)",
    "Teileigentum: gemischt genutzte Grundstücke (gewerbl. Anteil > 50%)",
    "Teileigentum: Geschäftsgrundstücke (Bürog.)",
    "Teileigentum: Geschäftsgrundstücke (Geschäfts.)"
];

const PropertyDataForm: React.FC = () => {
    const { propertyData, setPropertyData } = useKpa();

    const handleInputChange = (field: string, value: string | number) => {
        setPropertyData({ [field]: value });
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>Grundstücksdaten erfassen</h1>
                <p className={styles.subtitle}>Bitte geben Sie die Basisdaten des Grundstücks ein.</p>
            </header>

            <div className={styles.card}>
                <div className={styles.formSection}>
                    <h2 className={styles.sectionTitle}>Basisdaten</h2>

                    <div className={styles.formGroup}>
                        <label htmlFor="address" className={styles.label}>1. Lage des Grundstücks</label>
                        <textarea
                            id="address"
                            className={styles.textarea}
                            placeholder="Vollständige Adresse eingeben..."
                            rows={2}
                            value={propertyData.address}
                            onChange={(e) => handleInputChange('address', e.target.value)}
                        ></textarea>
                        <small className={styles.helpText}>Geben Sie Straße, Hausnummer, PLZ und Ort an.</small>
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="propertyType" className={styles.label}>2. Grundstücksart</label>
                        <select
                            id="propertyType"
                            className={styles.select}
                            value={propertyData.propertyType}
                            onChange={(e) => handleInputChange('propertyType', e.target.value)}
                        >
                            <option value="">Bitte wählen...</option>
                            {PROPERTY_TYPES.map((type, index) => (
                                <option key={index} value={type}>
                                    {type}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className={styles.formSection}>
                    <h2 className={styles.sectionTitle}>Kauf & Baujahr</h2>
                    <div className={styles.grid}>
                        <div className={styles.formGroup}>
                            <label htmlFor="purchaseDate" className={styles.label}>Datum des Kaufvertrages</label>
                            <input
                                type="date"
                                id="purchaseDate"
                                className={styles.input}
                                value={propertyData.purchaseDate}
                                onChange={(e) => handleInputChange('purchaseDate', e.target.value)}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="purchasePrice" className={styles.label}>Kaufpreis inkl. Nebenkosten</label>
                            <div className={styles.inputWrapper}>
                                <input
                                    type="number"
                                    id="purchasePrice"
                                    className={styles.input}
                                    placeholder="0,00"
                                    value={propertyData.purchasePrice}
                                    onChange={(e) => handleInputChange('purchasePrice', parseFloat(e.target.value) || 0)}
                                />
                                <span className={styles.unit}>€</span>
                            </div>
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="buildYear" className={styles.label}>Ursprüngliches Baujahr</label>
                            <input
                                type="number"
                                id="buildYear"
                                className={styles.input}
                                placeholder="YYYY"
                                min="1800"
                                max="2100"
                                value={propertyData.buildYear}
                                onChange={(e) => handleInputChange('buildYear', parseInt(e.target.value) || 0)}
                            />
                        </div>
                    </div>
                </div>

                <div className={styles.formSection}>
                    <h2 className={styles.sectionTitle}>Flächen & Werte</h2>
                    <div className={styles.grid}>
                        <div className={styles.formGroup}>
                            <label htmlFor="livingArea" className={styles.label}>Wohn- bzw. Nutzfläche</label>
                            <div className={styles.inputWrapper}>
                                <input
                                    type="number"
                                    id="livingArea"
                                    className={styles.input}
                                    placeholder="0,00"
                                    value={propertyData.livingArea}
                                    onChange={(e) => handleInputChange('livingArea', parseFloat(e.target.value) || 0)}
                                />
                                <span className={styles.unit}>m²</span>
                            </div>
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="lotSize" className={styles.label}>Fläche 1: Grundstücksgröße</label>
                            <div className={styles.inputWrapper}>
                                <input
                                    type="number"
                                    id="lotSize"
                                    className={styles.input}
                                    placeholder="0"
                                    value={propertyData.lotSize}
                                    onChange={(e) => handleInputChange('lotSize', parseFloat(e.target.value) || 0)}
                                />
                                <span className={styles.unit}>m²</span>
                            </div>
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="standardLandValue" className={styles.label}>Bodenrichtwert</label>
                            <div className={styles.inputWrapper}>
                                <input
                                    type="number"
                                    id="standardLandValue"
                                    className={styles.input}
                                    placeholder="0,00"
                                    value={propertyData.standardLandValue}
                                    onChange={(e) => handleInputChange('standardLandValue', parseFloat(e.target.value) || 0)}
                                />
                                <span className={styles.unit}>€/m²</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.formSection}>
                    <h2 className={styles.sectionTitle}>Stellplätze</h2>
                    <div className={styles.grid}>
                        <div className={styles.formGroup}>
                            <label htmlFor="garageSpots" className={styles.label}>Anzahl Garagenplätze</label>
                            <input
                                type="number"
                                id="garageSpots"
                                className={styles.input}
                                value={propertyData.garageSpots}
                                onChange={(e) => handleInputChange('garageSpots', parseInt(e.target.value) || 0)}
                                min="0"
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="parkingSpots" className={styles.label}>Anzahl Tiefgaragenplätze</label>
                            <input
                                type="number"
                                id="parkingSpots"
                                className={styles.input}
                                value={propertyData.parkingSpots}
                                onChange={(e) => handleInputChange('parkingSpots', parseInt(e.target.value) || 0)}
                                min="0"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertyDataForm;
