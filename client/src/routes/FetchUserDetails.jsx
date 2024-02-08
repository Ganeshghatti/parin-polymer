import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { saveuserDetails } from "../features/UserDetails";
import axios from "axios";

const FetchUserDetails = () => {
//   const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserDetails = async () => {
      const storedUserDataJSON = localStorage.getItem("user");
      const storedUserData = JSON.parse(storedUserDataJSON);
      console.log(storedUserData);

      try {
        if (storedUserData && storedUserData.email) {
          const response = await axios.get(
            `https://parin-polymer-server.vercel.app/user/account/${storedUserData.email}`,
            {
              headers: {
                Authorization: `Bearer ${storedUserData.token}`,
              },
            }
          );
          localStorage.setItem(
            "userDetails",
            JSON.stringify(response.data.user)
          );
        //   dispatch(
        //     saveuserDetails({
        //       email: response.data.user.email,
        //       token: response.data.user.token,
        //       username: response.data.user.username,
        //       phone: response.data.user.phone,
        //       primary_address: response.data.user.primary_address,
        //       secondary_address: response.data.user.secondary_address,
        //       pincode: response.data.user.pincode,
        //     })
        //   );
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchUserDetails();
  }, []);
};

export default FetchUserDetails;
