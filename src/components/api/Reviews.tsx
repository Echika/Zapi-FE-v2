import React, { useEffect, useState } from "react";
import { styled, makeStyles } from "@mui/styles";
import { Typography, Theme, Box, Stack } from "@mui/material";
import { ChatRounded, AccountCircle } from "@mui/icons-material";

import { ReviewType } from "../../types";

interface Props {
  reviews: Array<ReviewType>;
}

const Reviews: React.FC<Props> = ({ reviews }) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      {reviews.length !== 0 ? (
        <Typography component="h2">Reviews</Typography>
      ) : (
        <></>
      )} 

      <Stack direction="column" spacing={1}>
        {reviews.length !== 0 ? (
          <>
            {reviews.map((review, index) => (
              <Box className={classes.user_review}>
                <AccountCircle />

                <Box sx={{ width: "100%" }}>
                  <Typography component="p" sx={{ marginBottom: "8px" }}>
                    {"User"}
                  </Typography>
                  <Typography component="p">
                    {review.review ||
                      "s vitae erat diam arcu molestie mattis vestibulum lorem. Nulla dictum id aenean molestie aliquam volutpat enim tortor. Metus pretium magnis diam sit arcu nisl. Eget at a dolor ultricies et sit ut. Hendrerit viverra tincidunt ut ultricies nec enim aenean. Amet senectus pellentesque gravida iaculis urna diam orci. Fringilla sed auctor elementum mus non volutpat nullam. Purus aliquam sit tincidunt sit eu massa mauris nullam."}
                  </Typography>
                </Box>
              </Box>
            ))}
          </>
        ) : (
          <Box
            sx={{
              border: "unset",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              margin: "110px 0",
              alignItems: "center",
              width: "100%",
            }}>
            <ChatRounded sx={{ fontSize: "32px", color: "#264276" }} />
            <Typography sx={{ fontSize: "18px", color: "#060607" }}>
              No reviews on the API yet.
            </Typography>
          </Box>
        )}
      </Stack>
    </Box>
  );
};

export default Reviews;

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "15px",
    padding: "0 120px 80px 120px",
    lineHeight: "41px",
    width: "100%",
    "& h2": {
      margin: "63px 0",
      fontWeight: "bold",
      fontSize: "19px",
      color: "#060607",
    },

    "@media screen and (max-width: 900px)": {
      padding: "44px 32px 24px 32px",

      "& h2": {
        fontSize: "23px",
      },
    },

    "@media screen and (max-width: 428px)": {
      padding: "20px 16px 24px 16px",
      fontSize: "14px",
    },
  },

  user_review: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: "24px",
    marginBottom: "12px",
    borderBottom: "1px solid #d1d1d1",
    padding: "0 0 21px 25px",
    width: "100%",

    "& svg": {
      color: "#a1a1a1",
      width: "48px",
      height: "48px",
    },

    "& p": {
      fontWeight: "normal",
      fontSize: "16px",
      color: "#3E4245",
    },
  },
}));
