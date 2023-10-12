import { Button } from "@chakra-ui/react";
import React from "react";
import { Heart } from "react-bootstrap-icons";

export default function LikeButton() {
  return (
    <React.Fragment>
      <Button>
        <Heart />
      </Button>
    </React.Fragment>
  )
}