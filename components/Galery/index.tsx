import { Container, Grid } from "@mui/material";
import { GaleryItem, GaleryS } from "./styled";
import Image from "next/image";
import { FC } from "react";
import "lightgallery.js/dist/css/lightgallery.css";
// @ts-ignore
import { LightgalleryProvider, LightgalleryItem } from "react-lightgallery";

const APP_API = process.env.APP_API;

const grid = (images: IImages) => {

  const length = images.data.length

  return (
    <Grid container>
      {images.data.slice(0, 8).map((item: IImageAttributes, idx: number) => (
        <Grid key={idx} item xs={6} md={length > 3 ? 3 : length === 3 ? 4 : 6}>
          <LightgalleryItem
              group="any"
              component="div"
              src={APP_API + item.attributes.url}
            >
          <GaleryItem>
            <a
              href={APP_API + item.attributes.url}
              onClick={(e) => e.preventDefault()}
            >
              <Image
                src={`${
                  APP_API + item.attributes.url
                }?format=webp&resize=${length > 3 ? "360" : length === 3 ? "410" : "600"}x285`}
                fill
                alt=""
              />
            </a>
          </GaleryItem>
          </LightgalleryItem>
        </Grid>
      ))}
    </Grid>
  );
};

const Galery: FC<IGalery> = ({
  modal = false,
  images,
  removePadding = false,
}) => {
  return (
    <LightgalleryProvider
      lightgallerySettings={
        {
          // settings: https://sachinchoolur.github.io/lightgallery.js/docs/api.html
        }
      }
      galleryClassName="my_custom_classname"
    >
      <GaleryS modal={modal} removePadding={removePadding}>
        {!modal ? (
          <Container maxWidth="xl">{grid(images)}</Container>
        ) : (
          grid(images)
        )}
      </GaleryS>
    </LightgalleryProvider>
  );
};

export default Galery;
