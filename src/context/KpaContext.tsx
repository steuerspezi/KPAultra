import React, { createContext, useContext, useState, type ReactNode } from 'react';

export interface PropertyData {
    address: string;
    propertyType: string;
    purchaseDate: string;
    purchasePrice: number;
    buildYear: number;
    livingArea: number;
    lotSize: number;
    standardLandValue: number;
    garageSpots: number;
    parkingSpots: number;
    // Calculation fields Phase 3
    nhkBaseValue: number;
    constructionPriceIndex: number;
    totalUsefulLife: number; // GND (Gesamtnutzungsdauer)
}

interface KpaContextType {
    propertyData: PropertyData;
    setPropertyData: (data: Partial<PropertyData>) => void;
    currentPage: string;
    setCurrentPage: (page: string) => void;
}

const defaultData: PropertyData = {
    address: "Musterstraße 12, 21614 Buxtehude",
    propertyType: "[EFH] freistehend, KG, EG, DG voll ausgebaut",
    purchaseDate: "2024-02-01",
    purchasePrice: 450000,
    buildYear: 1995,
    livingArea: 160,
    lotSize: 650,
    standardLandValue: 280,
    garageSpots: 1,
    parkingSpots: 0,
    nhkBaseValue: 845, // Example NHK 2010 base value
    constructionPriceIndex: 1.56, // Example Index
    totalUsefulLife: 70, // GND (Residential)
};

const KpaContext = createContext<KpaContextType | undefined>(undefined);

export const KpaProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [propertyData, setPropertyDataState] = useState<PropertyData>(defaultData);
    const [currentPage, setCurrentPage] = useState('grundstueck');

    const setPropertyData = (newData: Partial<PropertyData>) => {
        setPropertyDataState(prev => ({ ...prev, ...newData }));
    };

    return (
        <KpaContext.Provider value={{ propertyData, setPropertyData, currentPage, setCurrentPage }}>
            {children}
        </KpaContext.Provider>
    );
};

export const useKpa = () => {
    const context = useContext(KpaContext);
    if (!context) {
        throw new Error('useKpa must be used within a KpaProvider');
    }
    return context;
};
