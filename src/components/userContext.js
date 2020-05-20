import React from 'react'

const UserContext = React.createContext({
    user: {
        type: 'Resident',
        id: ''
    }
});

export default UserContext