import { useState, useEffect } from "react";
import { Stack, Theme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import { ApiProps } from "../interfaces";
import { Footer, Loader, Navbar } from "../components";
import HubApis from "../components/hub/HubApis";
import { useAppSelector, useHttpRequest } from "../hooks";
import HubCategories from "../components/hub/HubCategories";

const core_url = "VITE_CORE_URL";

const Hub = () => {
  const classes = useStyles();
  const { apis } = useAppSelector((store) => store.apis);

  // const [allApis, setAllApis] = useState<ApiProps[]>(apis);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>();

  const { error, loading, sendRequest } = useHttpRequest();
  const { categories } = useAppSelector((store) => store.apis);


  useEffect(() => {
    const all = categories.find((category) => category.id === "All");
    if (all?.id) {
      setSelectedCategoryId(all.id);
    }
  }, [categories]);


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
      // setAllApis(data);
    } catch (error) {}
  };
  useEffect(() => {
    if (selectedCategoryId) getApisByCategory();
  }, [selectedCategoryId]);


  if (loading) return <Loader />;
  return (
    <Stack>
      <Navbar />
      <Stack className={classes.hubContainer}>
        <HubCategories
          selectedCategoryId={selectedCategoryId}
          setSelectedCategoryId={setSelectedCategoryId}
        />
        {/* <HubApis apis={allApis} /> */}
        <HubApis selectedCategoryId={selectedCategoryId} />
      </Stack>
      <Footer />
    </Stack>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    hubContainer: {
      backgroundColor: theme.palette.background.default,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  })
);

export default Hub;
