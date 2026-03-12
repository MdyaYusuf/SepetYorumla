import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { BasketResponseDto } from '../../models/Basket';

interface BasketState {
  items: BasketResponseDto[];
  currentBasket: BasketResponseDto | null;
  isLoading: boolean;
}

const initialState: BasketState = {
  items: [],
  currentBasket: null,
  isLoading: false,
};

const basketSlice = createSlice({
  name: 'baskets',
  initialState,
  reducers: {
    setBaskets: (state, action: PayloadAction<BasketResponseDto[]>) => {
      state.items = action.payload;
    },
    setCurrentBasket: (state, action: PayloadAction<BasketResponseDto | null>) => {
      state.currentBasket = action.payload;
    },
    toggleBasketSave: (state, action: PayloadAction<string>) => {
      const basketId = action.payload;

      const basketInList = state.items.find(b => b.id === basketId);

      if (basketInList) {
        basketInList.isSaved = !basketInList.isSaved;
      }

      if (state.currentBasket && state.currentBasket.id === basketId) {
        state.currentBasket.isSaved = !state.currentBasket.isSaved;
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    }
  },
});

export const { setBaskets, setCurrentBasket, toggleBasketSave, setLoading } = basketSlice.actions;
export default basketSlice.reducer;