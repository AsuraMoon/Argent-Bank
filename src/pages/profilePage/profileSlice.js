import { createSlice } from '@reduxjs/toolkit'

// État initial du slice de réduction pour la gestion du profil utilisateur.
const initialState = {
  isLoading: false,    // Indique si une opération liée au profil est en cours.
  firstName: '',       // Prénom de l'utilisateur.
  lastName: '',        // Nom de l'utilisateur.
  error: '',           // Stocke les éventuelles erreurs liées au profil.
}

// Création du slice de réduction pour la gestion du profil utilisateur.
const profileSlice = createSlice({
  name: 'profile',      // Nom du slice.
  initialState,         // État initial défini précédemment.
  reducers: {
    // Reducer pour indiquer le début d'une opération liée au profil.
    profilePending: (state) => {
      state.isLoading = true
    },
    // Reducer pour mettre à jour le prénom dans l'état du profil.
    profileFirstName: (state, action) => {
      state.isLoading = false
      state.firstName = action.payload
      state.error = ''    // Réinitialise toute erreur précédente.
    },
    // Reducer pour mettre à jour le nom de famille dans l'état du profil.
    profileLastName: (state, action) => {
      state.isLoading = false
      state.lastName = action.payload
      state.error = ''    // Réinitialise toute erreur précédente.
    },
    // Reducer pour indiquer une erreur liée au profil.
    profileError: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },
    // Reducer pour déconnecter l'utilisateur et réinitialiser les informations du profil.
    profileOut: (state) => {
      state.isLoading = false
      state.firstName = ''
      state.lastName = ''
      state.error = ''
    },
  },
})

// Extraction des actions et du réducteur à partir du slice créé.
const { actions, reducer } = profileSlice

// Extraction des actions spécifiques du slice.
export const {
  profilePending,
  profileFirstName,
  profileLastName,
  profileError,
  profileOut,
} = actions

// Export du réducteur pour être utilisé dans le store Redux.
export default reducer
