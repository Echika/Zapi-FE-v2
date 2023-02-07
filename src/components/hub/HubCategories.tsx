import { Box, Stack, Typography } from "@mui/material";
import { useQuery } from '@tanstack/react-query';
import { useAppSelector } from "../../hooks";
import { useStyles } from "./HubCategories.styles";
import CustomTypography from "../shared/CustomTypography";
import { useAppContext } from "../../contexts/AppProvider";
import CategoryButton from "../shared/Buttons/CategoriesButton";
import axios from 'axios';


const url = import.meta.env.VITE_CORE_URL;


interface IHubCategories {
  selectedCategoryId?: string;
  setSelectedCategoryId?: React.Dispatch<
    React.SetStateAction<string | undefined>
  >
}

const HubCategories = ({
  selectedCategoryId,
  setSelectedCategoryId,
}: IHubCategories) => {
  const { categories } = useAppSelector((store) => store.apis);

  const classes = useStyles({});
  const { currentMode } = useAppContext();

  const light = {
    main: "#081F4A",
    contrastText: "#E9EBED",
  };
  const dark = {
    main: "#121212",
    contrastText: "#FFEA00",
  };

  function handleColor(id: string) {
    if (selectedCategoryId === id) {
      return currentMode === "dark" ? dark.main : light.contrastText;
    }
    return currentMode === "dark" ? dark.contrastText : light.main;
  }
  
  function handleBg(id: string) {
    if (selectedCategoryId === id) {
      return currentMode === "dark" ? dark.contrastText : light.main;
    }
    return currentMode === "dark" ? dark.main : light.contrastText;
  }

  const queryCategories = useQuery({
    queryKey: ['categories'],
    queryFn: () => { return axios.get(`${url}/categories`).then(() => [...categories])}
  })

  if(queryCategories.isLoading) {
    return <Typography>Loading ...</Typography>
  }


  return (
    <Stack className={classes.catContainer}>
      <Box className={classes.catButtonContainer}>
         { queryCategories?.data?.map((category:any) => (
          <CategoryButton
            key={category.id}
            label={category.name}
            type="button"
            onClick={() => setSelectedCategoryId!(category.id)}
            background={handleBg(category.id)}
            color={handleColor(category.id)}
            size="medium"
          />
        ))} 
      </Box>
      <Box className={classes.catTypoContainer}>
        <CustomTypography
          variant="h3"
          className={classes.titleTypography}
          text="Discover and connect to hundreds of APIs from our Z-API Hub"
        />
        <CustomTypography
          variant="h6"
          className={classes.subtitleTypography}
          text="Select from the categories available, subscribe to an API and enjoy
          the services."
        />
      </Box>
    </Stack>
  );


 
};

export default HubCategories;
