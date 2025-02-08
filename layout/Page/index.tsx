import { FC, ReactNode } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { selectAllMeta } from "stores/slices/metaSlices";
import Script from "next/script";

interface IPage {
  children: ReactNode | ReactNode[];
  id?: string;
  className?: string;
}

const Page: FC<IPage> = ({ children, className = "", id = "" }) => {
  const router = useRouter();

  const {
    title,
    description,
    image,
    ogTitle,
    ogDescription,
    contentType,
    published,
    category,
    updated,
    tags,
    noCrawl,
    themeColor,
    siteName,
    siteUrl,
  } = useSelector(selectAllMeta);

  const global = {
    site_url: siteUrl,
    facebook_app_id: "",
    defaultTitle: siteName,
    defaultDescription: siteName,
    defaultImage: siteUrl,
    defaultTwitter: "@burger",
    defaultSep: " | ",
    gtm: "",
  };

  const theTitle = title
    ? title + global.defaultSep + global.defaultTitle
    : global.defaultTitle;
  const theDescription = description ? description : global.defaultDescription;
  const theImage = image ? image : global.defaultImage;

  return (
    <>
      <Head>
        <meta charSet="utf-8" />

        {/* FONTY */}
        {/* <link rel="stylesheet preload prefetch" href="https://use.typekit.net/vpe5tmu.css" as="style" type="text/css" crossOrigin="anonymous" /> */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Mono&display=swap" rel="stylesheet" />

        {/* FAVICON */}
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <meta name="msapplication-TileColor" content={themeColor} />
        <meta name="theme-color" content={themeColor} />

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{theTitle}</title>
        
        <link
          rel="canonical"
          href={global.site_url + (router.asPath !== "/" ? router.asPath : "")}
        />
        <meta itemProp="name" content={theTitle} />
        <meta itemProp="description" content={theDescription} />
        <meta itemProp="image" content={theImage} />
        <meta name="description" content={theDescription} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={siteName.toUpperCase()} />
        <meta name="twitter:title" content={ogTitle || theTitle} />
        <meta
          name="twitter:description"
          content={ogDescription || theDescription}
        />
        <meta name="twitter:image:src" content={theImage} />
        <meta property="og:title" content={ogTitle || theTitle} />
        <meta property="og:type" content={contentType} />
        <meta property="og:url" content={global.site_url + (router.asPath !== "/" ? router.asPath : "")} />
        <meta property="og:image" content={theImage} />
        <meta
          property="og:description"
          content={ogDescription || theDescription}
        />
        <meta property="og:site_name" content={siteName.toUpperCase()} />
        <meta property="fb:app_id" content={global.facebook_app_id} />

        {published && (
          <meta name="article:published_time" content={published} />
        )}
        {category && <meta name="article:section" content={category} />}
        {updated && <meta name="article:modified_time" content={updated} />}
        {noCrawl && <meta name="robots" content="noindex, nofollow" />}
        {tags && <meta name="article:tag" content={tags} />}
      </Head>

      {/* <!-- Google tag (gtag.js) --> */}
      <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-2CMP76GFG2" />
      <Script id="gtag" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-MPJ6DQS');`}
      </Script>

      <main id={id} className={className}>{children}</main>
    </>
  );
};

export default Page;
