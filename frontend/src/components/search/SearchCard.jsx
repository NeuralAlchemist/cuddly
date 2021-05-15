// NPM package
import { useRecoilValue } from "recoil";
import { Link } from "react-router-dom";

// Project files
import { allUsers } from "../../state/usersData";
import UserApi from "../../api/UserApi";
import Profile from "../../components/profile/Profile";

export default function SearchCard({ match }){
    // Global state
    const profile = useRecoilValue(allUsers);

    // Constants
    const query = match.params.query.toUpperCase();
    const filteredResults = profile.filter((item) =>
        item.sender.toUpperCase().match(query)
    );
}