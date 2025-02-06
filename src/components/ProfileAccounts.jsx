import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  profileChecking,
  profileSaving,
  profileCredit,
} from '../pages/profilePage/profileSlice'

function ProfileAccounts() {
  const dispatch = useDispatch()

  // Récupération des valeurs depuis localStorage et conversion en nombre
  const localStorageChecking = parseFloat(localStorage.getItem('checking'))
  const localStorageSaving = parseFloat(localStorage.getItem('saving'))
  const localStorageCredit = parseFloat(localStorage.getItem('credit'))

  // Récupération des valeurs des comptes depuis Redux
  const { checking, saving, credit } = useSelector((state) => state.profile);

  useEffect(() => {
    // Si les valeurs sont dans localStorage, on les dispatch dans Redux
    if (localStorageChecking) {
      console.log("Dispatch checking:", localStorageChecking); // Vérifier la valeur avant dispatch
      dispatch(profileChecking(localStorageChecking));
    }
    if (localStorageSaving) {
      console.log("Dispatch saving:", localStorageSaving); // Vérifier la valeur avant dispatch
      dispatch(profileSaving(localStorageSaving));
    }
    if (localStorageCredit) {
      console.log("Dispatch credit:", localStorageCredit); // Vérifier la valeur avant dispatch
      dispatch(profileCredit(localStorageCredit));
    }
  }, [dispatch, localStorageChecking, localStorageSaving, localStorageCredit]);
  
  return (
    <>
      <h2 className="sr-only">Accounts</h2>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Checking (x8349)</h3>
          <p className="account-amount">{`$${checking}`}</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Savings (x6712)</h3>
          <p className="account-amount">{`$${saving}`}</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Credit Card (x1727)</h3>
          <p className="account-amount">{`$${credit}`}</p>
          <p className="account-amount-description">Current Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
    </>
  )
}

export default ProfileAccounts
