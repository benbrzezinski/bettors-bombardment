import { create } from "zustand";
import { persist } from "zustand/middleware";
import { LANGUAGES, type Language } from "@/constants";

interface State {
  lng: Language;
  setLng: (lng: Language) => void;
}

const useTranslation = create(
  persist<State>(
    set => ({
      lng: LANGUAGES[0],
      setLng: lng => set({ lng }),
    }),
    { name: "lng" }
  )
);

export default useTranslation;
