import React from 'react';
import styles from './CalculationBMF.module.css';
import { useKpa } from '../../context/KpaContext';

const CalculationBMF: React.FC = () => {
    const { propertyData } = useKpa();

    // 1. Bodenwert
    const bodenwert = propertyData.lotSize * propertyData.standardLandValue;

    // 2. Gebäudewert (Regelherstellungskosten)
    const rhkBase = propertyData.livingArea * propertyData.nhkBaseValue;
    const rhkIndexed = rhkBase * propertyData.constructionPriceIndex;

    // 3. Alterswertminderung
    const currentYear = new Date().getFullYear();
    const age = Math.max(0, currentYear - propertyData.buildYear);
    const awmFactor = Math.min(1, age / propertyData.totalUsefulLife);
    const awmAmount = rhkIndexed * awmFactor;

    // 4. Gebäudesachwert
    const gebaeudesachwert = rhkIndexed - awmAmount;

    // 5. Vorläufiger Sachwert
    const vorlaeufigerSachwert = bodenwert + gebaeudesachwert;

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>Berechnung Sachwert</h1>
                <p className={styles.subtitle}>Ermittlung des Sachwerts nach der BMF-Methode (NHK 2010).</p>
            </header>

            <div className={styles.card}>
                {/* Step 1: Bodenwert */}
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>1. Ermittlung des Bodenwerts</h2>

                    <div className={styles.calcRow}>
                        <div className={styles.calcLabel}>Grundstücksgröße</div>
                        <div className={styles.calcValue}>{propertyData.lotSize.toLocaleString('de-DE')} m²</div>
                    </div>

                    <div className={styles.calcRow}>
                        <div className={styles.calcLabel}>Bodenrichtwert</div>
                        <div className={styles.calcValue}>{propertyData.standardLandValue.toLocaleString('de-DE', { minimumFractionDigits: 2 })} €/m²</div>
                    </div>

                    <div className={styles.divider}></div>

                    <div className={`${styles.calcRow} ${styles.resultSubRow}`}>
                        <div className={styles.calcLabel}>Bodenwert</div>
                        <div className={styles.calcValue}>{bodenwert.toLocaleString('de-DE', { minimumFractionDigits: 2 })} €</div>
                    </div>
                </section>

                {/* Step 2: Gebäudewert */}
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>2. Ermittlung des Gebäudewerts</h2>

                    <div className={styles.calcRow}>
                        <div className={styles.calcLabel}>Wohn-/Nutzfläche</div>
                        <div className={styles.calcValue}>{propertyData.livingArea.toLocaleString('de-DE')} m²</div>
                    </div>

                    <div className={styles.calcRow}>
                        <div className={styles.calcLabel}>NHK 2010 Basiswert</div>
                        <div className={styles.calcValue}>{propertyData.nhkBaseValue.toLocaleString('de-DE', { minimumFractionDigits: 2 })} €/m²</div>
                    </div>

                    <div className={styles.calcRow}>
                        <div className={styles.calcLabel}>Baupreisindex (Faktor)</div>
                        <div className={styles.calcValue}>{propertyData.constructionPriceIndex.toLocaleString('de-DE', { minimumFractionDigits: 4 })}</div>
                    </div>

                    <div className={styles.calcRow}>
                        <div className={styles.calcLabel}>Wiederherstellungskosten (indiziert)</div>
                        <div className={styles.calcValue}>{rhkIndexed.toLocaleString('de-DE', { minimumFractionDigits: 2 })} €</div>
                    </div>

                    <div className={styles.divider}></div>

                    <div className={styles.calcRow}>
                        <div className={styles.calcLabel}>Alterswertminderung ({age} J. / {propertyData.totalUsefulLife} J.)</div>
                        <div className={styles.calcValue}>- {awmAmount.toLocaleString('de-DE', { minimumFractionDigits: 2 })} €</div>
                    </div>

                    <div className={`${styles.calcRow} ${styles.resultSubRow}`}>
                        <div className={styles.calcLabel}>Gebäudesachwert</div>
                        <div className={styles.calcValue}>{gebaeudesachwert.toLocaleString('de-DE', { minimumFractionDigits: 2 })} €</div>
                    </div>
                </section>

                {/* Final Result */}
                <section className={styles.finalSection}>
                    <div className={`${styles.calcRow} ${styles.totalRow}`}>
                        <div className={styles.calcLabel}>VORLÄUFIGER SACHWERT</div>
                        <div className={styles.calcValue}>{vorlaeufigerSachwert.toLocaleString('de-DE', { minimumFractionDigits: 2 })} €</div>
                    </div>
                </section>

                <section className={styles.infoBox}>
                    <div className={styles.infoIcon}>ℹ️</div>
                    <div className={styles.infoText}>
                        Dies ist der vorläufige Sachwert. Im nächsten Schritt erfolgt die Marktanpassung (Wertzahlen) sowie die Berücksichtigung besonderer objektspezifischer Grundstücksmerkmale (boG).
                    </div>
                </section>
            </div>
        </div>
    );
};

export default CalculationBMF;
