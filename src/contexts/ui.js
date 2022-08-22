import { createContext, useContext, useMemo, useReducer } from 'react';
import { logError } from 'utils/logger';

export const ModalView = {
  ACCOUNT_DETAILS: 'accountDetails',
  CREATE_ACCOUNT: 'createAccount',
  IMPORT_ACCOUNT: 'importAccount',
  ADD_VAULT: 'addVault',
  CREATE_VAULT: 'createVault',
};

const initialState = {
  modalView: '',
  isModalOpen: false,
  modalData: null,
};

export const UIContext = createContext(initialState);
UIContext.displayName = 'UIContext';

const Action = {
  SET_MODAL_VIEW: 'SET_MODAL_VIEW',
  OPEN_MODAL: 'OPEN_MODAL',
  CLOSE_MODAL: 'CLOSE_MODAL',
  SET_MODAL_DATA: 'SET_MODAL_DATA',
};

const reducer = (state, action) => {
  switch (action.type) {
    case Action.SET_MODAL_VIEW:
      return { ...state, modalView: action.view };
    case Action.OPEN_MODAL:
      return { ...state, isModalOpen: true };
    case Action.CLOSE_MODAL:
      return { ...state, isModalOpen: false };
    case Action.SET_MODAL_DATA:
      return { ...state, modalData: action.data };
    default:
      logError(`UIProvider: unknown action: ${action.type}`);
      return state;
  }
};

export const UIProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const openModal = () => dispatch({ type: Action.OPEN_MODAL });
  const closeModal = () => dispatch({ type: Action.CLOSE_MODAL });
  const setModalView = view => dispatch({ type: Action.SET_MODAL_VIEW, view });
  const setModalData = data => {
    dispatch({ type: Action.SET_MODAL_DATA, data });
  };
  const setModalViewAndOpen = view => {
    setModalView(view);
    openModal();
  };

  const value = useMemo(
    () => ({
      ...state,
      openModal,
      closeModal,
      setModalView,
      setModalData,
      setModalViewAndOpen,
    }),
    [state]
  );

  return <UIContext.Provider value={value} {...props} />;
};

export const useUI = () => {
  const context = useContext(UIContext);
  if (context === undefined) {
    throw new Error(`useUI must be used within a UIProvider`);
  }
  return context;
};
