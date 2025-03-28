import localFont from "next/font/local"

const hack = localFont({
    src: [
        {path: "../_fonts/hack/hack-regular.woff2", weight: '400'},
        {path: "../_fonts/hack/hack-bold.woff2", weight: '600'},
    ],
    display: "swap",
    preload: true,
    variable: '--font-hack',
})

export default hack