import { Container, Grid } from "@mui/material";
import { FC, useEffect, useState } from "react";
// @ts-ignore
import { LightgalleryProvider } from "react-lightgallery";
import { GaleryS } from "./styled";
import "lightgallery.js/dist/css/lightgallery.css";
import GalleryGrid from "./GaleryGrid";

const Galery: FC<IGalery> = ({ modal = false, images, removePadding = false }) => {
  const [appApi, setAppApi] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setAppApi(process.env.NEXT_PUBLIC_APP_API || "");
    }
  }, []);

  if (!appApi) return null; // Предотвращаем ошибку гидратации

  return (
    <LightgalleryProvider galleryClassName="lightbox-galery">
      <GaleryS modal={modal} removePadding={removePadding}>
        {!modal ? (
          <Container maxWidth="xl">
            <GalleryGrid images={images} appApi={appApi} />
          </Container>
        ) : (
          <Grid container>
            <GalleryGrid images={images} appApi={appApi} />
          </Grid>
        )}
      </GaleryS>
    </LightgalleryProvider>
  );
};

export default Galery;