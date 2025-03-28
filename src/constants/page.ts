import { Metadata } from "next"
import { INFO } from "@/constants/index"

const PAGE = {
  MAIN: "MAIN",
}

const PATHS: { [key in keyof typeof PAGE]: string } = {
  MAIN: "/",
}

const getUrl = ({ url, path }: { url: string; path: string }): URL => {
  if (path.startsWith("https://") || path.startsWith("https://")) {
    return new URL(path)
  }
  const sanitizedUrl = url.endsWith("/") ? url : `${url}/`
  return new URL(`${sanitizedUrl}${path}`)
}

type MetadataWithExtend = Metadata & {
  extend: (path: string, metadata: Omit<Metadata, "metadataBase">) => Metadata
}

const defaultMetadata: MetadataWithExtend = {
  metadataBase: new URL(INFO.BASE_URL),
  title: INFO.TITLE,
  description: INFO.DESCRIPTION,
  icons: [INFO.FAVICON],
  openGraph: {
    title: INFO.TITLE,
    description: INFO.DESCRIPTION,
    type: "website",
    images: [INFO.PREVIEW_IMAGE],
  },
  extend: (path, metadata) => generateMetadata(defaultMetadata, path, metadata),
}

const generateMetadata = (
  origin: MetadataWithExtend,
  metadataBase: string,
  {
    title = defaultMetadata.title,
    description = defaultMetadata.description,
    ...meta
  }: Omit<Metadata, "metadataBase"> = defaultMetadata,
): MetadataWithExtend => {
  const metadataBaseUrl = getUrl({
    url: origin.metadataBase?.href ?? INFO.BASE_URL,
    path: metadataBase,
  })
  const generatedMetadata: MetadataWithExtend = {
    ...origin,
    metadataBase: metadataBaseUrl,
    title: title,
    description: description,
    ...meta,
    openGraph: {
      ...origin.openGraph,
      title: title !== null ? title : (defaultMetadata.title ?? INFO.TITLE),
      description:
        description !== null
          ? description
          : (defaultMetadata.description ?? INFO.DESCRIPTION),
      ...meta.openGraph,
    },
    extend: (path, metadata) =>
      generateMetadata(generatedMetadata, path, metadata),
  }

  return generatedMetadata
}

const METADATA: { [key in keyof typeof PAGE]: Metadata } = {
  MAIN: defaultMetadata,
}

export default PAGE
export { PATHS, METADATA }
