import React, {useEffect} from 'react';
import axios from 'axios';

const UserList = () => {
    useEffect(() => {
        axios
            .get(`http://localhost:5001/api/users`)
            .then(res => {
                console.log(res)
            })
            .catch(err => console.log("There was an error", err))
    })

    return(
        <div></div>
    )
}

export default UserList;