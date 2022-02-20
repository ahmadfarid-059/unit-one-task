import { useEffect, useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import styles from "./style";

const Details = ({ itemId }) => {
  const [item, setItem] = useState({});
  const [errMessage, setErrMessage] = useState("");
  const [isLoaded, setIsLoaded] = useState(true);

  const fetchData = async () => {
    try {
      setIsLoaded(false);
      const { data } = await axios.get(`/api/v1/items/${itemId}`);
      if (!data) {
        return setErrMessage("Something Went Wrong!");
      }
      setItem(data);
      setErrMessage("");
      setIsLoaded(true);
    } catch (err) {
      setIsLoaded(true);
      setErrMessage("Something Went Wrong!");
      console.log(err);
    }
  };
  useEffect(() => {
    fetchData();
  }, [itemId]);
  if (!isLoaded) {
    return <Typography >Loading ...</Typography>;
  }
  if (errMessage) {
    return <Typography >{errMessage}</Typography>;
  }
  return (
    <Box component="main" sx={styles.main}>
      <Toolbar />
      <Typography paragraph>{item?.name}</Typography>
      <Typography paragraph>{item?.description}</Typography>
    </Box>
  );
};

export default Details;
