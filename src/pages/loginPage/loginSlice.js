import { createSlice } from '@reduxjs/toolkit'

// État initial du slice de réduction pour la gestion de l'authentification.
const initialState = {
  isLoading: false,    // Indique si une opération d'authentification est en cours.
  isAuth: false,       // Indique si l'utilisateur est authentifié.
  isRemember: false,   // Indique si l'utilisateur a choisi l'option "Se souvenir de moi".
  error: '',           // Stocke les éventuelles erreurs liées à l'authentification.
}

// Création du slice de réduction pour la gestion de l'authentification.
const loginSlice = createSlice({
  name: 'login',        // Nom du slice.
  initialState,         // État initial défini précédemment.
  reducers: {
    // Reducer pour indiquer le début d'une opération d'authentification.
    logingPending: (state) => {
      state.isLoading = true
    },
    // Reducer pour indiquer la réussite de l'authentification.
    logingSuccess: (state) => {
      state.isLoading = false
      state.isAuth = true
      state.error = ''    // Réinitialise toute erreur précédente.
    },
    // Reducer pour indiquer une erreur lors de l'authentification.
    logingError: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },
    // Reducer pour gérer le choix "Se souvenir de moi".
    logingRemember: (state, action) => {
      state.isRemember = action.payload
    },
    // Reducer pour déconnecter l'utilisateur.
    logingOut: (state) => {
      state.isAuth = false
    },
  },
})

// Extraction des actions et du réducteur à partir du slice créé.
const { actions, reducer } = loginSlice

// Extraction des actions spécifiques du slice.
export const {
  logingPending,
  logingSuccess,
  logingError,
  logingOut,
  logingRemember,
} = actions

// Export du réducteur pour être utilisé dans le store Redux.
export default reducer
