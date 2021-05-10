// NPM packages
import React, { useEffect } from "react";
import { useRecoilState} from "recoil";

// Project files
import UserApi from "../../api/UserApi";
import { userState } from "../../state/userData";

export default function ProfileCard() {
  // Global state
  const [thisUser, setThisUser] = useRecoilState(userState);
  console.log(thisUser);

  // Local state
  //const [currentUser, setCurrentUser] = useState({});

  // Methods
  useEffect(() => {
    UserApi.getUser()
      .then((response) => {
        response.json()
      })
      .then((json) => setThisUser(json))
      .catch((err) => console.error(err));
  }, [setThisUser]);

  return (
    <div className="ProfileCard">
      <h2>Your information</h2>
      <div className="name-pair">
        <p>Name</p>
        <p>{thisUser.name}</p>
      </div>
      <div className="email-pair">
        <p>Email</p>
        <p>{thisUser.email}</p>
      </div>
      {/* <div className="description-pair">
        <p>About</p>
        {thisUser.description === null && (
          <p>
            Let us know who you are! Add a short description to your profile
          </p>
        )}
        {thisUser.description != null && <p>{thisUser.description}</p>}
      </div> */}
    </div>
  );
}
