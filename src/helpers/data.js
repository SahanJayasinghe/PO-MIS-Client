// export const house_number_pattern = '^(?=.*[A-Za-z0-9])[A-Za-z\d\-/,\\]{1,50}$';

// export const word_pattern = '^(?=.*[A-Za-z0-9])[A-Za-z\d\-/()\\.,\s]{1,50}$';

// export const name_pattern = '^(?=.*[A-Za-z])[A-Za-z\-,.\s]{1,50}$';

export const server_baseURL = (process.env.REACT_APP_PO_MIS_SERVER) ? process.env.REACT_APP_PO_MIS_SERVER : 'http://localhost:5000';