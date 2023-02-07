import {
  Box,
  FormControl,
  Grid,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { RiSearch2Line } from "react-icons/ri";

import ApiCard from "./ApiCard";
import ApiNotFound from "./ApiNotFound";
import { ApiProps } from "../../interfaces";
import { useStyles } from "./HubApis.styles";
import CustomTypography from "../shared/CustomTypography";
import { useQuery } from "@tanstack/react-query";
import { useHttpRequest } from "../../hooks";

// interface IHubApis {
//   apis: ApiProps[];
// }
interface IHubApis {
  selectedCategoryId: string | undefined;
}

const core_url = "VITE_CORE_URL";

const HubApis = ({selectedCategoryId}:IHubApis) => {
  const classes = useStyles({});
  const { error, loading, sendRequest } = useHttpRequest();
  const getApisByCategory = async () => {
    const headers = { "Content-Type": "application/json" };
    const payload = {};
    try {
      const data = await sendRequest(
        `/categories/${selectedCategoryId}/apis`,
        "get",
        core_url,
        payload,
        headers
      );
      console.log("data from request",data)
      console.log("selectedCategoryId",selectedCategoryId)
      return data;
    } catch (error) {}
  };

  const queryCategories = useQuery({
    queryKey: ['categories', selectedCategoryId],
    queryFn: getApisByCategory
  })

  return (
    <Box className={classes.hubApiContainer}>
      {queryCategories.data?.length < 1 ? (
        <ApiNotFound />
      ) : (
        <>
          <Box className={classes.titleBarContainer}>
            <CustomTypography
              variant="h5"
              className={classes.typography}
              text="Select from the available APIs below"
            />
            <FormControl
              className={classes.searchInput}
              variant="outlined"
              size="small">
              <OutlinedInput
                type="text"
                placeholder="Search"
                startAdornment={
                  <InputAdornment position="start">
                    <IconButton edge="start">
                      <RiSearch2Line />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Box>
          <Box className={classes.apiContainer} component={"div"}>
            {queryCategories.data?.map((api:ApiProps) => (
              <Grid
                sx={{
                  // display: "flex",
                  // alignItems: "center",
                  // justifyContent: "center",
                  // alignSelf: "center",
                  // width: "100%",
                }}
                item
                key={api.id}
                mobile={6}
                tablet={4}
                laptop={4}
                desktop={4}>
                <ApiCard api={api} />
              </Grid>
            ))}
          </Box>
        </>
      )}
    </Box>
  );
};

export default HubApis;
