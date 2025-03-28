import localFont from "next/font/local"

const pretendard = localFont({
    src: "../_fonts/PretendardVariable.woff2",
    display: "swap",
    weight: '45 920',
    preload: true,
    variable: '--font-pretendard',
})

export default pretendard