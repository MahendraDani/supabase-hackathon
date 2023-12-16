import Image from "next/image"

interface IconButtonProps {
  src: string;
  width: number;
  height: number;
  alt: string;
  type?: "submit" | "reset" | "button";
}
export const IconButton = ({ src, width, height, alt, type }: IconButtonProps) => {
  return (
    <button className="p-1 duration-200 cursor-pointer rounded-full hover:bg-slate-100" type={type}>
      <Image src={src} width={width} height={height} alt={alt} />
    </button>
  )
}