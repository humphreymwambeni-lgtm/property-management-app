import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Property {
  id: number;
  ownerId: number;
  title: string;
  description: string;
  propertyType: string;
  price: number;
  location: string;
  images: string[];
  availability: boolean;
  createdAt: string;
}

interface PropertyState {
  properties: Property[];
  selectedProperty: Property | null;
  loading: boolean;
  error: string | null;
}

const initialState: PropertyState = {
  properties: [],
  selectedProperty: null,
  loading: false,
  error: null,
};

const propertySlice = createSlice({
  name: 'property',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setProperties: (state, action: PayloadAction<Property[]>) => {
      state.properties = action.payload;
    },
    setSelectedProperty: (state, action: PayloadAction<Property | null>) => {
      state.selectedProperty = action.payload;
    },
    addProperty: (state, action: PayloadAction<Property>) => {
      state.properties.push(action.payload);
    },
    updateProperty: (state, action: PayloadAction<Property>) => {
      const index = state.properties.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.properties[index] = action.payload;
      }
    },
    removeProperty: (state, action: PayloadAction<number>) => {
      state.properties = state.properties.filter((p) => p.id !== action.payload);
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setLoading,
  setProperties,
  setSelectedProperty,
  addProperty,
  updateProperty,
  removeProperty,
  setError,
  clearError,
} = propertySlice.actions;

export default propertySlice.reducer;
