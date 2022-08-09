import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import "./style.scss"
import { User } from "../../type/User/User";


const UserList = () => {
    const {userList} = useTypedSelector(state => {
        return {userList: state.rootReducer.userList.userList}
    })

    const [value, setValue] = useState("")

    const filteredItems = userList.filter((item) => {
        return item.firstName.toLowerCase().includes(value.toLowerCase()) || item.lastName.toLowerCase().includes(value.toLowerCase())
    })

    return <section className="userList">
        <div className="userList-controls">
            <form className="search_form">
                <input
                    type="text"
                    onChange={(event => setValue(event.target.value))}
                    placeholder="Search..."
                />
                <FontAwesomeIcon icon={faMagnifyingGlass} className={"icon"}/>
            </form>

            <div className="userList-controls-group">
                <div className="filter">

                </div>

                <Link className="link-btn addUser" to=" ">Add</Link>
            </div>
        </div>


        <div className="userList-list">
            {filteredItems.map(
                (item: User,id) =>
                    <Link key={id} className="link-btn userItem" to={""}>
                        <ul>{item.firstName} {item.lastName}</ul>
                    </Link>
            )}
        </div>

    </section>
}

export default UserList